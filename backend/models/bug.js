const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema({
  bugId: {
    type: String,
    unique: true  
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  bounty: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["Open", "In Review", "Closed"],
    default: "Open"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to generate unique 6-digit bug ID
bugSchema.pre("save", async function (next) {
  if (!this.bugId) {
    let unique = false;
    while (!unique) {
      // Generate random 6-digit number (100000 - 999999)
      const randomId = Math.floor(100000 + Math.random() * 900000);
      
      // Check if it already exists in DB
      const existing = await mongoose.models.Bug.findOne({ bugId: randomId.toString() });
      if (!existing) {
        this.bugId = randomId.toString();
        unique = true;
      }
    }
  }
  next();
});

module.exports = mongoose.model("Bug", bugSchema);
