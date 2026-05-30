const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
    order: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    resources: [{ type: String }],
    estimatedTime: { type: String },
});

const roadmapSchema = new mongoose.Schema(
    {
        targetRole: {
            type: String,
            required: [true, "Target role is required"],
            trim: true,
        },
        currentSkills: {
            type: String,
            required: [true, "Current skills are required"],
            trim: true,
        },
        experienceLevel: {
            type: String,
            required: [true, "Experience level is required"],
            enum: ["beginner", "intermediate", "advanced"],
            default: "beginner",
        },
        steps: [stepSchema],
        summary: { type: String },
        totalEstimatedTime: { type: String },
    },
    {
        timestamps: true, // adds createdAt and updatedAt automatically
    }
);

module.exports = mongoose.model("Roadmap", roadmapSchema);