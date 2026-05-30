export default function Footer() {
    return (
        <footer className="mt-16 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-colors duration-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">M</span>
                    </div>
                    <span className="text-slate-600 dark:text-slate-300 text-sm font-semibold">Margdarshak AI</span>
                </div>
                <p className="text-slate-400 text-xs text-center">
                    AI-powered career roadmaps for every profession · Next.js · Node.js · MongoDB
                </p>
                <p className="text-slate-400 text-xs">© {new Date().getFullYear()} Margdarshak AI</p>
            </div>
        </footer>
    );
}