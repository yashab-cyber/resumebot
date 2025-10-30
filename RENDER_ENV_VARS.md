# Render Environment Variables - CRITICAL SETUP

## ⚠️ IMPORTANT: Set these EXACT variables in your Render Dashboard

Go to: https://dashboard.render.com → Your Service → Environment

### Required Environment Variables:

```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://yashabalam707:jOh85KpPFgAdcwPs@lewis-cluster-0.z2c4hig.mongodb.net/

# AI Configuration
AI_PROVIDER=gemini
GEMINI_API_KEY=AIzaSyAZ9lWCxqWsywGPxFVWyt5z4ZpGeN5y604

# Security
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345

# Frontend Configuration (NO /api suffix!)
NEXT_PUBLIC_API_URL=https://resumebot-4599.onrender.com
NEXT_PUBLIC_APP_URL=https://resumebot-4599.onrender.com

# Node Environment
NODE_ENV=production
```

## 🔍 How to Verify After Deployment

1. **Check Logs** in Render Dashboard
2. Look for these messages:
   - ✅ `🔧 AI Provider: gemini`
   - ✅ `🔑 Gemini API Key: Present ✅`
   - ✅ `✅ Gemini initialized`
   - ✅ `✅ MongoDB Connected`
   - ✅ `🚀 Server ready on port 10000`

## ❌ Common Issues

### "Gemini AI not initialized"
- Check: GEMINI_API_KEY is set in Render
- Check: AI_PROVIDER=gemini (not "openai")

### "Bot not found"
- Check: MongoDB is connected
- Check: Resume exists with isPublic=true

### "Failed to process chat message"
- Check Render logs for detailed error
- Verify all environment variables are set

## 🚀 After Setting Variables

1. Click "Manual Deploy" → "Deploy Latest Commit"
2. Wait for build to complete
3. Check logs for ✅ success messages
4. Test the bot at: https://resumebot-4599.onrender.com/bot/YOUR_BOT_ID
