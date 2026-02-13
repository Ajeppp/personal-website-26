import React from "react";

export default function Footer() {
    return (
        <footer className="w-full border-t py-8">
            <div className="mx-auto max-w-3xl px-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
                © {new Date().getFullYear()} Your Name. Built with Next.js
            </div>
        </footer>
    );
}
