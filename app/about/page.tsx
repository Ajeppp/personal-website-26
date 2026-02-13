import React from "react";

export default function About() {
    return (
        <section id="about" className="prose dark:prose-invert">
            <h1>About Me</h1>
            <p>
                Hello — I'm <strong>Your Name</strong>, a developer who builds web
                applications. Update this page with your bio, skills, and experience.
            </p>
            <h2>Skills</h2>
            <ul>
                <li>JavaScript / TypeScript</li>
                <li>React / Next.js</li>
                <li>Tailwind CSS</li>
            </ul>
        </section>
    );
}
