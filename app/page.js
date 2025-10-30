'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaArrowRight, FaCheck, FaShare, FaDownload, FaCode } from 'react-icons/fa';

export default function Home() {
  const [email, setEmail] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const demoConversation = [
    {
      role: 'assistant',
      content: "👋 Hi! I'm an AI assistant representing John Doe. Ask me anything about John's experience, skills, projects, or education!",
      delay: 500
    },
    {
      role: 'user',
      content: "What projects have you worked on?",
      delay: 2500
    },
    {
      role: 'assistant',
      content: "I've worked on several exciting projects! Recently, I built a full-stack e-commerce platform using React and Node.js, and created an AI-powered chatbot similar to this one. Would you like to know more about any specific project?",
      delay: 4000
    }
  ];

  useEffect(() => {
    let timeouts = [];
    let currentDelay = 0;

    demoConversation.forEach((message, index) => {
      currentDelay += message.delay;
      
      const timeout = setTimeout(() => {
        if (message.role === 'assistant') {
          setIsTyping(true);
          setTimeout(() => {
            setChatMessages(prev => [...prev, message]);
            setIsTyping(false);
          }, 1000);
        } else {
          setChatMessages(prev => [...prev, message]);
        }
      }, currentDelay);
      
      timeouts.push(timeout);
    });

    // Reset and loop
    const resetTimeout = setTimeout(() => {
      setChatMessages([]);
    }, currentDelay + 5000);
    
    timeouts.push(resetTimeout);

    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, []);

  const features = [
    {
      icon: <FaRobot className="text-4xl" />,
      title: 'AI-Powered Chatbot',
      description: 'Your resume becomes an intelligent chatbot that answers questions about your experience and skills.'
    },
    {
      icon: <FaShare className="text-4xl" />,
      title: 'Shareable Link',
      description: 'Get a unique shareable link to your resume bot. Share it on LinkedIn, email, or anywhere.'
    },
    {
      icon: <FaCode className="text-4xl" />,
      title: 'Embed in Portfolio',
      description: 'Get embed code to integrate your resume bot directly into your personal website or portfolio.'
    },
    {
      icon: <FaDownload className="text-4xl" />,
      title: 'Download & Export',
      description: 'Download your bot widget or export your data anytime. Full control over your information.'
    }
  ];

  const benefits = [
    'Stand out from traditional paper resumes',
    '24/7 interactive experience for recruiters',
    'Showcase your tech-savviness',
    'Easy to update and maintain',
    'Track views and engagement',
    'Mobile-friendly and responsive'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <FaRobot className="text-2xl sm:text-3xl text-blue-600" />
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ResumeBot
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/login" className="text-sm sm:text-base text-gray-700 hover:text-blue-600 transition">
                Login
              </Link>
              <Link 
                href="/register" 
                className="bg-blue-600 text-white px-3 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent px-4">
              Transform Your Resume
              <br />
              Into an AI Chatbot
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Say goodbye to boring paper resumes. Create an interactive AI-powered chatbot that showcases your skills and experience in a revolutionary way.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <Link 
                href="/register"
                className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center space-x-2"
              >
                <span>Create Your Bot Free</span>
                <FaArrowRight />
              </Link>
              <Link 
                href="/demo"
                className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-50 transition"
              >
                See Demo
              </Link>
            </div>
          </motion.div>

          {/* Demo Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-4 sm:p-8 text-left min-h-[300px]">
                <AnimatePresence>
                  {chatMessages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-start space-x-2 sm:space-x-4 mb-4 ${
                        msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="bg-white p-2 sm:p-3 rounded-full flex-shrink-0">
                          <FaRobot className="text-lg sm:text-2xl text-blue-600" />
                        </div>
                      )}
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className={`rounded-lg p-3 sm:p-4 shadow-md max-w-[85%] ${
                          msg.role === 'assistant'
                            ? 'bg-white text-gray-800'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        <p className="text-sm sm:text-base">{msg.content}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start space-x-2 sm:space-x-4"
                  >
                    <div className="bg-white p-2 sm:p-3 rounded-full">
                      <FaRobot className="text-lg sm:text-2xl text-blue-600" />
                    </div>
                    <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md">
                      <div className="flex space-x-2">
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl hover:shadow-lg transition"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                Why Choose ResumeBot?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                In today's competitive job market, you need to stand out. ResumeBot helps you make a lasting impression on recruiters and hiring managers.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <div className="bg-green-500 rounded-full p-1">
                      <FaCheck className="text-white text-sm" />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-6">Ready to revolutionize your job search?</h3>
              <p className="text-lg mb-6">
                Join thousands of students and professionals who have transformed their resumes into engaging AI chatbots.
              </p>
              <Link 
                href="/register"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Create Your Resume Bot Today
          </h2>
          <p className="text-xl mb-8">
            It takes less than 5 minutes to create your AI-powered resume chatbot.
          </p>
          <Link 
            href="/register"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Start For Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FaRobot className="text-3xl text-blue-400" />
            <span className="text-2xl font-bold">ResumeBot</span>
          </div>
          <p className="text-gray-400 mb-4">
            Transforming traditional resumes into interactive AI experiences
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 ResumeBot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
