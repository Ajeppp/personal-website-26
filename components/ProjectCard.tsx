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
        <article className="border rounded-lg p-4 hover:shadow-sm">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
            {link && (
                <div className="mt-4">
                    <a className="text-sky-600 hover:underline" href={link}>
                        View project →
                    </a>
                </div>
            )}
        </article>
    );
}
