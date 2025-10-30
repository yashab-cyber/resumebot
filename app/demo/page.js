'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaRobot, FaPaperPlane, FaUser, FaArrowLeft } from 'react-icons/fa';

export default function DemoPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm an AI assistant representing John Doe, a Full Stack Developer. Ask me anything about John's experience, skills, projects, or education! Try asking:\n\n• What's your experience?\n• What technologies do you know?\n• Tell me about your projects\n• What's your education background?",
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const demoResponses = {
    experience: "I have 3+ years of experience as a Full Stack Developer. I've worked at Tech Innovators Inc. as a Senior Developer, where I built scalable web applications using React, Node.js, and MongoDB. I've also worked at StartupXYZ as a Full Stack Engineer, developing mobile-responsive applications and REST APIs.",
    skills: "My technical skills include:\n\n• Frontend: React, Next.js, TypeScript, Tailwind CSS\n• Backend: Node.js, Express, Python, Django\n• Database: MongoDB, PostgreSQL, Redis\n• Cloud: AWS, Docker, Kubernetes\n• Other: Git, CI/CD, Agile methodologies\n\nI'm also proficient in problem-solving, team collaboration, and communication.",
    projects: "Here are some of my key projects:\n\n1. **E-commerce Platform**: Built a full-stack e-commerce site with React, Node.js, and Stripe integration. Handled 10,000+ monthly users.\n\n2. **AI Chat Application**: Developed an AI-powered chat app using OpenAI API, WebSockets, and real-time messaging.\n\n3. **Task Management System**: Created a Trello-like task manager with drag-and-drop, user authentication, and team collaboration features.",
    education: "I hold a Bachelor of Science in Computer Science from Tech University, graduated in 2020 with a 3.8 GPA. During my studies, I focused on software engineering, algorithms, and machine learning. I also completed several online certifications including AWS Certified Developer and MongoDB Professional.",
    contact: "You can reach me at:\n\n• Email: john.doe@example.com\n• LinkedIn: linkedin.com/in/johndoe\n• GitHub: github.com/johndoe\n• Portfolio: johndoe.dev\n\nFeel free to connect with me on any of these platforms!",
    default: "That's a great question! In a real ResumeBot, I would provide specific information from the resume. This is a demo showcasing how the AI chatbot works. Try asking about experience, skills, projects, education, or contact information!"
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.toLowerCase();
    setMessages([...messages, { role: 'user', content: inputMessage }]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      let response = demoResponses.default;

      if (userMessage.includes('experience') || userMessage.includes('work')) {
        response = demoResponses.experience;
      } else if (userMessage.includes('skill') || userMessage.includes('technolog')) {
        response = demoResponses.skills;
      } else if (userMessage.includes('project')) {
        response = demoResponses.projects;
      } else if (userMessage.includes('education') || userMessage.includes('study') || userMessage.includes('degree')) {
        response = demoResponses.education;
      } else if (userMessage.includes('contact') || userMessage.includes('email') || userMessage.includes('reach')) {
        response = demoResponses.contact;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
              <FaRobot className="text-3xl text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">John Doe - Demo Resume Bot</h1>
              <p className="text-gray-600">Full Stack Developer | React | Node.js</p>
            </div>
          </div>
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Demo Mode:</strong> This is a demo showcasing how ResumeBot works. 
              <Link href="/register" className="text-blue-600 hover:underline ml-1">
                Create your own bot to get started!
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ height: '70vh' }}>
          <div className="h-full flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 ${
                    msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      msg.role === 'assistant'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                        : 'bg-gray-600'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <FaRobot className="text-white text-xl" />
                    ) : (
                      <FaUser className="text-white text-xl" />
                    )}
                  </div>
                  <div
                    className={`max-w-xl px-4 py-3 rounded-2xl ${
                      msg.role === 'assistant'
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about this resume..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <FaPaperPlane />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            "What's your experience?",
            "Tell me about your skills",
            "What projects have you done?",
            "What's your education?",
          ].map((question, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(question)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition text-sm"
            >
              {question}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Own?</h2>
          <p className="text-lg mb-6">
            Build your AI-powered resume bot in less than 5 minutes!
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
}
