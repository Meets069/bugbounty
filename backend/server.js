const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
// backend/server.js
const userRoutes = require("./routes/userRoutes"); 
const bugRoutes = require("./routes/bugRoutes"); 
const submissionRoutes = require("./routes/submissionRoutes");



const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.set("strictQuery", false); 
mongoose.connect("mongodb://127.0.0.1:27017/bugbounty", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error("MongoDB connection error:", err));

app.use("/", userRoutes);
app.use("/bugs", bugRoutes);
app.use("/submissions", submissionRoutes);

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
