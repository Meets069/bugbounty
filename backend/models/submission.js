const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  bugName: { type: String, required: true },
  solutionDescription: { type: String, required: true },
  mediaLink: { type: String },
  winnerName: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Submission", submissionSchema);
