"use client";

import Link from "next/link";
import RoadmapCard from "./RoadmapCard";

export default function HistoryList({ roadmaps, loading, onView, onDelete }) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 animate-pulse">
            <div className="flex gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700" />
              <div className="flex-1">
                <div className="h-3.5 bg-slate-100 dark:bg-slate-700 rounded-full w-1/2 mb-2" />
                <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full w-1/3" />
              </div>
            </div>
            <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full w-full mb-2" />
            <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (!roadmaps.length) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 py-14 px-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-2xl mx-auto mb-4">
          🗺️
        </div>
        <p className="text-slate-700 dark:text-slate-200 font-semibold text-sm">
          No roadmaps yet
        </p>
        <p className="text-slate-400 dark:text-slate-500 text-xs mt-1.5 leading-relaxed max-w-xs mx-auto">
          Generate your first roadmap using the form and it will appear here!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {roadmaps.map((roadmap) => (
        <div key={roadmap._id} className="animate-slide-up">
          <RoadmapCard roadmap={roadmap} onView={onView} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
