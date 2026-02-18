const express = require("express");
const bugs = require("../models/bug");

const router = express.Router();

router.post("/create", async (req, res) => {
   try
   { 
    const {title, description, bounty } = req.body;
    const exists = await bugs.findOne({ title }); 
    if (exists) 
    {
        return res.status(400).json({ message: "Bug already exists" });
    }
    
    const newBug = await bugs.create({title, description, bounty }); 
    res.status(201).json({ message: "Bug Create Successfully" }); 
  } 
  catch (error) { 
    
    res.status(500).json({ error: error.message });
   } 
});


router.get("/", async (req, res) => {
  try {
    const allBugs = await bugs.find().sort({ createdAt: -1 });
    res.json(allBugs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
