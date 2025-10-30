# 🎯 Quick Deployment Reference Card

## Your Configuration

**Production URL:** https://resumebot.onrender.com  
**Database:** MongoDB Atlas (lewis-cluster-0)  
**AI Provider:** Google Gemini  
**Hosting:** Render.com  

---

## ✅ Environment Variables (Copy to Render)

### Backend Service (resumebot-api)

```
MONGODB_URI=mongodb+srv://yashabalam707:jOh85KpPFgAdcwPs@lewis-cluster-0.z2c4hig.mongodb.net/?retryWrites=true&w=majority&appName=lewis-cluster-0

JWT_SECRET=resumebot_super_secret_jwt_key_2025_production_render_deploy_12345

GEMINI_API_KEY=AIzaSyAZ9lWCxqWsywGPxFVWyt5z4ZpGeN5y604

AI_PROVIDER=gemini

PORT=3001

NODE_ENV=production
```

### Frontend Service (resumebot-frontend)

```
NEXT_PUBLIC_API_URL=https://resumebot-api.onrender.com

NEXT_PUBLIC_APP_URL=https://resumebot.onrender.com

NODE_ENV=production
```

**⚠️ Important:** Update `resumebot-api.onrender.com` with your actual backend URL after creating it!

---

## 🚀 Render Setup Steps

### 1. Create Backend Service
- **Type:** Web Service
- **Build Command:** `npm install`
- **Start Command:** `node server/index.js`
- Add backend env vars from above

### 2. Create Frontend Service
- **Type:** Web Service
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- Add frontend env vars from above

### 3. Wait for Deployment
- Both services will build and deploy
- Check logs for any errors
- Test health endpoint: `/health`

---

## 🧪 Testing Checklist

After deployment:

- [ ] Backend health check works
- [ ] Frontend loads successfully
- [ ] Can create an account
- [ ] Can create a resume bot
- [ ] AI chat responds correctly
- [ ] Can share bot link
- [ ] QR code generates
- [ ] Analytics track correctly

---

## 🔗 Important URLs

**Landing:** https://resumebot.onrender.com  
**Register:** https://resumebot.onrender.com/register  
**Login:** https://resumebot.onrender.com/login  
**Dashboard:** https://resumebot.onrender.com/dashboard  
**Demo:** https://resumebot.onrender.com/demo  
**API Health:** https://resumebot-api.onrender.com/health  

---

## 💡 Quick Tips

1. **First Deploy:** Takes 5-10 minutes
2. **Cold Start:** First request after inactivity takes ~30s
3. **Free Tier:** Spins down after 15 min of inactivity
4. **Logs:** Check Render dashboard for errors
5. **Updates:** Push to GitHub → Auto-deploys

---

## 🐛 Common Issues & Fixes

### "Cannot connect to MongoDB"
- Check IP whitelist in MongoDB Atlas (add 0.0.0.0/0)
- Verify connection string is correct

### "CORS Error"
- Make sure `NEXT_PUBLIC_API_URL` is correct
- Check backend CORS settings

### "Gemini API Error"
- Verify API key is correct
- Check quota in Google Cloud Console

### "Service won't start"
- Check build logs in Render
- Verify start command is correct
- Ensure all env vars are set

---

## 📊 Free Tier Limits

**Render:**
- 750 hours/month per service (enough for 24/7)
- 512MB RAM
- Shared CPU

**MongoDB Atlas:**
- 512MB storage
- Shared cluster
- Unlimited connections

**Google Gemini:**
- 60 requests/minute
- 1,500 requests/day
- FREE!

---

## 🎉 You're All Set!

Everything is configured for production deployment on Render.

**Next Steps:**
1. Push code to GitHub
2. Connect repo to Render
3. Create services with env vars
4. Test thoroughly
5. Share with the world! 🚀

---

**Questions? Check RENDER_DEPLOY.md for detailed guide!**
