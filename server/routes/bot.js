const express = require('express');
const Resume = require('../models/Resume');

const router = express.Router();

// Get public bot by botId
router.get('/:botId', async (req, res) => {
  try {
    const resume = await Resume.findOne({
      botId: req.params.botId,
      isPublic: true,
    });

    if (!resume) {
      return res.status(404).json({ error: 'Bot not found' });
    }

    // Increment view count
    resume.analytics.views += 1;
    await resume.save();

    res.json(resume);
  } catch (error) {
    console.error('Fetch bot error:', error);
    res.status(500).json({ error: 'Failed to fetch bot' });
  }
});

// Track interaction
router.post('/:botId/interact', async (req, res) => {
  try {
    const resume = await Resume.findOne({
      botId: req.params.botId,
    });

    if (resume) {
      resume.analytics.interactions += 1;
      await resume.save();
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Track interaction error:', error);
    res.status(500).json({ error: 'Failed to track interaction' });
  }
});

// Track share
router.post('/:botId/share', async (req, res) => {
  try {
    const resume = await Resume.findOne({
      botId: req.params.botId,
    });

    if (resume) {
      resume.analytics.shares += 1;
      await resume.save();
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Track share error:', error);
    res.status(500).json({ error: 'Failed to track share' });
  }
});

module.exports = router;
