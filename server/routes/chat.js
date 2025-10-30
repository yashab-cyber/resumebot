const express = require('express');
const OpenAI = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Resume = require('../models/Resume');
const User = require('../models/User');
const ChatHistory = require('../models/ChatHistory');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Initialize AI provider based on environment variable
const AI_PROVIDER = process.env.AI_PROVIDER || 'gemini';

console.log('🔧 AI Provider:', AI_PROVIDER);
console.log('🔑 Gemini API Key:', process.env.GEMINI_API_KEY ? 'Present ✅' : 'Missing ❌');

let openai, gemini;

if (AI_PROVIDER === 'openai') {
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY is missing!');
  } else {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    console.log('✅ OpenAI initialized');
  }
} else if (AI_PROVIDER === 'gemini') {
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY is missing!');
  } else {
    try {
      gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      console.log('✅ Gemini initialized');
    } catch (error) {
      console.error('❌ Gemini initialization failed:', error.message);
    }
  }
}

// Chat with bot
router.post('/:botId', async (req, res) => {
  try {
    const { botId } = req.params;
    const { message, sessionId } = req.body;

    console.log('📨 Chat request received:', { botId, message, sessionId });

    // Get resume data
    const resume = await Resume.findOne({ botId, isPublic: true });
    if (!resume) {
      console.error('❌ Bot not found:', botId);
      return res.status(404).json({ error: 'Bot not found' });
    }

    console.log('✅ Resume found:', resume.personalInfo.fullName);

    // Check conversation limits for the bot owner
    const user = await User.findById(resume.userId);
    if (user) {
      // Reset daily conversation count if needed
      const now = new Date();
      const lastReset = new Date(user.dailyConversations.lastReset);
      const hoursSinceReset = (now - lastReset) / (1000 * 60 * 60);

      if (hoursSinceReset >= 24) {
        user.dailyConversations.count = 0;
        user.dailyConversations.lastReset = now;
        await user.save();
      }

      // Check conversation limits based on plan
      const conversationLimits = {
        free: 5,
        pro: Infinity,
        team: Infinity,
      };

      const maxConversations = conversationLimits[user.plan];
      
      if (user.dailyConversations.count >= maxConversations) {
        return res.status(403).json({
          error: `Daily conversation limit reached (${maxConversations} conversations/day for ${user.plan} plan)`,
          upgrade: user.plan === 'free' ? 'pro' : null,
          resetTime: new Date(user.dailyConversations.lastReset.getTime() + 24 * 60 * 60 * 1000),
        });
      }

      // Increment conversation count
      user.dailyConversations.count += 1;
      await user.save();
    }

    // Get or create session
    const sid = sessionId || uuidv4();
    let chatHistory = await ChatHistory.findOne({ botId, sessionId: sid });
    
    if (!chatHistory) {
      chatHistory = new ChatHistory({
        botId,
        sessionId: sid,
        messages: [],
      });
    }

    // Build context from resume
    const context = buildResumeContext(resume);

    // Get recent messages for context
    const recentMessages = chatHistory.messages.slice(-10);

    let assistantMessage;

    if (AI_PROVIDER === 'openai') {
      // OpenAI implementation
      const messages = [
        {
          role: 'system',
          content: `You are an AI assistant representing ${resume.personalInfo.fullName}. You have access to their complete resume information and should answer questions about their background, skills, experience, and qualifications in a professional and engaging manner. Be conversational but professional. Here is the resume data:\n\n${context}\n\nAlways respond as if you are representing this person. Be helpful and provide specific details from their resume when relevant.`,
        },
        ...recentMessages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
        {
          role: 'user',
          content: message,
        },
      ];

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      });

      assistantMessage = completion.choices[0].message.content;
    } else if (AI_PROVIDER === 'gemini') {
      // Google Gemini implementation
      console.log('🤖 Using Gemini AI');
      
      if (!gemini) {
        console.error('❌ Gemini not initialized! API Key:', process.env.GEMINI_API_KEY ? 'Present' : 'Missing');
        throw new Error('Gemini AI not initialized');
      }

      const model = gemini.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

      // Build conversation history for Gemini
      const conversationHistory = recentMessages.map(msg => 
        `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      ).join('\n\n');

      const prompt = `You are an AI assistant representing ${resume.personalInfo.fullName}. You have access to their complete resume information and should answer questions about their background, skills, experience, and qualifications in a professional and engaging manner. Be conversational but professional.

Here is the resume data:
${context}

Always respond as if you are representing this person. Be helpful and provide specific details from their resume when relevant.

${conversationHistory ? `Previous conversation:\n${conversationHistory}\n\n` : ''}Current question: ${message}

Respond naturally and professionally:`;

      console.log('📤 Sending to Gemini...');
      const result = await model.generateContent(prompt);
      console.log('📥 Raw result received:', result);
      
      const response = await result.response;
      console.log('📝 Response object:', response);
      
      assistantMessage = response.text();
      console.log('✅ Gemini response received:', assistantMessage.substring(0, 100) + '...');
    } else {
      throw new Error(`Unknown AI provider: ${AI_PROVIDER}`);
    }

    // Save to chat history
    chatHistory.messages.push(
      { role: 'user', content: message },
      { role: 'assistant', content: assistantMessage }
    );
    await chatHistory.save();

    // Track interaction
    resume.analytics.interactions += 1;
    await resume.save();

    res.json({
      message: assistantMessage,
      sessionId: sid,
    });
  } catch (error) {
    console.error('❌ Chat error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to process chat message',
      details: error.message 
    });
  }
});

function buildResumeContext(resume) {
  let context = '';

  // Personal Info
  context += `Name: ${resume.personalInfo.fullName}\n`;
  context += `Email: ${resume.personalInfo.email}\n`;
  if (resume.personalInfo.phone) context += `Phone: ${resume.personalInfo.phone}\n`;
  if (resume.personalInfo.location) context += `Location: ${resume.personalInfo.location}\n`;
  if (resume.personalInfo.linkedIn) context += `LinkedIn: ${resume.personalInfo.linkedIn}\n`;
  if (resume.personalInfo.github) context += `GitHub: ${resume.personalInfo.github}\n`;
  if (resume.personalInfo.portfolio) context += `Portfolio: ${resume.personalInfo.portfolio}\n`;

  // Summary
  if (resume.summary) {
    context += `\nProfessional Summary:\n${resume.summary}\n`;
  }

  // Education
  if (resume.education && resume.education.length > 0) {
    context += '\nEducation:\n';
    resume.education.forEach(edu => {
      context += `- ${edu.degree} in ${edu.field} from ${edu.institution}`;
      if (edu.gpa) context += ` (GPA: ${edu.gpa})`;
      context += `\n`;
    });
  }

  // Experience
  if (resume.experience && resume.experience.length > 0) {
    context += '\nWork Experience:\n';
    resume.experience.forEach(exp => {
      context += `- ${exp.position} at ${exp.company}`;
      if (exp.location) context += ` (${exp.location})`;
      context += `\n`;
      if (exp.responsibilities) {
        exp.responsibilities.forEach(resp => {
          context += `  * ${resp}\n`;
        });
      }
    });
  }

  // Skills
  if (resume.skills) {
    context += '\nSkills:\n';
    if (resume.skills.technical?.length) {
      context += `Technical: ${resume.skills.technical.join(', ')}\n`;
    }
    if (resume.skills.soft?.length) {
      context += `Soft Skills: ${resume.skills.soft.join(', ')}\n`;
    }
    if (resume.skills.languages?.length) {
      context += `Languages: ${resume.skills.languages.join(', ')}\n`;
    }
    if (resume.skills.tools?.length) {
      context += `Tools: ${resume.skills.tools.join(', ')}\n`;
    }
  }

  // Projects
  if (resume.projects && resume.projects.length > 0) {
    context += '\nProjects:\n';
    resume.projects.forEach(proj => {
      context += `- ${proj.name}: ${proj.description}\n`;
      if (proj.technologies?.length) {
        context += `  Technologies: ${proj.technologies.join(', ')}\n`;
      }
    });
  }

  // Certifications
  if (resume.certifications && resume.certifications.length > 0) {
    context += '\nCertifications:\n';
    resume.certifications.forEach(cert => {
      context += `- ${cert.name} from ${cert.issuer}\n`;
    });
  }

  // Achievements
  if (resume.achievements && resume.achievements.length > 0) {
    context += '\nAchievements:\n';
    resume.achievements.forEach(achievement => {
      context += `- ${achievement}\n`;
    });
  }

  return context;
}

module.exports = router;
