import React from "react";

export default function Hero() {
    return (
        <section className="pt-12">
            <div className="container">
                <div className="flex flex-col md:flex-row items-center gap-8 py-12">
                    <div className="flex-1">
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r from-indigo-500 to-cyan-400 text-white mb-4">Product · UI · Frontend</div>

                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">I design and build delightful web apps.</h1>

                        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl">
                            I turn ideas into accessible interfaces focused on performance, clarity, and
                            polished interactions. I ship thoughtful UI with an emphasis on usability.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <a href="/#projects" className="btn-primary">View Projects</a>
                            <a href="/contact" className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm">Contact</a>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2 text-sm text-zinc-500">
                            <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded">React</span>
                            <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded">Next.js</span>
                            <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded">Tailwind</span>
                        </div>
                    </div>

                    <div className="w-full md:w-96">
                        <div className="h-56 rounded-xl flex items-center justify-center border border-zinc-100 dark:border-zinc-700 bg-linear-to-br from-white to-indigo-50 dark:from-transparent dark:to-transparent">
                            <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 h-32">
                                <defs>
                                    <linearGradient id="bg" x1="0" x2="1">
                                        <stop offset="0" stopColor="#7C3AED" stopOpacity="0.18" />
                                        <stop offset="1" stopColor="#06B6D4" stopOpacity="0.12" />
                                    </linearGradient>
                                </defs>
                                <rect x="8" y="8" width="144" height="104" rx="16" fill="url(#bg)" />
                                <g opacity="0.9">
                                    <circle cx="44" cy="44" r="18" fill="#fff" opacity="0.18" />
                                    <rect x="70" y="30" width="60" height="10" rx="3" fill="#fff" opacity="0.12" />
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
