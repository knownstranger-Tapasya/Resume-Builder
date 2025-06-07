const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const auth = require('../middleware/auth');
const { apiLimiter, pdfLimiter } = require('../middleware/rateLimiter');

// Create resume
router.post('/', auth, apiLimiter, async (req, res) => {
  try {
    const newResume = new Resume({
      userId: req.user.id,
      ...req.body
    });

    const resume = await newResume.save();
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all resumes for a user
router.get('/', auth, apiLimiter, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(resumes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get single resume by ID
router.get('/:id', auth, apiLimiter, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check user
    if (resume.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    res.json(resume);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(500).send('Server Error');
  }
});

// Update resume
router.put('/:id', auth, apiLimiter, async (req, res) => {
  try {
    let resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check user
    if (resume.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(resume);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(500).send('Server Error');
  }
});

// Delete resume
router.delete('/:id', auth, apiLimiter, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check user
    if (resume.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await resume.deleteOne();

    res.json({ message: 'Resume removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(500).send('Server Error');
  }
});

// Get public resume
router.get('/public/:id', apiLimiter, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id).select('-user');
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (!resume.isPublic) {
      return res.status(401).json({ message: 'This resume is private' });
    }

    res.json(resume);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;