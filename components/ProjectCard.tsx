import React from "react";

export default function ProjectCard({
    title,
    description,
    link,
}: {
    title: string;
    description: string;
    link?: string;
}) {
    return (
        <article className="relative bg-white/55 dark:bg-[#071026]/48 backdrop-blur-xl border border-white/10 dark:border-white/6 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition overflow-hidden">

            <div className="card-content">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
                <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">{description}</p>

                {link && (
                    <div className="mt-5 flex items-center gap-3">
                        <a className="inline-flex items-center gap-2 text-[rgb(var(--accent))] hover:underline" href={link}>
                            <span className="font-medium">View project</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">Static</span>
                    </div>
                )}
            </div>
        </article>
    );
}
