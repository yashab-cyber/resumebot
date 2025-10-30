# 🤖 Using Google Gemini with ResumeBot

## Why Use Google Gemini?

✅ **Free tier is generous** - More free requests than OpenAI  
✅ **Fast responses** - Quick inference times  
✅ **High quality** - Google's latest AI model  
✅ **Easy to get** - Simple API key generation  
✅ **Cost-effective** - Great for startups and testing  

---

## 🔑 Getting Your Gemini API Key

### Step 1: Go to Google AI Studio
Visit: **https://makersuite.google.com/app/apikey**

### Step 2: Sign in with Google Account
Use your Google account to sign in

### Step 3: Create API Key
1. Click **"Create API Key"**
2. Select a Google Cloud project (or create new one)
3. Copy the generated API key

### Step 4: Add to Your Project
Open `.env` file and add:
```env
GEMINI_API_KEY=your-gemini-api-key-here
AI_PROVIDER=gemini
```

---

## 🎯 How It's Configured

The app now supports **BOTH** OpenAI and Gemini!

### Using Gemini (Recommended if you have the key)
```env
GEMINI_API_KEY=AIzaSy...your-key-here
AI_PROVIDER=gemini
```

### Using OpenAI (Alternative)
```env
OPENAI_API_KEY=sk-...your-key-here
AI_PROVIDER=openai
```

---

## 🔄 How It Works

The chat route (`server/routes/chat.js`) automatically detects which AI provider you configured:

```javascript
if (AI_PROVIDER === 'gemini') {
  // Uses Google Gemini API
  const model = gemini.getGenerativeModel({ model: 'gemini-pro' });
  // Generate response...
} else if (AI_PROVIDER === 'openai') {
  // Uses OpenAI API
  const completion = await openai.chat.completions.create({...});
  // Generate response...
}
```

**No code changes needed** - just set the environment variable!

---

## 💰 Cost Comparison

### Google Gemini (Free Tier)
- **60 requests per minute** (free)
- **1,500 requests per day** (free)
- Perfect for development and small-scale use

### OpenAI GPT-3.5-turbo
- **$0.50 per 1M input tokens**
- **$1.50 per 1M output tokens**
- Pay as you go

**For a startup, Gemini's free tier is usually enough!**

---

## 🚀 Quick Setup

1. **Get Gemini API Key**
   ```
   Visit: https://makersuite.google.com/app/apikey
   ```

2. **Update .env file**
   ```env
   GEMINI_API_KEY=your-key-here
   AI_PROVIDER=gemini
   ```

3. **Restart the server**
   ```bash
   npm run server
   ```

4. **Test it!**
   - Create a resume bot
   - Chat with it
   - Gemini will respond!

---

## 🧪 Testing

Create a test resume bot and ask:
- "What's your experience?"
- "What skills do you have?"
- "Tell me about your projects"

Gemini will respond based on the resume data, just like OpenAI!

---

## 🔧 Switching Between Providers

Want to try both? Just change the `.env` file:

```env
# Use Gemini
AI_PROVIDER=gemini
GEMINI_API_KEY=your-gemini-key

# Use OpenAI
# AI_PROVIDER=openai
# OPENAI_API_KEY=your-openai-key
```

Restart the server, and you're done!

---

## 📊 Model Comparison

| Feature | Gemini Pro | GPT-3.5-turbo |
|---------|-----------|---------------|
| Quality | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Speed | ⚡ Very Fast | ⚡ Fast |
| Free Tier | ✅ 1,500/day | ❌ Pay only |
| Context Window | 32K tokens | 16K tokens |
| Cost (paid) | Cheaper | More expensive |

**Recommendation: Start with Gemini's free tier!**

---

## ❓ Troubleshooting

### Error: "API key not found"
- Make sure `GEMINI_API_KEY` is set in `.env`
- Check for typos
- Restart the server

### Error: "API key invalid"
- Verify the key at https://makersuite.google.com
- Make sure you copied the entire key
- Check if the key is enabled

### Error: "Quota exceeded"
- You've hit the free tier limit (1,500/day)
- Wait 24 hours for reset
- Or upgrade to paid tier

---

## 🎉 Benefits for Your Startup

1. **$0 cost to start** - Free tier is generous
2. **Scale gradually** - Upgrade when needed
3. **Better margins** - Lower AI costs = higher profit
4. **Google ecosystem** - Easy integration with other Google services
5. **Reliable** - Google's infrastructure

---

## 📝 Notes

- Both APIs work identically from the user's perspective
- Gemini responses are slightly different in style but equally good
- You can switch providers anytime without code changes
- The app handles both seamlessly

---

## ✅ You're All Set!

Your ResumeBot now supports **Google Gemini**! 🎊

Just add your API key and you're ready to create AI-powered resume chatbots with **zero AI costs** (within free tier limits).

**Happy Building! 🚀**
