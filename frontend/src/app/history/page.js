"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import RoadmapCard from "@/components/RoadmapCard";
import RoadmapModal from "@/components/RoadmapModal";
import { fetchAllRoadmaps, deleteRoadmap } from "@/lib/api";

const FILTER_OPTIONS = [
    { value: "All", label: "All" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
];

export default function HistoryPage() {
    const [roadmaps, setRoadmaps] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRoadmap, setSelectedRoadmap] = useState(null);
    const [activeFilter, setActiveFilter] = useState("All");
    const [search, setSearch] = useState("");

    const load = useCallback(async () => {
        try {
            setLoading(true);
            const result = await fetchAllRoadmaps();
            setRoadmaps(result.data || []);
            setFiltered(result.data || []);
        } catch {
            toast.error("Failed to load roadmaps.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    useEffect(() => {
        let result = [...roadmaps];
        if (activeFilter !== "All") {
            result = result.filter((r) => r.experienceLevel === activeFilter);
        }
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (r) =>
                    r.targetRole.toLowerCase().includes(q) ||
                    r.currentSkills.toLowerCase().includes(q)
            );
        }
        setFiltered(result);
    }, [roadmaps, activeFilter, search]);

    const handleDelete = async (id) => {
        if (!confirm("Delete this roadmap permanently?")) return;
        try {
            await deleteRoadmap(id);
            setRoadmaps((prev) => prev.filter((r) => r._id !== id));
            if (selectedRoadmap?._id === id) setSelectedRoadmap(null);
            toast.success("Roadmap deleted.");
        } catch {
            toast.error("Failed to delete.");
        }
    };

    return (
        <>
            {/* Page Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1
                                className="text-2xl font-extrabold text-slate-900"
                                style={{ fontFamily: "Syne, sans-serif" }}
                            >
                                Roadmap History
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">
                                {roadmaps.length} roadmap{roadmaps.length !== 1 ? "s" : ""} generated in total
                            </p>
                        </div>
                        <Link
                            href="/"
                            className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-xl hover:shadow-md transition-all"
                        >
                            + New Roadmap
                        </Link>
                    </div>

                    {/* Filters */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by role or skill..."
                                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {FILTER_OPTIONS.map(({ value, label }) => (
                                <button
                                    key={value}
                                    onClick={() => setActiveFilter(value)}
                                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeFilter === value
                                            ? "bg-indigo-600 text-white shadow-sm"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse">
                                <div className="h-4 bg-slate-100 rounded-full w-2/3 mb-3" />
                                <div className="h-3 bg-slate-100 rounded-full w-1/3 mb-4" />
                                <div className="h-3 bg-slate-100 rounded-full w-full" />
                            </div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-24">
                        <div className="text-5xl mb-4">{roadmaps.length === 0 ? "🗺️" : "🔍"}</div>
                        <p className="text-slate-700 font-semibold">
                            {roadmaps.length === 0 ? "No roadmaps yet" : "No results found"}
                        </p>
                        <p className="text-slate-400 text-sm mt-2">
                            {roadmaps.length === 0
                                ? "Generate your first roadmap from the dashboard."
                                : "Try a different search or clear the filters."}
                        </p>
                        {roadmaps.length === 0 && (
                            <Link
                                href="/"
                                className="mt-5 inline-block px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-500"
                            >
                                Go to Dashboard →
                            </Link>
                        )}
                    </div>
                ) : (
                    <>
                        <p className="text-sm text-slate-500 mb-5">
                            Showing <span className="font-semibold text-slate-700">{filtered.length}</span> of {roadmaps.length} roadmaps
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filtered.map((roadmap) => (
                                <div key={roadmap._id} className="animate-fade-in">
                                    <RoadmapCard
                                        roadmap={roadmap}
                                        onView={setSelectedRoadmap}
                                        onDelete={handleDelete}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {selectedRoadmap && (
                <RoadmapModal roadmap={selectedRoadmap} onClose={() => setSelectedRoadmap(null)} />
            )}
        </>
    );
}