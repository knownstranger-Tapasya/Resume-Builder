const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require('../middlewares/uploadMiddleware');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authLimiter } = require('../middleware/rateLimiter');
const auth = require('../middleware/auth');

const router = express.Router();

//Auth Routes 
router.post("/register", authLimiter, registerUser);

router.post("/login", authLimiter, loginUser);

// Get user profile
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id || req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put("/profile", auth, async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    
    // Check if email is already taken by another user
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: req.user.id } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already taken' });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user.id || req.user._id,
      { 
        $set: { 
          name: name || undefined,
          email: email || undefined,
          bio: bio || undefined
        } 
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user preferences
router.put("/preferences", auth, async (req, res) => {
  try {
    const { emailNotifications, theme } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { 
        $set: { 
          'preferences.emailNotifications': emailNotifications,
          'preferences.theme': theme
        } 
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error updating preferences:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Change password
router.put("/change-password", auth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    
    // Find user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post("/upload-image", upload.single("image"), (req,res) => {
    if (!req.file) {
        return res.status(400).json({message: "No file uploaded"});
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;
    res.status(200).json({imageUrl});
});

module.exports = router;

