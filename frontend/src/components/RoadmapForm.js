"use client";

import { useState, useEffect } from "react";
import { generateRoadmap } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Beginner", desc: "Just starting out", icon: "🌱" },
  { value: "intermediate", label: "Intermediate", desc: "Some experience", icon: "🚀" },
  { value: "advanced", label: "Advanced", desc: "Deep expertise", icon: "⚡" },
];

export default function RoadmapForm({ onRoadmapGenerated, prefillRole = "" }) {
  const [form, setForm] = useState({
    targetRole: "",
    currentSkills: "",
    experienceLevel: "beginner",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (prefillRole) {
      setForm((prev) => ({ ...prev, targetRole: prefillRole }));
    }
  }, [prefillRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.targetRole.trim() || !form.currentSkills.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const result = await generateRoadmap(form);

      if (!user) {
        // Guest — show roadmap but don't save to history
        onRoadmapGenerated(result.data, false);
        toast("Sign in to save your roadmap to history!", {
          icon: "🔒",
          duration: 5000,
          style: {
            background: "#1e293b",
            color: "#f8fafc",
          },
        });
      } else {
        // Logged in — show and save
        onRoadmapGenerated(result.data, true);
        toast.success("Roadmap generated! 🎉");
      }

      setForm({ targetRole: "", currentSkills: "", experienceLevel: "beginner" });
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to generate. Is the backend running?";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
        <h2
          className="text-white font-bold text-lg"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Generate Your Roadmap
        </h2>
        <p className="text-indigo-200 text-xs mt-0.5">
          {user
            ? "Fill in the details below and get your personalized career path"
            : "Generate a roadmap — sign in to save it to your history"}
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Target Role */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
              Target Role <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="targetRole"
              value={form.targetRole}
              onChange={handleChange}
              placeholder="e.g. Full Stack Developer, Chef, Data Scientist…"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
              disabled={loading}
              required
            />
          </div>

          {/* Current Skills */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
              Current Skills <span className="text-red-500">*</span>
            </label>
            <textarea
              name="currentSkills"
              value={form.currentSkills}
              onChange={handleChange}
              placeholder="e.g. HTML, CSS, basic JavaScript (comma-separated)"
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm resize-none"
              disabled={loading}
              required
            />
            <p className="text-xs text-slate-400 mt-1">
              Separate skills with commas. Type "none" if starting fresh.
            </p>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Experience Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {EXPERIENCE_LEVELS.map((lvl) => (
                <button
                  key={lvl.value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, experienceLevel: lvl.value }))}
                  disabled={loading}
                  className={`p-3 rounded-xl border-2 text-left transition-all duration-150 ${
                    form.experienceLevel === lvl.value
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                      : "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:border-indigo-200 dark:hover:border-indigo-500"
                  }`}
                >
                  <div className="text-base mb-0.5">{lvl.icon}</div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-100">{lvl.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{lvl.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Guest notice */}
          {!user && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700">
              <span className="text-amber-500 flex-shrink-0 mt-0.5">🔒</span>
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                You can generate a roadmap without signing in, but it won't be saved.{" "}
                <a href="/login" className="font-semibold underline hover:no-underline">
                  Sign in
                </a>{" "}
                to save your history.
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Generating your roadmap…
              </>
            ) : (
              "✨ Generate My Roadmap"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
