import Link from 'next/link';
import { FaRobot, FaArrowLeft } from 'react-icons/fa';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4">
            <FaArrowLeft />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-3">
            <FaRobot className="text-3xl text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> October 30, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing or using ResumeBot, you agree to be bound by these Terms of Service and our Privacy Policy. 
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
            <p className="text-gray-700 mb-4">
              ResumeBot is an AI-powered platform that allows users to transform their traditional resumes into 
              interactive chatbots. Our service provides:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>AI chatbot creation based on your resume data</li>
              <li>Shareable bot links for potential employers</li>
              <li>Analytics on bot interactions and views</li>
              <li>Embed code for portfolio websites</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-700 mb-4">You agree to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Provide accurate and truthful information in your resume</li>
              <li>Maintain the security of your account credentials</li>
              <li>Not use the service for any illegal or unauthorized purpose</li>
              <li>Not upload malicious content or attempt to harm the platform</li>
              <li>Not share, sell, or transfer your account to others</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              You retain ownership of your resume content. By using our service, you grant ResumeBot a license to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Process your data to generate AI chatbot responses</li>
              <li>Store your information securely in our databases</li>
              <li>Display your public bot to visitors who have the link</li>
            </ul>
            <p className="text-gray-700 mt-4">
              ResumeBot and its original content, features, and functionality are owned by us and are protected 
              by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Prohibited Uses</h2>
            <p className="text-gray-700 mb-4">You may not use ResumeBot to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit harmful or malicious code</li>
              <li>Harass, abuse, or harm others</li>
              <li>Impersonate another person or entity</li>
              <li>Collect or store personal data of other users</li>
              <li>Interfere with or disrupt the service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Account Termination</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to suspend or terminate your account if you violate these terms or engage in 
              activities that harm the platform or other users. You may also delete your account at any time through 
              your dashboard.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-gray-700 mb-4">
              ResumeBot is provided "as is" without warranties of any kind. We do not guarantee that:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>The service will be uninterrupted or error-free</li>
              <li>All AI-generated responses will be accurate</li>
              <li>The service will meet your specific requirements</li>
              <li>Any defects will be corrected</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              To the maximum extent permitted by law, ResumeBot shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages resulting from your use or inability to use the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these terms at any time. We will notify users of any material changes 
              via email or through the platform. Continued use of the service after changes constitutes acceptance 
              of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
            <p className="text-gray-700">
              For questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-blue-600 font-semibold mt-2">
              legal@resumebot.com
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
