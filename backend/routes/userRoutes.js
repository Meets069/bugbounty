const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/users"); 

const router = express.Router();
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;


router.post("/register", async (req, res) => {
  try {

    const { name, email, password, role, team } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password too weak." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role, 
      teamName: team // Match the field name in your model
    });

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database Error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Account does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid Password" });

    
    res.json({ 
      message: "Login successful", 
      user: {
        id: user._id,
        name: user.name,
        role: user.role, 
        team: user.teamName
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
