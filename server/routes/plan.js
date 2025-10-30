const express = require('express');
const auth = require('../middleware/auth');
const { getPlanInfo } = require('../middleware/planLimits');
const User = require('../models/User');

const router = express.Router();

// Get user's plan information
router.get('/info', auth, getPlanInfo);

// Upgrade plan (for demo purposes - in production this would integrate with payment)
router.post('/upgrade', auth, async (req, res) => {
  try {
    const { plan } = req.body;
    const userId = req.userId;

    if (!['free', 'pro', 'team'].includes(plan)) {
      return res.status(400).json({ error: 'Invalid plan type' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // For demo purposes, allow direct upgrade
    // In production, this would be handled by payment processor webhooks
    user.plan = plan;
    user.planStartDate = new Date();
    
    // Set plan end date (monthly subscription)
    if (plan !== 'free') {
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);
      user.planEndDate = endDate;
    } else {
      user.planEndDate = null;
    }

    await user.save();

    res.json({
      message: `Successfully upgraded to ${plan} plan`,
      plan: user.plan,
      planStartDate: user.planStartDate,
      planEndDate: user.planEndDate,
    });
  } catch (error) {
    console.error('Plan upgrade error:', error);
    res.status(500).json({ error: 'Failed to upgrade plan' });
  }
});

// Downgrade to free plan
router.post('/downgrade', auth, async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.plan = 'free';
    user.planEndDate = null;
    await user.save();

    res.json({
      message: 'Successfully downgraded to free plan',
      plan: user.plan,
    });
  } catch (error) {
    console.error('Plan downgrade error:', error);
    res.status(500).json({ error: 'Failed to downgrade plan' });
  }
});

// Get all available plans
router.get('/available', (req, res) => {
  res.json({
    plans: [
      {
        id: 'free',
        name: 'Free',
        price: 0,
        period: 'forever',
        description: 'Perfect for students getting started',
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
        price: 9.99,
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
          'Remove ResumeBot branding',
        ],
        popular: true,
      },
      {
        id: 'team',
        name: 'Team',
        price: 29.99,
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
          'API access',
        ],
      },
    ],
  });
});

module.exports = router;
