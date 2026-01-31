const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const UserProfile = require("../models/UserProfile");

router.get("/me", protect, async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.user._id });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
