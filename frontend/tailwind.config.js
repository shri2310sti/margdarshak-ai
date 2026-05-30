/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#f0f4ff",
                    100: "#e0e9ff",
                    500: "#4F46E5",
                    600: "#4338CA",
                    700: "#3730A3",
                },
                accent: { 500: "#06B6D4", 600: "#0891B2" },
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                display: ["Syne", "sans-serif"],
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-in-out",
                "slide-up": "slideUp 0.4s ease-out",
                "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
            },
            keyframes: {
                fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [],
};