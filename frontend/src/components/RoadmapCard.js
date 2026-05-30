"use client";

const LEVEL_COLORS = {
    beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};
const LEVEL_ICONS = { beginner: "🌱", intermediate: "🚀", advanced: "⚡" };

export default function RoadmapCard({ roadmap, onView, onDelete }) {
    const formattedDate = new Date(roadmap.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit", month: "short", year: "numeric",
    });
    const formattedTime = new Date(roadmap.createdAt).toLocaleTimeString("en-IN", {
        hour: "2-digit", minute: "2-digit",
    });
    const skillsList = roadmap.currentSkills.split(",").slice(0, 3).map((s) => s.trim());
    const hasMore = roadmap.currentSkills.split(",").length > 3;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 card-hover group transition-colors duration-200">
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base leading-tight truncate" style={{ fontFamily: "Syne, sans-serif" }}>
                        {roadmap.targetRole}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${LEVEL_COLORS[roadmap.experienceLevel] || "bg-slate-100 text-slate-600"}`}>
                            {LEVEL_ICONS[roadmap.experienceLevel]} {roadmap.experienceLevel}
                        </span>
                        {roadmap.totalEstimatedTime && (
                            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                                ⏱ {roadmap.totalEstimatedTime}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {roadmap.summary && (
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3 line-clamp-2">
                    {roadmap.summary}
                </p>
            )}

            <div className="flex flex-wrap gap-1.5 mb-4">
                {skillsList.map((skill, i) => (
                    <span key={i} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-0.5 rounded-full">
                        {skill}
                    </span>
                ))}
                {hasMore && <span className="text-xs text-slate-400 px-2 py-0.5">+more</span>}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
                <span className="text-xs text-slate-400">📅 {formattedDate} · {formattedTime}</span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onDelete(roadmap._id)}
                        className="p-1.5 text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                        title="Delete"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onView(roadmap)}
                        className="px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg transition-all"
                    >
                        View →
                    </button>
                </div>
            </div>
        </div>
    );
}