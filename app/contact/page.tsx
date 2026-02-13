"use client";
import React, { useState } from "react";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0A%0A${message}`);
        window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
    };

    return (
        <section id="contact">
            <h1>Contact</h1>
            <form onSubmit={onSubmit} className="mt-4 flex max-w-xl flex-col gap-3">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="rounded border px-3 py-2" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="rounded border px-3 py-2" />
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" className="rounded border px-3 py-2 h-32" />
                <button type="submit" className="w-max rounded bg-black px-4 py-2 text-white">Send</button>
            </form>
        </section>
    );
}
