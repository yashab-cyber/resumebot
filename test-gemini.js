const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

async function testGeminiAPI() {
  console.log('🧪 Testing Gemini API...\n');
  
  // Check if API key exists
  const apiKey = process.env.GEMINI_API_KEY;
  console.log('🔑 API Key Status:', apiKey ? '✅ Present' : '❌ Missing');
  console.log('🔑 API Key Value:', apiKey);
  console.log('🔑 API Key Length:', apiKey ? apiKey.length : 0);
  console.log('');
  
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY is not set in .env file!');
    process.exit(1);
  }

  try {
    // Initialize Gemini
    console.log('📦 Initializing Gemini...');
    const genAI = new GoogleGenerativeAI(apiKey);
    console.log('✅ Gemini initialized successfully\n');

    // List available models first
    console.log('📋 Listing available models...');
    try {
      const models = await genAI.listModels();
      console.log('Available models:');
      for await (const model of models) {
        console.log(`  - ${model.name} (${model.displayName})`);
      }
      console.log('');
    } catch (listError) {
      console.log('⚠️  Could not list models, trying common model names...\n');
    }

    // Try different model names
    const modelNamesToTry = [
      'gemini-2.0-flash-exp',
      'gemini-1.5-pro-latest',
      'gemini-1.5-flash-latest',
      'gemini-pro',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'models/gemini-pro',
      'models/gemini-1.5-pro'
    ];

    let workingModel = null;
    let workingModelName = null;

    for (const modelName of modelNamesToTry) {
      try {
        console.log(`🤖 Trying model: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        // Test prompt
        const testPrompt = 'Say "Hello! The Gemini API is working perfectly!" in a friendly way.';
        console.log(`📤 Sending test prompt...`);
        
        const result = await model.generateContent(testPrompt);
        const response = await result.response;
        const text = response.text();
        
        workingModel = model;
        workingModelName = modelName;
        
        console.log(`✅ SUCCESS! Model ${modelName} is working!\n`);
        console.log('📨 Response from Gemini:');
        console.log('─'.repeat(50));
        console.log(text);
        console.log('─'.repeat(50));
        console.log(`\n🎉 All tests passed! Your Gemini API key is valid and working with model: ${modelName}\n`);
        break;
        
      } catch (modelError) {
        console.log(`❌ Model ${modelName} failed: ${modelError.message.split('\n')[0]}\n`);
      }
    }

    if (!workingModel) {
      throw new Error('None of the common model names worked. The API key might be invalid or have restrictions.');
    }

  } catch (error) {
    console.error('\n❌ ERROR: Gemini API test failed!\n');
    console.error('Error Type:', error.name);
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    
    if (error.message.includes('API_KEY_INVALID') || error.message.includes('invalid')) {
      console.error('\n⚠️  The API key appears to be invalid. Please check:');
      console.error('1. The API key is correct');
      console.error('2. The API key has Gemini API enabled');
      console.error('3. Visit: https://makersuite.google.com/app/apikey to verify');
    } else if (error.message.includes('quota') || error.message.includes('limit')) {
      console.error('\n⚠️  API quota exceeded. Please check your Google Cloud console.');
    } else if (error.message.includes('network') || error.message.includes('ENOTFOUND')) {
      console.error('\n⚠️  Network error. Please check your internet connection.');
    }
    
    process.exit(1);
  }
}

// Run the test
testGeminiAPI();
