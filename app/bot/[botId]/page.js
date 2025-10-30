'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { FaRobot, FaPaperPlane, FaUser } from 'react-icons/fa';

export default function BotPage() {
  const params = useParams();
  const [resume, setResume] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchBotData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchBotData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bot/${params.botId}`);
      if (response.ok) {
        const data = await response.json();
        setResume(data);
        
        // Add welcome message
        setMessages([{
          role: 'assistant',
          content: `👋 Hi! I'm an AI assistant representing ${data.personalInfo.fullName}. Ask me anything about ${data.personalInfo.fullName.split(' ')[0]}'s experience, skills, projects, or education!`,
        }]);
      }
    } catch (error) {
      console.error('Error fetching bot:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setMessages([...messages, { role: 'user', content: userMessage }]);
    setSending(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/${params.botId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSessionId(data.sessionId);
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        const errorData = await response.json();
        console.error('API error:', errorData);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Sorry, I encountered an error: ${errorData.error || 'Please try again.'}`,
        }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      }]);
    } finally {
      setSending(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaRobot className="text-6xl text-blue-600 animate-bounce mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading bot...</p>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaRobot className="text-6xl text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bot Not Found</h1>
          <p className="text-gray-600">The resume bot you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 sm:p-3 rounded-full flex-shrink-0">
              <FaRobot className="text-2xl sm:text-3xl text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{resume.personalInfo.fullName}</h1>
              <p className="text-sm sm:text-base text-gray-600 truncate">{resume.personalInfo.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-5xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-xl overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 140px)' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 sm:space-x-3 ${
                  msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`p-1.5 sm:p-2 rounded-full flex-shrink-0 ${
                    msg.role === 'assistant'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                      : 'bg-gray-600'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <FaRobot className="text-white text-base sm:text-xl" />
                  ) : (
                    <FaUser className="text-white text-base sm:text-xl" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] sm:max-w-xl px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl ${
                    msg.role === 'assistant'
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm sm:text-base break-words">{msg.content}</p>
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 sm:p-2 rounded-full">
                  <FaRobot className="text-white text-base sm:text-xl" />
                </div>
                <div className="bg-gray-100 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-3 sm:p-4 bg-gray-50">
            <div className="flex space-x-2 sm:space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={sending}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
              />
                            <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || sending}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <FaPaperPlane className="text-base sm:text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3">
          {[
            "What's your experience?",
            "Tell me about your skills",
            "What projects have you done?",
            "What's your education?",
          ].map((question, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(question)}
              className="px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition text-xs sm:text-sm"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
