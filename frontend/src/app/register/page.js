"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function RegisterPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password) {
            toast.error("Please fill in all fields.");
            return;
        }
        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }
        if (form.password !== form.confirm) {
            toast.error("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            const { data } = await axios.post(`${API}/auth/register`, {
                name: form.name,
                email: form.email,
                password: form.password,
            });
            login({ name: data.data.name, email: data.data.email, token: data.data.token });
            toast.success("Account created! Welcome to Margdarshak AI 🎉");
            router.push("/");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-128px)] flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-900">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-7 text-center">
                        <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <span className="text-white text-xl font-bold" style={{ fontFamily: "Syne, sans-serif" }}>M</span>
                        </div>
                        <h1 className="text-white text-xl font-bold" style={{ fontFamily: "Syne, sans-serif" }}>
                            Create your account
                        </h1>
                        <p className="text-indigo-200 text-sm mt-1">Start building your career roadmap today</p>
                    </div>

                    <div className="px-8 py-7">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                                    required disabled={loading}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                                    required disabled={loading}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    placeholder="Min. 6 characters"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                                    required disabled={loading}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={form.confirm}
                                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                                    placeholder="Re-enter your password"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                                    required disabled={loading}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-md text-sm flex items-center justify-center gap-2 mt-2"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                        </svg>
                                        Creating account…
                                    </>
                                ) : "Create Account"}
                            </button>
                        </form>

                        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
                            Already have an account?{" "}
                            <Link href="/login" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}