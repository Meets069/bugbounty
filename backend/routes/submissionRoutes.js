const express = require("express");
const Submission = require("../models/submission");

const router = express.Router();

// Create a new submission
router.post("/create", async (req, res) => {
  try {
    const { userName, bugName, solutionDescription, mediaLink, winnerName } = req.body;

    const newSubmission = await Submission.create({
      userName,
      bugName,
      solutionDescription,
      mediaLink,
      winnerName
    });

    res.status(201).json({ message: "Solution submitted successfully", submission: newSubmission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
