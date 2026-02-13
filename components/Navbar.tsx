import Link from "next/link";
import React from "react";

export default function Navbar() {
    return (
        <header className="w-full border-b bg-white/60 dark:bg-black/60 backdrop-blur sticky top-0 z-40">
            <div className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between">
                <Link href="/" className="font-semibold">Your Name</Link>
                <nav>
                    <ul className="flex gap-4">
                        <li>
                            <Link href="/about" className="hover:underline">About</Link>
                        </li>
                        <li>
                            <Link href="/" scroll={false} className="hover:underline">Projects</Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:underline">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
