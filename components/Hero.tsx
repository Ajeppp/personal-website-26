import React from "react";

export default function Hero() {
    return (
        <section className="pt-12">
            <h1 className="text-4xl font-extrabold">Hi, I'm Your Name.</h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
                I build web applications and experiences. This starter site uses Next.js and
                Tailwind CSS — customize it to showcase your work.
            </p>
            <div className="mt-6 flex gap-3">
                <a href="/resume.pdf" className="rounded bg-black px-4 py-2 text-white">Resume</a>
                <a href="/contact" className="rounded border px-4 py-2">Contact</a>
            </div>
        </section>
    );
}
