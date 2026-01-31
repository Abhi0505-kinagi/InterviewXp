const express = require("express");
const router = express.Router();
const User = require("../models/Userschema");
const generateToken = require("../utils/jwt");

// REGISTER
router.post("/register", async (req, res) => {
  const { name, displayName, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    user = new User({ name, displayName, email, password });
    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({ success: true,message: "User created successfully",token, user: { id: user._id, name, displayName, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);
    res.status(200).json({ token, user: { id: user._id, name: user.name, displayName: user.displayName, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
