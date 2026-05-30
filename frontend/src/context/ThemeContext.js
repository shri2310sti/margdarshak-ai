"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("margdarshak_theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const isDark = stored ? stored === "dark" : prefersDark;
        setDark(isDark);
        document.documentElement.classList.toggle("dark", isDark);
    }, []);

    const toggle = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("margdarshak_theme", next ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{ dark, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
    return ctx;
}