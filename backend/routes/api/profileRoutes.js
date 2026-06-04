const express = require("express");
const authMiddleware = require("../../utils/auth");
const UserProfile = require("../../models/userProfile");

const router = express.Router();

// GET /api/profile — fetch logged-in user's profile
router.get("/", authMiddleware, async (req, res) => {
  try {
    let profile = await UserProfile.findOne({ user: req.user.id });

    // create empty profile if first time
    if (!profile) {
      profile = await UserProfile.create({ user: req.user.id });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/profile — save/update logged-in user's profile
router.put("/", authMiddleware, async (req, res) => {
  try {
    const { phone, dob, location, bio } = req.body;

    const profile = await UserProfile.findOneAndUpdate(
      { user: req.user.id },
      { phone, dob, location, bio },
      { new: true, upsert: true }
    );

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
