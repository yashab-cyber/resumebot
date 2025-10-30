const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Resume = require('../models/Resume');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { canCreateBot } = require('../middleware/planLimits');

const router = express.Router();

// Create/Update Resume
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.userId;
    const resumeData = req.body;

    let resume;
    if (resumeData._id) {
      // Update existing resume
      resume = await Resume.findOneAndUpdate(
        { _id: resumeData._id, userId },
        resumeData,
        { new: true }
      );
    } else {
      // Check plan limits before creating new resume
      const user = await User.findById(userId).populate('resumes');
      const planLimits = {
        free: { maxResumeBots: 1 },
        pro: { maxResumeBots: Infinity },
        team: { maxResumeBots: Infinity },
      };
      
      const currentBotCount = user.resumes.length;
      const maxBots = planLimits[user.plan].maxResumeBots;
      
      if (currentBotCount >= maxBots) {
        return res.status(403).json({
          error: `You've reached the limit of ${maxBots} resume bot${maxBots === 1 ? '' : 's'} for your ${user.plan} plan.`,
          upgrade: user.plan === 'free' ? 'pro' : null,
        });
      }

      // Create new resume
      const botId = uuidv4().substring(0, 8);
      resume = new Resume({
        ...resumeData,
        userId,
        botId,
      });
      await resume.save();
      
      // Add resume to user's resumes array
      user.resumes.push(resume._id);
      await user.save();
    }

    res.json(resume);
  } catch (error) {
    console.error('Resume save error:', error);
    res.status(500).json({ error: 'Failed to save resume' });
  }
});

// Get user's resumes
router.get('/my-resumes', auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId })
      .sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.error('Fetch resumes error:', error);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
});

// Get single resume
router.get('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    console.error('Fetch resume error:', error);
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
});

// Delete resume
router.delete('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ error: 'Failed to delete resume' });
  }
});

module.exports = router;
