const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const roadmapRoutes = require("./routes/roadmapRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    /\.vercel\.app$/,        // allows all Vercel preview + production URLs
  ],
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// Routes
app.use("/", authRoutes);
app.use("/", roadmapRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Margdarshak API is running 🚀" });
});

app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ success: false, message: "Internal server error" });
});

const PORT = process.env.API_PORT || process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/margdarshak";

mongoose.connect(MONGODB_URI).then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}).catch((err) => {
  console.error("❌ MongoDB connection failed:", err.message);
  process.exit(1);
});
