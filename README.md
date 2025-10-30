# 🤖 ResumeBot - AI-Powered Resume Chatbot Platform

Transform traditional paper resumes into interactive AI-powered chatbots! ResumeBot helps students and professionals create engaging, shareable resume experiences that stand out to recruiters.

## 🌟 Features

### Core Features
- **AI-Powered Chatbot**: Converts your resume into an intelligent chatbot that can answer questions about your experience, skills, and qualifications
- **Interactive Resume Builder**: Step-by-step form to input all your resume details
- **Shareable Links**: Get a unique URL to share your resume bot with recruiters and on social media
- **QR Code Generation**: Generate QR codes for your resume bot to add to printed resumes or business cards
- **Embed Codes**: Get iframe and widget codes to integrate your bot into your personal website or portfolio
- **Analytics Dashboard**: Track views, interactions, and shares of your resume bot
- **Multiple Resume Management**: Create and manage multiple resume bots for different purposes
- **Real-time Chat**: AI responds to questions about your resume in real-time using OpenAI GPT

### Technical Features
- **Modern Tech Stack**: Built with Next.js 14, React, Node.js, Express, and MongoDB
- **AI Integration**: Powered by OpenAI GPT-3.5-turbo for intelligent responses
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Secure Authentication**: JWT-based authentication system
- **RESTful API**: Clean, well-documented API architecture
- **Beautiful UI**: Modern gradient designs with Tailwind CSS and Framer Motion animations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)
- AI API key (choose one):
  - **Google Gemini API key** (Recommended - has free tier!) OR
  - **OpenAI API key**

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd resumebot
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/resumebot
# or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/resumebot

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# AI Provider - Choose one:
# Option 1: Google Gemini (Recommended - Free tier available!)
GEMINI_API_KEY=your-gemini-api-key-here
AI_PROVIDER=gemini

# Option 2: OpenAI
# OPENAI_API_KEY=sk-your-openai-api-key-here
# AI_PROVIDER=openai

# Application URLs
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
PORT=3001

# Environment
NODE_ENV=development
```

4. **Start MongoDB** (if running locally)
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux with systemd
sudo systemctl start mongod

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

5. **Run the application**

Open two terminal windows:

**Terminal 1 - Backend Server:**
```bash
npm run server
```

**Terminal 2 - Frontend (Next.js):**
```bash
npm run dev
```

Or run both together:
```bash
npm run dev:all
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 📖 Usage Guide

### 1. Create an Account
- Visit http://localhost:3000
- Click "Get Started" or "Register"
- Fill in your name, email, and password

### 2. Build Your Resume Bot
- Click "Create New Bot" from the dashboard
- Fill in the step-by-step form:
  - **Personal Info**: Name, email, phone, LinkedIn, GitHub, portfolio
  - **Summary**: Professional summary or bio
  - **Education**: Degrees, institutions, GPA, dates
  - **Experience**: Companies, positions, responsibilities
  - **Skills & Projects**: Technical skills, projects with descriptions
  - **Certifications**: Any certifications or achievements

### 3. Share Your Bot
- After creating your bot, you'll get:
  - **Shareable Link**: Direct URL to your bot
  - **QR Code**: Download and add to printed resumes
  - **Embed Code**: Add to your website with `<iframe>`
  - **Widget Code**: Advanced embed with styling

### 4. Track Performance
- View analytics on your dashboard:
  - Number of views
  - Chat interactions
  - Social shares

## 🏗️ Project Structure

```
resumebot/
├── app/                      # Next.js 14 App Router pages
│   ├── bot/[botId]/         # Public bot chat interface
│   ├── create/              # Resume builder form
│   ├── dashboard/           # User dashboard
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   ├── share/[botId]/       # Share & embed page
│   ├── globals.css          # Global styles
│   ├── layout.js            # Root layout
│   └── page.js              # Landing page
├── server/                   # Backend Express server
│   ├── models/              # MongoDB schemas
│   │   ├── User.js
│   │   ├── Resume.js
│   │   └── ChatHistory.js
│   ├── routes/              # API routes
│   │   ├── auth.js          # Authentication endpoints
│   │   ├── resume.js        # Resume CRUD operations
│   │   ├── bot.js           # Public bot endpoints
│   │   └── chat.js          # AI chat endpoints
│   ├── middleware/          # Express middleware
│   │   └── auth.js          # JWT authentication
│   └── index.js             # Server entry point
├── .env.example             # Environment variables template
├── .gitignore
├── next.config.js           # Next.js configuration
├── package.json
├── postcss.config.js
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Resume Management (Protected)
- `POST /api/resume` - Create/update resume
- `GET /api/resume/my-resumes` - Get user's resumes
- `GET /api/resume/:id` - Get specific resume
- `DELETE /api/resume/:id` - Delete resume

### Public Bot
- `GET /api/bot/:botId` - Get public bot data
- `POST /api/bot/:botId/interact` - Track interaction
- `POST /api/bot/:botId/share` - Track share

### Chat
- `POST /api/chat/:botId` - Send message to bot

## 🎨 Customization

### Changing Theme Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Customize your color palette
        500: '#your-color',
      },
    },
  },
}
```

### Adding More AI Models
In `server/routes/chat.js`, you can switch to different OpenAI models:
```javascript
const completion = await openai.chat.completions.create({
  model: 'gpt-4', // or 'gpt-4-turbo', 'gpt-3.5-turbo'
  // ...
});
```

## 🚀 Deployment

### Deploy to Vercel (Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy Backend
Options:
- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repo
- **DigitalOcean**: Use App Platform
- **AWS**: EC2 or Elastic Beanstalk

### Environment Variables for Production
Make sure to set all environment variables in your hosting platform:
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Strong random secret
- `OPENAI_API_KEY` - Your OpenAI API key
- `NEXT_PUBLIC_API_URL` - Your backend URL
- `NEXT_PUBLIC_APP_URL` - Your frontend URL

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **AI**: Google Gemini Pro OR OpenAI GPT-3.5-turbo (configurable)
- **Authentication**: JWT (JSON Web Tokens)
- **Other**: QRCode.js, Axios, React Hook Form

## 💡 Future Enhancements

- [ ] PDF resume upload and parsing
- [ ] Multiple theme options for bot interface
- [ ] Voice chat capability
- [ ] LinkedIn profile import
- [ ] Resume templates and suggestions
- [ ] Team/organization accounts
- [ ] Advanced analytics and insights
- [ ] Integration with job boards
- [ ] Multi-language support
- [ ] Video resume integration

## 📧 Support

For support, email support@resumebot.com or open an issue in the GitHub repository.

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework

---

Made with ❤️ for students and professionals looking to revolutionize their job search