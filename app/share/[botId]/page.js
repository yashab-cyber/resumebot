'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaRobot, FaCopy, FaLink, FaQrcode, FaCode, FaCheck } from 'react-icons/fa';
import QRCode from 'qrcode';

export default function SharePage() {
  const params = useParams();
  const [resume, setResume] = useState(null);
  const [copied, setCopied] = useState('');
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    fetchResume();
  }, []);

  useEffect(() => {
    if (resume) {
      generateQRCode();
    }
  }, [resume]);

  const fetchResume = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bot/${params.botId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setResume(data);
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
    }
  };

  const generateQRCode = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_APP_URL}/bot/${params.botId}`;
      const qr = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: '#0ea5e9',
          light: '#ffffff',
        },
      });
      setQrCode(qr);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const botUrl = `${process.env.NEXT_PUBLIC_APP_URL}/bot/${params.botId}`;

  const embedCode = `<iframe src="${botUrl}" width="100%" height="600" frameborder="0"></iframe>`;

  const widgetCode = `<!-- ResumeBot Widget -->
<div id="resumebot-widget"></div>
<script>
  (function() {
    const widget = document.getElementById('resumebot-widget');
    const iframe = document.createElement('iframe');
    iframe.src = '${botUrl}';
    iframe.width = '100%';
    iframe.height = '600px';
    iframe.frameBorder = '0';
    iframe.style.borderRadius = '10px';
    iframe.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    widget.appendChild(iframe);
  })();
</script>`;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);

    // Track share
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bot/${params.botId}/share`, {
      method: 'POST',
    });
  };

  if (!resume) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaRobot className="text-6xl text-blue-600 animate-bounce mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <FaRobot className="text-3xl text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ResumeBot
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
            <FaCheck className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🎉 Your Resume Bot is Live!</h1>
          <p className="text-gray-600">Share it with recruiters and add it to your portfolio</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Shareable Link */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaLink className="text-2xl text-blue-600" />
              <h2 className="text-xl font-bold">Shareable Link</h2>
            </div>
            <p className="text-gray-600 mb-4">Share this link on LinkedIn, email, or anywhere!</p>
            <div className="flex space-x-2">
              <input
                type="text"
                value={botUrl}
                readOnly
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg"
              />
              <button
                onClick={() => copyToClipboard(botUrl, 'link')}
                className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                {copied === 'link' ? <FaCheck /> : <FaCopy />}
              </button>
            </div>
            <Link
              href={`/bot/${params.botId}`}
              target="_blank"
              className="block mt-4 text-center bg-gray-100 text-blue-600 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
            >
              Preview Bot
            </Link>
          </div>

          {/* QR Code */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaQrcode className="text-2xl text-blue-600" />
              <h2 className="text-xl font-bold">QR Code</h2>
            </div>
            <p className="text-gray-600 mb-4">Add this QR code to your printed resume or business card</p>
            {qrCode && (
              <div className="text-center">
                <img src={qrCode} alt="QR Code" className="mx-auto border-4 border-blue-600 rounded-lg" />
                <a
                  href={qrCode}
                  download={`resumebot-${params.botId}.png`}
                  className="block mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Download QR Code
                </a>
              </div>
            )}
          </div>

          {/* Embed Code */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaCode className="text-2xl text-blue-600" />
              <h2 className="text-xl font-bold">Embed Code</h2>
            </div>
            <p className="text-gray-600 mb-4">Copy this code to embed the bot in your website</p>
            <textarea
              value={embedCode}
              readOnly
              rows="4"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm"
            />
            <button
              onClick={() => copyToClipboard(embedCode, 'embed')}
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center space-x-2"
            >
              {copied === 'embed' ? <FaCheck /> : <FaCopy />}
              <span>{copied === 'embed' ? 'Copied!' : 'Copy Embed Code'}</span>
            </button>
          </div>

          {/* Widget Code */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaRobot className="text-2xl text-blue-600" />
              <h2 className="text-xl font-bold">Widget Code</h2>
            </div>
            <p className="text-gray-600 mb-4">Advanced embed code with styling</p>
            <textarea
              value={widgetCode}
              readOnly
              rows="4"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm"
            />
            <button
              onClick={() => copyToClipboard(widgetCode, 'widget')}
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center space-x-2"
            >
              {copied === 'widget' ? <FaCheck /> : <FaCopy />}
              <span>{copied === 'widget' ? 'Copied!' : 'Copy Widget Code'}</span>
            </button>
          </div>
        </div>

        {/* Analytics */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Analytics</h2>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">{resume.analytics.views}</p>
              <p className="text-gray-600">Views</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">{resume.analytics.interactions}</p>
              <p className="text-gray-600">Interactions</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">{resume.analytics.shares}</p>
              <p className="text-gray-600">Shares</p>
            </div>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <Link
            href="/dashboard"
            className="inline-block bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition font-semibold"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
