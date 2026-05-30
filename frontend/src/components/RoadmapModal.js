"use client";
import { useEffect } from "react";

const LEVEL_COLORS = {
    beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function RoadmapModal({ roadmap, onClose }) {
    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [onClose]);

    if (!roadmap) return null;

    const formattedDate = new Date(roadmap.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up" onClick={(e) => e.stopPropagation()}>
                {/* Sticky header */}
                <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 px-6 py-4 flex items-start justify-between rounded-t-2xl z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: "Syne, sans-serif" }}>
                            {roadmap.targetRole}
                        </h2>
                        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${LEVEL_COLORS[roadmap.experienceLevel] || "bg-slate-100 text-slate-600"}`}>
                                {roadmap.experienceLevel}
                            </span>
                            <span className="text-xs text-slate-400">Generated: {formattedDate}</span>
                            {roadmap.totalEstimatedTime && (
                                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-1 rounded-full">
                                    ⏱ {roadmap.totalEstimatedTime}
                                </span>
                            )}
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 ml-4 flex-shrink-0 transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="px-6 py-5">
                    {roadmap.summary && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-900/20 dark:to-cyan-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{roadmap.summary}</p>
                        </div>
                    )}

                    <div className="mb-6">
                        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                            Current Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {roadmap.currentSkills.split(",").map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium">
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                            Your Learning Path — {roadmap.steps?.length || 0} Steps
                        </h3>
                        <div className="space-y-0">
                            {roadmap.steps?.map((step, index) => (
                                <div key={index} className="relative flex gap-4">
                                    {index < roadmap.steps.length - 1 && (
                                        <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gradient-to-b from-indigo-300 to-cyan-300 opacity-40" />
                                    )}
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white text-sm font-bold shadow-md z-10 mt-0.5">
                                        {step.order}
                                    </div>
                                    <div className="flex-1 pb-6">
                                        <div className="flex items-start justify-between gap-2">
                                            <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{step.title}</h4>
                                            {step.estimatedTime && (
                                                <span className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">{step.estimatedTime}</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{step.description}</p>
                                        {step.resources?.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-1.5">
                                                {step.resources.map((res, ri) => (
                                                    <span key={ri} className="text-xs bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 px-2.5 py-1 rounded-full border border-cyan-100 dark:border-cyan-800">
                                                        📎 {res}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}