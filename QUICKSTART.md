# ResumeBot - Quick Start Guide

## 🎯 What is ResumeBot?

ResumeBot is a revolutionary platform that transforms traditional paper resumes into interactive AI-powered chatbots. Students and professionals can:
- Fill in their resume details through an easy form
- Get an AI chatbot that represents them
- Share the bot via link, QR code, or embed it on their website
- Track engagement analytics (views, interactions, shares)

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add:
# - MongoDB connection string
# - JWT secret (any random string)
# - OpenAI API key
```

### Step 3: Start MongoDB
Choose one option:

**Option A - Local MongoDB:**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

**Option B - MongoDB Atlas (Cloud):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add to .env as MONGODB_URI

**Option C - Docker:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Step 4: Get AI API Key

**Option 1: Google Gemini (Recommended - Free Tier!)**
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key
5. Add to .env:
   ```env
   GEMINI_API_KEY=your-key-here
   AI_PROVIDER=gemini
   ```

**Option 2: OpenAI**
1. Go to https://platform.openai.com
2. Sign up / Log in
3. Go to API Keys section
4. Create new key
5. Add to .env:
   ```env
   OPENAI_API_KEY=sk-your-key-here
   AI_PROVIDER=openai
   ```

**💡 Tip: Use Gemini if you want to start free!**

### Step 5: Run the Application

**Option A - Run both servers together:**
```bash
npm run dev:all
```

**Option B - Run separately:**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### Step 6: Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 📱 How to Use

### 1. Register an Account
- Visit http://localhost:3000
- Click "Get Started"
- Enter name, email, password

### 2. Create Your Resume Bot
- Click "Create New Bot"
- Fill in 6 steps:
  1. **Personal Info**: Name, email, contact details, social links
  2. **Summary**: Professional bio
  3. **Education**: Degrees, institutions, dates
  4. **Experience**: Job history, responsibilities
  5. **Skills & Projects**: Technical skills, personal projects
  6. **Certifications**: Certifications and achievements

### 3. Share Your Bot
After creation, you get:
- **Shareable Link**: `http://localhost:3000/bot/[your-bot-id]`
- **QR Code**: Download PNG image
- **Embed Code**: Add to your website
- **Widget Code**: Advanced embed with styling

### 4. Test the Bot
- Visit your bot link
- Chat with the AI
- Ask questions like:
  - "What's your experience?"
  - "What skills do you have?"
  - "Tell me about your projects"
  - "What's your education?"

## 🎨 Features Explained

### AI Chat
- Powered by OpenAI GPT-3.5-turbo
- Understands natural language questions
- Provides specific answers from your resume
- Maintains conversation context

### Analytics
Track on your dashboard:
- **Views**: How many people visited your bot
- **Interactions**: Number of chat messages
- **Shares**: How many times it was shared

### Multiple Bots
- Create different bots for different purposes
- E.g., "Software Developer Bot", "Data Science Bot"
- Each has unique link and settings

### Embedding
Three ways to add to your website:

**1. Simple Iframe:**
```html
<iframe src="http://localhost:3000/bot/YOUR_BOT_ID" 
        width="100%" height="600" frameborder="0">
</iframe>
```

**2. Widget (with styling):**
```html
<div id="resumebot-widget"></div>
<script>
  (function() {
    const widget = document.getElementById('resumebot-widget');
    const iframe = document.createElement('iframe');
    iframe.src = 'http://localhost:3000/bot/YOUR_BOT_ID';
    iframe.width = '100%';
    iframe.height = '600px';
    iframe.style.borderRadius = '10px';
    widget.appendChild(iframe);
  })();
</script>
```

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

### OpenAI API Error
```
Error: Invalid API key
```
**Solution**: 
1. Check your OpenAI API key in .env
2. Make sure it starts with "sk-"
3. Verify it's valid at https://platform.openai.com

### Port Already in Use
```
Error: Port 3000 is already in use
```
**Solution**: 
```bash
# Kill process on port 3000
kill -9 $(lsof -ti:3000)

# Or use different port
PORT=3001 npm run dev
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📊 Project Architecture

```
Frontend (Next.js) → Backend (Express) → MongoDB
                  ↓
              OpenAI API
```

### Tech Stack:
- **Frontend**: Next.js 14, React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **AI**: OpenAI GPT-3.5-turbo
- **Auth**: JWT tokens

### API Flow:
1. User fills resume form → POST /api/resume
2. Data saved to MongoDB with unique botId
3. User shares bot link → GET /api/bot/:botId
4. Visitor chats → POST /api/chat/:botId → OpenAI API
5. AI responds with resume information

## 🌟 Best Practices

### Writing Your Resume
- **Be Specific**: Include concrete numbers and achievements
- **Use Keywords**: Add technologies you know (React, Python, etc.)
- **Complete Sections**: Fill all relevant sections for better AI responses
- **Professional Tone**: Write in third person for summary

### Sharing Your Bot
- Add bot link to LinkedIn profile
- Include QR code on printed resumes
- Embed on personal website
- Share on social media

### Privacy
- Only include information you're comfortable sharing publicly
- You can delete bots anytime from dashboard
- Set `isPublic: false` if you want to make it private

## 🚀 Deployment Guide

### Deploy Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard:
# - NEXT_PUBLIC_API_URL
# - NEXT_PUBLIC_APP_URL
```

### Deploy Backend (Railway/Heroku)
```bash
# Railway
railway login
railway init
railway up

# Heroku
heroku create resumebot-api
git push heroku main

# Set environment variables:
heroku config:set MONGODB_URI=...
heroku config:set JWT_SECRET=...
heroku config:set OPENAI_API_KEY=...
```

### MongoDB Atlas Setup
1. Create cluster at https://www.mongodb.com/cloud/atlas
2. Create database user
3. Whitelist IP addresses (0.0.0.0/0 for all)
4. Get connection string
5. Update MONGODB_URI in production

## 📚 Additional Resources

- OpenAI API Docs: https://platform.openai.com/docs
- Next.js Docs: https://nextjs.org/docs
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Tailwind CSS: https://tailwindcss.com/docs

## 💡 Tips for Success

1. **Keep Your Resume Updated**: Edit your bot when you gain new skills
2. **Test Thoroughly**: Chat with your bot before sharing
3. **Monitor Analytics**: Check which sections recruiters ask about
4. **A/B Testing**: Create multiple versions for different roles
5. **Engage Recruiters**: Mention your "AI Resume Bot" in applications

## 🎓 For Students

This is a great project to:
- Add to your portfolio
- Demonstrate full-stack skills
- Show AI/ML integration
- Stand out in job applications
- Learn modern web development

## 📞 Support

If you encounter issues:
1. Check this guide
2. Review error messages
3. Check console logs (browser & terminal)
4. Verify environment variables
5. Ensure all services are running

---

**Ready to revolutionize your resume? Let's go! 🚀**
