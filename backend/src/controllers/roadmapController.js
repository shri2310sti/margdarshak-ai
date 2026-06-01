const Roadmap = require("../models/Roadmap");
const { generateRoadmap } = require("../services/roadmapService");
const { generateRoadmapWithAI } = require("../services/openaiService");

// ─── POST /roadmap/generate ───────────────────────────────────────────────────
const generateAndSaveRoadmap = async (req, res) => {
  try {
    const { targetRole, currentSkills, experienceLevel } = req.body;

    if (!targetRole?.trim())
      return res.status(400).json({ success: false, message: "Target role is required." });
    if (!currentSkills?.trim())
      return res.status(400).json({ success: false, message: "Current skills are required." });

    const validLevels = ["beginner", "intermediate", "advanced"];
    const level = experienceLevel?.toLowerCase() || "beginner";
    if (!validLevels.includes(level))
      return res.status(400).json({ success: false, message: "Experience level must be beginner, intermediate, or advanced." });

    // Generate roadmap — try OpenAI first, fallback to rule-based
    let roadmapData;
    const hasOpenAI = !!process.env.OPENAI_API_KEY;

    if (hasOpenAI) {
      try {
        roadmapData = await generateRoadmapWithAI(targetRole.trim(), currentSkills.trim(), level);
        console.log("✅ Roadmap generated via OpenAI");
      } catch (aiError) {
        console.warn("⚠️  OpenAI failed, falling back:", aiError.message);
        roadmapData = generateRoadmap(targetRole.trim(), currentSkills.trim(), level);
      }
    } else {
      roadmapData = generateRoadmap(targetRole.trim(), currentSkills.trim(), level);
    }

    // Save with userId if user is logged in (req.userId set by auth middleware)
    const roadmap = new Roadmap({
      userId: req.userId || null,
      targetRole: targetRole.trim(),
      currentSkills: currentSkills.trim(),
      experienceLevel: level,
      steps: roadmapData.steps,
      summary: roadmapData.summary,
      totalEstimatedTime: roadmapData.totalEstimatedTime,
    });

    const saved = await roadmap.save();
    return res.status(201).json({ success: true, message: "Roadmap generated successfully!", data: saved });
  } catch (error) {
    console.error("Error generating roadmap:", error.message);
    return res.status(500).json({ success: false, message: "Failed to generate roadmap." });
  }
};

// ─── GET /roadmaps ────────────────────────────────────────────────────────────
// Only returns roadmaps belonging to the logged-in user
const getAllRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .select("targetRole currentSkills experienceLevel summary totalEstimatedTime createdAt");
    return res.status(200).json({ success: true, count: roadmaps.length, data: roadmaps });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch roadmaps." });
  }
};

// ─── GET /roadmap/:id ─────────────────────────────────────────────────────────
const getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ _id: req.params.id, userId: req.userId });
    if (!roadmap)
      return res.status(404).json({ success: false, message: "Roadmap not found." });
    return res.status(200).json({ success: true, data: roadmap });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch roadmap." });
  }
};

// ─── DELETE /roadmap/:id ──────────────────────────────────────────────────────
const deleteRoadmap = async (req, res) => {
  try {
    const deleted = await Roadmap.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!deleted)
      return res.status(404).json({ success: false, message: "Roadmap not found." });
    return res.status(200).json({ success: true, message: "Roadmap deleted successfully.", data: { id: req.params.id } });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete roadmap." });
  }
};

module.exports = { generateAndSaveRoadmap, getAllRoadmaps, getRoadmapById, deleteRoadmap };
