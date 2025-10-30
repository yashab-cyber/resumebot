'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaRobot, FaCheck, FaStar, FaCrown, FaUsers, FaArrowLeft } from 'react-icons/fa';

export default function Upgrade() {
  const router = useRouter();
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchPlanInfo(token);
  }, []);

  const fetchPlanInfo = async (token) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plan/info`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentPlan(data.plan);
      }
    } catch (error) {
      console.error('Error fetching plan info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planId) => {
    if (confirm(`Are you sure you want to upgrade to the ${planId} plan?`)) {
      setUpgrading(true);
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plan/upgrade`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ plan: planId }),
        });

        if (response.ok) {
          alert(`Successfully upgraded to ${planId} plan! 🎉`);
          router.push('/dashboard');
        } else {
          const data = await response.json();
          alert(data.error || 'Failed to upgrade plan');
        }
      } catch (error) {
        console.error('Upgrade error:', error);
        alert('Failed to upgrade plan. Please try again.');
      } finally {
        setUpgrading(false);
      }
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for students getting started',
      icon: <FaRobot className="text-3xl" />,
      color: 'from-blue-500 to-cyan-500',
      features: [
        '1 Resume Bot',
        'Basic AI responses',
        'Shareable link',
        'Download bot as HTML',
        'Community support',
        '5 conversations/day',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9.99',
      period: 'month',
      description: 'For serious job seekers',
      icon: <FaCrown className="text-3xl" />,
      color: 'from-yellow-500 to-orange-500',
      features: [
        'Unlimited Resume Bots',
        'Advanced AI responses',
        'Shareable links',
        'Download bots (HTML/PDF)',
        'Priority support',
        'Unlimited conversations',
        'Custom bot themes',
        'Analytics dashboard',
        'Remove ResumeBot branding',
      ],
      popular: true,
    },
    {
      id: 'team',
      name: 'Team',
      price: '$29.99',
      period: 'month',
      description: 'For recruiting teams and agencies',
      icon: <FaUsers className="text-3xl" />,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Everything in Pro',
        'Up to 10 team members',
        'Centralized dashboard',
        'Team collaboration',
        'Bulk bot creation',
        'Advanced analytics',
        'Custom integrations',
        'Dedicated support',
        'API access',
      ],
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <FaRobot className="text-6xl text-blue-600 animate-bounce mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/dashboard" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4">
            <FaArrowLeft />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center space-x-3">
            <FaRobot className="text-3xl text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Upgrade Your Plan</h1>
          </div>
          {currentPlan && (
            <p className="mt-2 text-gray-600">
              Current plan: <span className="font-semibold capitalize">{currentPlan}</span>
            </p>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose the Perfect Plan for You
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upgrade to unlock more features and create unlimited resume bots
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const isCurrent = currentPlan === plan.id;
            const canUpgrade = 
              (currentPlan === 'free' && (plan.id === 'pro' || plan.id === 'team')) ||
              (currentPlan === 'pro' && plan.id === 'team');

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                  plan.popular ? 'ring-4 ring-blue-500 transform scale-105' : ''
                } ${isCurrent ? 'opacity-75' : ''}`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 font-semibold flex items-center justify-center space-x-2">
                    <FaStar />
                    <span>MOST POPULAR</span>
                  </div>
                )}

                <div className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${plan.color} text-white mb-4`}>
                    {plan.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/ {plan.period}</span>
                  </div>

                  {isCurrent ? (
                    <div className="w-full text-center py-3 rounded-lg font-semibold bg-gray-200 text-gray-500 mb-6">
                      Current Plan
                    </div>
                  ) : canUpgrade ? (
                    <button
                      onClick={() => handleUpgrade(plan.id)}
                      disabled={upgrading}
                      className={`w-full text-center py-3 rounded-lg font-semibold transition mb-6 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      } ${upgrading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {upgrading ? 'Processing...' : `Upgrade to ${plan.name}`}
                    </button>
                  ) : (
                    <div className="w-full text-center py-3 rounded-lg font-semibold bg-gray-100 text-gray-500 mb-6">
                      Not Available
                    </div>
                  )}

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
            );
          })}
        </div>

        {/* Note */}
        <div className="bg-blue-50 rounded-xl p-6 text-center">
          <p className="text-gray-700">
            <strong>Note:</strong> This is a demo upgrade page. In production, this would integrate with a payment processor like Stripe.
          </p>
        </div>
      </main>
    </div>
  );
}
