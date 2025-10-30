import Link from 'next/link';
import { FaRobot, FaArrowLeft } from 'react-icons/fa';

export default function CookiePolicy() {
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
            <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
            <p className="text-gray-700 mb-4">
              Cookies are small text files that are placed on your device when you visit a website. They help the 
              website recognize your device and store information about your preferences or past actions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
            <p className="text-gray-700 mb-4">
              ResumeBot uses cookies for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Authentication:</strong> To keep you logged in to your account</li>
              <li><strong>Security:</strong> To protect your account from unauthorized access</li>
              <li><strong>Preferences:</strong> To remember your settings and preferences</li>
              <li><strong>Analytics:</strong> To understand how users interact with our service</li>
              <li><strong>Performance:</strong> To optimize and improve our platform</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Essential Cookies</h3>
              <p className="text-gray-700">
                These cookies are necessary for the website to function properly. They enable core functionality 
                such as security, authentication, and session management. These cookies cannot be disabled.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Cookies</h3>
              <p className="text-gray-700">
                These cookies help us understand how visitors interact with our website by collecting and reporting 
                information anonymously. This helps us improve our service.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Functional Cookies</h3>
              <p className="text-gray-700">
                These cookies enable enhanced functionality and personalization, such as remembering your preferences 
                and settings.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Cookies</h2>
            <p className="text-gray-700 mb-4">
              Some cookies are placed by third-party services that appear on our pages:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Google Gemini API:</strong> For AI-powered chatbot responses</li>
              <li><strong>MongoDB Atlas:</strong> For secure data storage</li>
              <li><strong>Analytics Services:</strong> To track usage and improve our service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Managing Cookies</h2>
            <p className="text-gray-700 mb-4">
              You can control and manage cookies in several ways:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Browser Settings:</strong> Most browsers allow you to refuse cookies or delete existing cookies</li>
              <li><strong>Opt-Out:</strong> You can opt-out of analytics cookies through your browser settings</li>
              <li><strong>Do Not Track:</strong> We respect Do Not Track browser settings</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Please note that disabling certain cookies may affect the functionality of our website and limit your 
              ability to use some features.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Updates to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
              operational, legal, or regulatory reasons.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
            <p className="text-gray-700">
              If you have questions about our use of cookies, please contact us at:
            </p>
            <p className="text-blue-600 font-semibold mt-2">
              privacy@resumebot.com
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
