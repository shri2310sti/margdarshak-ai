"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import RoadmapForm from "@/components/RoadmapForm";
import HistoryList from "@/components/HistoryList";
import RoadmapModal from "@/components/RoadmapModal";
import { fetchAllRoadmaps, deleteRoadmap } from "@/lib/api";

// Clicking these chips auto-fills the Target Role input
const QUICK_ROLES = [
    "Full Stack Developer", "Frontend Developer", "Backend Developer",
    "Data Scientist", "DevOps Engineer", "UI/UX Designer",
    "Mobile Developer", "Cloud Engineer",
];

export default function DashboardPage() {
    const [roadmaps, setRoadmaps] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [selectedRoadmap, setSelectedRoadmap] = useState(null);
    const [prefillRole, setPrefillRole] = useState("");

    const loadRoadmaps = useCallback(async () => {
        try {
            setLoadingHistory(true);
            const result = await fetchAllRoadmaps();
            setRoadmaps(result.data || []);
        } catch {
            toast.error("Couldn't load history. Is the backend running?");
        } finally {
            setLoadingHistory(false);
        }
    }, []);

    useEffect(() => { loadRoadmaps(); }, [loadRoadmaps]);

    const handleRoadmapGenerated = (newRoadmap) => {
        setRoadmaps((prev) => [newRoadmap, ...prev]);
        setSelectedRoadmap(newRoadmap);
        setPrefillRole("");
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this roadmap? This cannot be undone.")) return;
        try {
            await deleteRoadmap(id);
            setRoadmaps((prev) => prev.filter((r) => r._id !== id));
            if (selectedRoadmap?._id === id) setSelectedRoadmap(null);
            toast.success("Roadmap deleted.");
        } catch {
            toast.error("Failed to delete roadmap.");
        }
    };

    return (
        <>
            {/* ── Hero Banner ── */}
            <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <p className="text-indigo-200 text-sm font-medium mb-2 tracking-wide uppercase">
                                Welcome to Margdarshak AI
                            </p>
                            <h1
                                className="text-3xl md:text-4xl font-extrabold leading-tight"
                                style={{ fontFamily: "Syne, sans-serif" }}
                            >
                                Plan Your Career,<br />
                                <span className="text-cyan-300">One Step at a Time</span>
                            </h1>
                            <p className="mt-3 text-indigo-200 text-sm md:text-base max-w-lg leading-relaxed">
                                Enter your target role and current skills to get a personalized,
                                step-by-step roadmap — for any career, at any level.
                            </p>
                        </div>

                        {/* Stats cards */}
                        <div className="flex gap-3 flex-wrap md:flex-nowrap">
                            {[
                                { value: roadmaps.length, label: "Roadmaps\nGenerated", icon: "🗺️" },
                                { value: "Any", label: "Career\nSupported", icon: "🎯" },
                                { value: "AI", label: "Powered\nGeneration", icon: "⚡" },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4 text-center min-w-[90px]"
                                >
                                    <div className="text-xl mb-1">{s.icon}</div>
                                    <div className="text-2xl font-extrabold text-white leading-none">
                                        {s.value}
                                    </div>
                                    <div className="text-indigo-200 text-xs mt-1 whitespace-pre-line leading-tight">
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick-pick role chips */}
                    <div className="mt-8">
                        <p className="text-indigo-300 text-xs font-medium mb-2.5 uppercase tracking-wide">
                            Quick pick a role →
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {QUICK_ROLES.map((role) => (
                                <button
                                    key={role}
                                    onClick={() => setPrefillRole(role)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 cursor-pointer ${prefillRole === role
                                            ? "bg-white text-indigo-700 border-white"
                                            : "bg-white/10 text-white border-white/25 hover:bg-white/20"
                                        }`}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Dashboard Body ── */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* LEFT — Form */}
                    <div>
                        <RoadmapForm
                            onRoadmapGenerated={handleRoadmapGenerated}
                            prefillRole={prefillRole}
                        />
                    </div>

                    {/* RIGHT — History */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2
                                    className="text-lg font-bold text-slate-800"
                                    style={{ fontFamily: "Syne, sans-serif" }}
                                >
                                    Recent Roadmaps
                                </h2>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    {roadmaps.length} roadmap{roadmaps.length !== 1 ? "s" : ""} saved
                                </p>
                            </div>
                            {roadmaps.length > 4 && (
                                <Link
                                    href="/history"
                                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                                >
                                    View All →
                                </Link>
                            )}
                        </div>

                        <HistoryList
                            roadmaps={roadmaps.slice(0, 4)}
                            loading={loadingHistory}
                            onView={setSelectedRoadmap}
                            onDelete={handleDelete}
                        />

                        {roadmaps.length > 4 && (
                            <div className="mt-4 text-center">
                                <Link
                                    href="/history"
                                    className="inline-block px-6 py-2.5 rounded-xl text-sm font-semibold text-indigo-600 border border-indigo-200 hover:bg-indigo-50 transition-all"
                                >
                                    View all {roadmaps.length} roadmaps →
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {selectedRoadmap && (
                <RoadmapModal roadmap={selectedRoadmap} onClose={() => setSelectedRoadmap(null)} />
            )}
        </>
    );
}