"use client";

import RoadmapCard from "./RoadmapCard";

export default function HistoryList({ roadmaps, loading, onView, onDelete }) {
    if (loading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse">
                        <div className="h-4 bg-slate-100 rounded-full w-2/3 mb-2" />
                        <div className="h-3 bg-slate-100 rounded-full w-1/3 mb-4" />
                        <div className="h-3 bg-slate-100 rounded-full w-full" />
                    </div>
                ))}
            </div>
        );
    }

    if (!roadmaps.length) {
        return (
            <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-200">
                <div className="text-4xl mb-3">🗺️</div>
                <p className="text-slate-600 font-medium text-sm">No roadmaps yet</p>
                <p className="text-slate-400 text-xs mt-1">
                    Generate your first roadmap using the form!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {roadmaps.map((roadmap) => (
                <div key={roadmap._id} className="animate-slide-up">
                    <RoadmapCard
                        roadmap={roadmap}
                        onView={onView}
                        onDelete={onDelete}
                    />
                </div>
            ))}
        </div>
    );
}