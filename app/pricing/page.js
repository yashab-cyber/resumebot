import Link from 'next/link';
import { FaRobot, FaArrowLeft, FaCheck, FaStar } from 'react-icons/fa';

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for students getting started',
      features: [
        '1 Resume Bot',
        'Basic AI responses',
        'Shareable link',
        'Download bot as HTML',
        'Community support',
        '5 conversations/day'
      ],
      cta: 'Get Started',
      ctaLink: '/register',
      popular: false
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'month',
      description: 'For serious job seekers',
      features: [
        'Unlimited Resume Bots',
        'Advanced AI responses',
        'Shareable links',
        'Download bots (HTML/PDF)',
        'Priority support',
        'Unlimited conversations',
        'Custom bot themes',
        'Analytics dashboard',
        'Remove ResumeBot branding'
      ],
      cta: 'Upgrade to Pro',
      ctaLink: '/register',
      popular: true
    },
    {
      name: 'Team',
      price: '$29.99',
      period: 'month',
      description: 'For recruiting teams and agencies',
      features: [
        'Everything in Pro',
        'Up to 10 team members',
        'Centralized dashboard',
        'Team collaboration',
        'Bulk bot creation',
        'Advanced analytics',
        'Custom integrations',
        'Dedicated support',
        'API access'
      ],
      cta: 'Contact Sales',
      ctaLink: '/contact',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4">
            <FaArrowLeft />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-3">
            <FaRobot className="text-3xl text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Pricing Plans</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose the Perfect Plan for You
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start for free and upgrade as you grow. All plans include our core AI-powered resume bot features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-4 ring-blue-500 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 font-semibold flex items-center justify-center space-x-2">
                  <FaStar />
                  <span>MOST POPULAR</span>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/ {plan.period}</span>
                </div>

                <Link
                  href={plan.ctaLink}
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition mb-6 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>

                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I switch plans later?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for Team plans.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Is there a free trial for paid plans?
              </h3>
              <p className="text-gray-600">
                Yes! Pro and Team plans come with a 14-day free trial. No credit card required.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600">
                Absolutely. Cancel your subscription at any time with no penalties or hidden fees.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Do you offer student discounts?
              </h3>
              <p className="text-gray-600">
                Yes! Students get 50% off Pro plans with a valid .edu email address.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                What happens to my bots if I downgrade?
              </h3>
              <p className="text-gray-600">
                Your bots remain active, but you'll need to choose which ones to keep based on your plan limit.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of students landing their dream jobs with AI-powered resume bots
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition"
          >
            Create Your Free Account
          </Link>
        </div>
      </main>
    </div>
  );
}
