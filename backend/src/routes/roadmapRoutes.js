const express = require("express");
const router = express.Router();
const {
  generateAndSaveRoadmap,
  getAllRoadmaps,
  getRoadmapById,
  deleteRoadmap,
} = require("../controllers/roadmapController");
const { protect, optionalAuth } = require("../middleware/authMiddleware");

// Public with optional auth — guests can generate but won't have history saved under a user
router.post("/roadmap/generate", optionalAuth, generateAndSaveRoadmap);

// Protected — only logged in users can see/delete their history
router.get("/roadmaps", protect, getAllRoadmaps);
router.get("/roadmap/:id", protect, getRoadmapById);
router.delete("/roadmap/:id", protect, deleteRoadmap);

module.exports = router;
