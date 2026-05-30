import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

export const metadata = {
    title: "Margdarshak AI — Career Roadmap Generator",
    description: "Generate personalized career roadmaps for any profession.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans flex flex-col transition-colors duration-200">
                <ThemeProvider>
                    <AuthProvider>
                        <Navbar />
                        <main className="flex-1">{children}</main>
                        <Footer />
                        <Toaster
                            position="top-right"
                            toastOptions={{
                                duration: 3500,
                                style: {
                                    background: "#1e293b",
                                    color: "#f8fafc",
                                    borderRadius: "10px",
                                    fontSize: "14px",
                                    fontFamily: "Inter, sans-serif",
                                },
                                success: { iconTheme: { primary: "#06B6D4", secondary: "#fff" } },
                                error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
                            }}
                        />
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}