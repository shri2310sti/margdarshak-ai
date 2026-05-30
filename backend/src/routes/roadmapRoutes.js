const express = require("express");
const router = express.Router();
const {
    generateAndSaveRoadmap,
    getAllRoadmaps,
    getRoadmapById,
    deleteRoadmap,
} = require("../controllers/roadmapController");

// POST   /roadmap/generate   → generate and save a new roadmap
router.post("/roadmap/generate", generateAndSaveRoadmap);

// GET    /roadmaps            → get all roadmaps
router.get("/roadmaps", getAllRoadmaps);

// GET    /roadmap/:id         → get single roadmap by id
router.get("/roadmap/:id", getRoadmapById);

// DELETE /roadmap/:id         → delete a roadmap
router.delete("/roadmap/:id", deleteRoadmap);

module.exports = router;