"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl rounded-3xl backdrop-blur-lg bg-white/40 dark:bg-black/28 border border-white/8 dark:border-white/6 shadow-md">
            <div className="mx-auto px-6 py-3 flex items-center justify-between">
                <Link href="/" className="font-semibold text-lg">Jefer Setiawan</Link>

                <div className="flex items-center gap-4">
                    <nav className="hidden sm:block">
                        <ul className="flex gap-6 text-sm">
                            {/* <li><Link href="/about" className="hover:underline">About</Link></li> */}
                            {/* <li><Link href="/" scroll={false} className="hover:underline">Projects</Link></li> */}
                            {/* <li><Link href="/contact" className="hover:underline">Contact</Link></li> */}
                            <li>jefersetiawan04@gmail.com</li>
                            <li><a href="https://www.linkedin.com/in/jefersetiawan/" target="blank" className="hover:underline">LinkedIn</a></li>
                            <li><a href="https://github.com/Ajeppp" target="blank" className="hover:underline">GitHub</a></li>
                            <li><a href="https://wa.me/6281257643560" target="blank" className="hover:underline">WhatsApp</a></li>
                        </ul>
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        aria-label="Open menu"
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                        className="sm:hidden p-2 rounded-md bg-white/70 dark:bg-black/20 border border-white/8 dark:border-white/6 shadow-sm"
                    >
                        {open ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu panel */}
            {
                open && (
                    <div className="sm:hidden mt-2 px-4 pb-4">
                        <div className="bg-white/80 dark:bg-black/28 border border-white/8 dark:border-white/6 rounded-xl shadow-md p-4">
                            <ul className="flex flex-col gap-3 text-base">
                                <li>jefersetiawan04@gmail.com</li>
                                <li><a href="https://www.linkedin.com/in/jefersetiawan/" target="blank" className="hover:underline">LinkedIn</a></li>
                                <li><a href="https://github.com/Ajeppp" target="blank" className="hover:underline">GitHub</a></li>
                                <li><a href="https://wa.me/6281257643560" target="blank" className="hover:underline">WhatsApp</a></li>
                            </ul>
                        </div>
                    </div>
                )
            }
        </header >
    );
}
