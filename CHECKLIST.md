# ✅ ResumeBot Setup Checklist

Use this checklist to ensure everything is set up correctly.

## 📋 Pre-Installation

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (optional, `git --version`)
- [ ] Code editor ready (VS Code recommended)

## 🔧 Installation Steps

- [ ] Clone/download the project
- [ ] Navigate to project directory: `cd resumebot`
- [ ] Run `npm install` (wait for completion)
- [ ] Copy `.env.example` to `.env`: `cp .env.example .env`

## 🗄️ Database Setup

Choose one option:

### Option A: Local MongoDB
- [ ] MongoDB installed
- [ ] MongoDB service running
- [ ] Test connection: `mongosh` or `mongo`
- [ ] Update `.env`: `MONGODB_URI=mongodb://localhost:27017/resumebot`

### Option B: MongoDB Atlas (Cloud)
- [ ] Create account at mongodb.com/cloud/atlas
- [ ] Create free cluster
- [ ] Create database user
- [ ] Whitelist IP (0.0.0.0/0 for testing)
- [ ] Get connection string
- [ ] Update `.env` with connection string

### Option C: Docker
- [ ] Docker installed
- [ ] Run: `docker run -d -p 27017:27017 --name mongodb mongo:latest`
- [ ] Update `.env`: `MONGODB_URI=mongodb://localhost:27017/resumebot`

## 🤖 OpenAI API Setup

- [ ] Visit platform.openai.com
- [ ] Sign up / Log in
- [ ] Go to API Keys section
- [ ] Create new API key
- [ ] Copy the key (starts with 'sk-')
- [ ] Add to `.env`: `OPENAI_API_KEY=sk-your-key-here`
- [ ] Add credit/billing if required

## 🔐 Environment Configuration

Edit `.env` file and verify:

- [ ] `MONGODB_URI` is set correctly
- [ ] `JWT_SECRET` has a strong random string
- [ ] `OPENAI_API_KEY` is valid
- [ ] `NEXT_PUBLIC_API_URL=http://localhost:3001`
- [ ] `NEXT_PUBLIC_APP_URL=http://localhost:3000`
- [ ] `PORT=3001`
- [ ] `NODE_ENV=development`

## 🚀 Running the Application

Choose your preferred method:

### Method 1: Run Together (Recommended)
- [ ] Run: `npm run dev:all`
- [ ] Wait for both servers to start
- [ ] Check for any errors

### Method 2: Run Separately
Terminal 1:
- [ ] Run: `npm run server`
- [ ] Verify: "Server running on port 3001"
- [ ] Verify: "MongoDB Connected"

Terminal 2:
- [ ] Run: `npm run dev`
- [ ] Verify: "Ready on http://localhost:3000"

## ✅ Verification Steps

- [ ] Frontend loads: Visit http://localhost:3000
- [ ] Backend health: Visit http://localhost:3001/health
- [ ] No console errors in terminal
- [ ] Landing page displays correctly

## 🧪 Test Basic Functionality

### Test Registration
- [ ] Click "Get Started" or "Register"
- [ ] Fill in name, email, password
- [ ] Submit form
- [ ] Redirected to dashboard
- [ ] No errors in console

### Test Resume Creation
- [ ] Click "Create New Bot"
- [ ] Fill in personal info (Step 1)
- [ ] Navigate through all steps
- [ ] Click "Create Bot"
- [ ] Redirected to share page
- [ ] Bot ID generated

### Test Bot Chat
- [ ] Copy shareable link
- [ ] Open in new tab/window
- [ ] Bot loads with welcome message
- [ ] Type a question (e.g., "What's your experience?")
- [ ] AI responds correctly
- [ ] No errors

### Test Analytics
- [ ] Go back to dashboard
- [ ] Check if views counted (should be at least 1)
- [ ] Check if interactions counted
- [ ] Analytics display correctly

## 🐛 Troubleshooting

If something doesn't work, check:

### MongoDB Issues
- [ ] MongoDB service is running
- [ ] Connection string is correct
- [ ] Network/firewall not blocking
- [ ] Database user has correct permissions

### OpenAI Issues
- [ ] API key is valid and active
- [ ] API key has correct format (sk-...)
- [ ] Billing is set up (if required)
- [ ] No rate limits exceeded

### Port Issues
- [ ] Port 3000 not in use by another app
- [ ] Port 3001 not in use by another app
- [ ] Try: `lsof -ti:3000` to check

### Build Issues
- [ ] Delete `.next` folder
- [ ] Delete `node_modules`
- [ ] Run `npm install` again
- [ ] Restart servers

## 📱 Optional Enhancements

- [ ] Try the demo: http://localhost:3000/demo
- [ ] Create multiple bots
- [ ] Test embed codes on a test HTML file
- [ ] Download QR codes
- [ ] Test on mobile device (use local IP)
- [ ] Invite friends to test your bot

## 🌐 Deployment Checklist

When ready to deploy:

- [ ] Create production MongoDB cluster
- [ ] Get production OpenAI API key
- [ ] Set up environment variables on hosting platform
- [ ] Update CORS settings for production domain
- [ ] Test all features in production
- [ ] Set up monitoring/error tracking
- [ ] Configure custom domain (optional)

## 📚 Learning Resources

- [ ] Read README.md
- [ ] Review QUICKSTART.md
- [ ] Check PROJECT_SUMMARY.md
- [ ] Explore code comments
- [ ] Try OpenAI API playground
- [ ] Review Next.js documentation

## ✨ You're Ready!

If all items are checked, you have successfully set up ResumeBot! 🎉

### Next Steps:
1. Create your own resume bot
2. Share with friends and recruiters
3. Customize the code to your needs
4. Add to your portfolio
5. Deploy to production

### Need Help?
- Check the documentation files
- Review error messages carefully
- Search for similar issues online
- Ask in GitHub Discussions

---

**Happy Building! 🚀**

Remember: This is your chance to revolutionize how resumes work!
