const User = require('../models/User');
const Resume = require('../models/Resume');
const ChatHistory = require('../models/ChatHistory');

// Plan configurations
const PLAN_LIMITS = {
  free: {
    maxResumeBots: 1,
    maxConversationsPerDay: 5,
    features: {
      basicAI: true,
      advancedAI: false,
      shareableLink: true,
      downloadHTML: true,
      downloadPDF: false,
      customThemes: false,
      analytics: false,
      removeBranding: false,
      teamCollaboration: false,
      apiAccess: false,
    },
  },
  pro: {
    maxResumeBots: Infinity,
    maxConversationsPerDay: Infinity,
    features: {
      basicAI: true,
      advancedAI: true,
      shareableLink: true,
      downloadHTML: true,
      downloadPDF: true,
      customThemes: true,
      analytics: true,
      removeBranding: true,
      teamCollaboration: false,
      apiAccess: false,
    },
  },
  team: {
    maxResumeBots: Infinity,
    maxConversationsPerDay: Infinity,
    maxTeamMembers: 10,
    features: {
      basicAI: true,
      advancedAI: true,
      shareableLink: true,
      downloadHTML: true,
      downloadPDF: true,
      customThemes: true,
      analytics: true,
      removeBranding: true,
      teamCollaboration: true,
      apiAccess: true,
    },
  },
};

// Reset daily conversation count if needed
const resetDailyConversationsIfNeeded = async (user) => {
  const now = new Date();
  const lastReset = new Date(user.dailyConversations.lastReset);
  const hoursSinceReset = (now - lastReset) / (1000 * 60 * 60);

  if (hoursSinceReset >= 24) {
    user.dailyConversations.count = 0;
    user.dailyConversations.lastReset = now;
    await user.save();
  }
};

// Check if user can create a new resume bot
const canCreateBot = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).populate('resumes');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const planLimits = PLAN_LIMITS[user.plan];
    const currentBotCount = user.resumes.length;

    if (currentBotCount >= planLimits.maxResumeBots) {
      return res.status(403).json({
        message: `You've reached the limit of ${planLimits.maxResumeBots} resume bot${planLimits.maxResumeBots === 1 ? '' : 's'} for your ${user.plan} plan.`,
        upgrade: user.plan === 'free' ? 'pro' : null,
      });
    }

    next();
  } catch (error) {
    console.error('Error checking bot limit:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Check if user can send a chat message
const canSendMessage = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Reset daily count if needed
    await resetDailyConversationsIfNeeded(user);

    const planLimits = PLAN_LIMITS[user.plan];

    if (user.dailyConversations.count >= planLimits.maxConversationsPerDay) {
      return res.status(403).json({
        message: `You've reached your daily limit of ${planLimits.maxConversationsPerDay} conversations for the ${user.plan} plan.`,
        upgrade: user.plan === 'free' ? 'pro' : null,
        resetTime: new Date(user.dailyConversations.lastReset.getTime() + 24 * 60 * 60 * 1000),
      });
    }

    // Increment conversation count
    user.dailyConversations.count += 1;
    await user.save();

    next();
  } catch (error) {
    console.error('Error checking message limit:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Check if user has access to a feature
const hasFeature = (feature) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const planLimits = PLAN_LIMITS[user.plan];

      if (!planLimits.features[feature]) {
        return res.status(403).json({
          message: `This feature is not available in your ${user.plan} plan.`,
          upgrade: user.plan === 'free' ? 'pro' : user.plan === 'pro' ? 'team' : null,
        });
      }

      next();
    } catch (error) {
      console.error('Error checking feature access:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
};

// Get user's plan information
const getPlanInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('resumes');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await resetDailyConversationsIfNeeded(user);

    const planLimits = PLAN_LIMITS[user.plan];
    const currentBotCount = user.resumes.length;

    res.json({
      plan: user.plan,
      planStartDate: user.planStartDate,
      planEndDate: user.planEndDate,
      limits: {
        maxResumeBots: planLimits.maxResumeBots,
        currentResumeBots: currentBotCount,
        maxConversationsPerDay: planLimits.maxConversationsPerDay,
        currentConversationsToday: user.dailyConversations.count,
        conversationsResetTime: new Date(user.dailyConversations.lastReset.getTime() + 24 * 60 * 60 * 1000),
      },
      features: planLimits.features,
    });
  } catch (error) {
    console.error('Error getting plan info:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  PLAN_LIMITS,
  canCreateBot,
  canSendMessage,
  hasFeature,
  getPlanInfo,
};
