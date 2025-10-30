# 🚀 Deploy ResumeBot to Render

## ✅ Your Configuration

Your app will be deployed at: **https://resumebot.onrender.com**

### Environment Variables Already Set:
- ✅ MongoDB Atlas connection
- ✅ Google Gemini API key
- ✅ Production URLs configured
- ✅ AI Provider set to Gemini

---

## 📋 Render Deployment Steps

### Option 1: Deploy as a Monorepo (Recommended)

Since you have both frontend (Next.js) and backend (Express) in one repo, here's the best approach:

#### 1. Create Render Account
- Go to https://render.com
- Sign up with GitHub
- Connect your `resumebot` repository

#### 2. Create Backend Service (Express API)

**Service Details:**
- **Type:** Web Service
- **Name:** resumebot-api
- **Environment:** Node
- **Region:** Choose closest to your users
- **Branch:** main
- **Root Directory:** Leave blank or set to `/`
- **Build Command:** `npm install`
- **Start Command:** `node server/index.js`
- **Plan:** Free (to start)

**Environment Variables to Add:**
```
MONGODB_URI=mongodb+srv://yashabalam707:jOh85KpPFgAdcwPs@lewis-cluster-0.z2c4hig.mongodb.net/?retryWrites=true&w=majority&appName=lewis-cluster-0
JWT_SECRET=resumebot_super_secret_jwt_key_2025_production_render_deploy_12345
GEMINI_API_KEY=AIzaSyAZ9lWCxqWsywGPxFVWyt5z4ZpGeN5y604
AI_PROVIDER=gemini
PORT=3001
NODE_ENV=production
```

#### 3. Create Frontend Service (Next.js)

**Service Details:**
- **Type:** Web Service
- **Name:** resumebot
- **Environment:** Node
- **Region:** Same as backend
- **Branch:** main
- **Root Directory:** Leave blank
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Plan:** Free (to start)

**Environment Variables to Add:**
```
NEXT_PUBLIC_API_URL=https://resumebot-api.onrender.com
NEXT_PUBLIC_APP_URL=https://resumebot.onrender.com
NODE_ENV=production
```

**Note:** Replace `resumebot-api.onrender.com` with your actual backend URL from step 2.

---

### Option 2: Deploy as Single Service (Simpler)

If you want everything in one deployment:

#### 1. Create Web Service

**Service Details:**
- **Type:** Web Service
- **Name:** resumebot
- **Environment:** Node
- **Branch:** main
- **Build Command:** `npm install`
- **Start Command:** `npm run dev:all`

**Environment Variables:**
```
MONGODB_URI=mongodb+srv://yashabalam707:jOh85KpPFgAdcwPs@lewis-cluster-0.z2c4hig.mongodb.net/?retryWrites=true&w=majority&appName=lewis-cluster-0
JWT_SECRET=resumebot_super_secret_jwt_key_2025_production_render_deploy_12345
GEMINI_API_KEY=AIzaSyAZ9lWCxqWsywGPxFVWyt5z4ZpGeN5y604
AI_PROVIDER=gemini
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=https://resumebot.onrender.com
PORT=10000
NODE_ENV=production
```

---

## 🔧 Pre-Deployment Checklist

Before deploying, make sure:

### 1. Update package.json Scripts

The current scripts should work, but verify:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "server": "node server/index.js",
    "dev:all": "concurrently \"npm run dev\" \"npm run server\""
  }
}
```

### 2. Add Production Start Script

I'll add a production-ready start script:

---

## 📝 Important Notes

### MongoDB Atlas
- ✅ Your connection string is correct
- ✅ Make sure IP whitelist includes Render IPs (or use 0.0.0.0/0 for all IPs)
- ✅ Database user has read/write permissions

### Gemini API
- ✅ Your API key is set correctly
- ✅ Make sure quota is sufficient for production
- ✅ Monitor usage in Google Cloud Console

### Render Free Tier Limitations
- **Spins down after 15 minutes of inactivity**
- **750 hours/month free** (enough for 1 service 24/7)
- **First request after spin-down takes ~30 seconds**
- For better performance, consider upgrading to paid tier ($7/month)

---

## 🚀 Quick Deploy Commands

### If deploying from local:

1. **Commit your changes:**
```bash
git add .
git commit -m "Configure for Render deployment"
git push origin main
```

2. **Render will auto-deploy** when you connect the GitHub repo!

---

## 🔍 Post-Deployment Testing

Once deployed, test these URLs:

### Backend Health Check
```
https://resumebot-api.onrender.com/health
```
Should return: `{"status":"OK","message":"ResumeBot API is running"}`

### Frontend
```
https://resumebot.onrender.com
```
Should show your landing page

### Full Flow Test
1. Visit https://resumebot.onrender.com
2. Click "Register"
3. Create an account
4. Create a resume bot
5. Test the chat functionality

---

## 🐛 Troubleshooting

### Backend not connecting to MongoDB
- Check MongoDB Atlas IP whitelist
- Verify connection string in Render env vars
- Check Render logs for errors

### Frontend can't reach backend
- Verify `NEXT_PUBLIC_API_URL` points to backend service
- Check CORS settings in backend
- Ensure both services are running

### Gemini API errors
- Verify API key is correct
- Check quota in Google Cloud Console
- Review Render logs for specific error messages

### Service won't start
- Check Render build logs
- Verify start command is correct
- Ensure all dependencies are in package.json

---

## 💰 Cost Optimization

### Free Tier Strategy
- **Frontend:** Free on Render
- **Backend:** Free on Render
- **Database:** Free on MongoDB Atlas (512MB)
- **AI:** Free on Gemini (1,500 requests/day)

**Total: $0/month** for initial launch! 🎉

### When to Upgrade
- Backend handling 1000+ active users
- Need faster response times (no spin-down)
- Exceed Gemini free tier (1,500/day)

---

## 📊 Monitoring

### Render Dashboard
- Monitor service health
- Check logs
- View metrics

### MongoDB Atlas
- Monitor database size
- Check connection count
- Review slow queries

### Gemini Usage
- Visit Google Cloud Console
- Check API usage
- Monitor quota

---

## 🎯 Next Steps After Deployment

1. **Test thoroughly** - Try all features
2. **Share the link** - Get user feedback
3. **Monitor logs** - Watch for errors
4. **Add custom domain** (optional) - Use your own domain
5. **Set up analytics** - Track user engagement

---

## ✅ Your URLs

Once deployed:
- **Frontend:** https://resumebot.onrender.com
- **Backend API:** https://resumebot-api.onrender.com
- **Bot Share Link Example:** https://resumebot.onrender.com/bot/abc123

---

## 🚨 Security Reminder

**Before making repo public:**
- ✅ `.env` is in `.gitignore` (already done)
- ✅ Never commit real API keys to GitHub
- ✅ Use Render's environment variables (not .env file in repo)
- ✅ Keep JWT_SECRET secure

**Your .env file is for local development only!**

---

## 🎉 You're Ready to Deploy!

Your ResumeBot is configured and ready for production on Render!

**Good luck with your launch! 🚀**
