#!/bin/bash

echo "🤖 ResumeBot Setup Script"
echo "=========================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created. Please edit it with your credentials:"
    echo "   - MongoDB URI (local or Atlas)"
    echo "   - JWT Secret (generate a strong random string)"
    echo "   - OpenAI API Key"
    echo ""
else
    echo "✅ .env file already exists"
fi

# Check if MongoDB is running (if using local)
echo "🔍 Checking MongoDB connection..."
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB is installed"
else
    echo "⚠️  MongoDB not found locally. Make sure to:"
    echo "   - Install MongoDB locally, OR"
    echo "   - Use MongoDB Atlas (cloud)"
    echo "   - Update MONGODB_URI in .env file"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your credentials"
echo "2. Make sure MongoDB is running"
echo "3. Run 'npm run server' in one terminal"
echo "4. Run 'npm run dev' in another terminal"
echo "5. Visit http://localhost:3000"
echo ""
echo "Or run both together with: npm run dev:all"
echo ""
echo "📖 Check README.md for detailed documentation"
