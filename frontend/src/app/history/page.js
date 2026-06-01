"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import RoadmapCard from "@/components/RoadmapCard";
import RoadmapModal from "@/components/RoadmapModal";
import { fetchAllRoadmaps, deleteRoadmap } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

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
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const load = useCallback(async () => {
    if (!user) return;
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
  }, [user]);

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

  // Show nothing while checking auth
  if (authLoading) return null;
  if (!user) return null;

  return (
    <>
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1
                className="text-2xl font-extrabold text-slate-900 dark:text-white"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Roadmap History
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                {roadmaps.length} roadmap{roadmaps.length !== 1 ? "s" : ""} saved to your account
              </p>
            </div>
            <Link
              href="/"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-xl hover:shadow-md transition-all"
            >
              + New Roadmap
            </Link>
          </div>

          {/* Login notice banner */}
          <div className="mt-5 flex items-center gap-2.5 p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
            <span className="text-indigo-500 text-lg flex-shrink-0">🔐</span>
            <p className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
              This history is private to your account — only roadmaps you generate while signed in as{" "}
              <span className="font-bold">{user.email}</span> are saved here.
            </p>
          </div>

          {/* Filters */}
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by role or skill..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {FILTER_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setActiveFilter(value)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeFilter === value
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
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
              <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 animate-pulse">
                <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded-full w-2/3 mb-3" />
                <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full w-1/3 mb-4" />
                <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full w-full" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">{roadmaps.length === 0 ? "🗺️" : "🔍"}</div>
            <p className="text-slate-700 dark:text-slate-200 font-semibold">
              {roadmaps.length === 0 ? "No roadmaps saved yet" : "No results found"}
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">
              {roadmaps.length === 0
                ? "Generate a roadmap from the dashboard — it will be saved here automatically."
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
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
              Showing{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">{filtered.length}</span>{" "}
              of {roadmaps.length} roadmaps
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
