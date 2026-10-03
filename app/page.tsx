import Hero from "../components/Hero";
import About from "../components/About";
import Expertise from "../components/Expertise";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Marquee from "../components/Marquee";

const marqueeItems = [
  "Fullstack Development",
  "System Design",
  "Web Applications",
  "API Engineering",
  "Payment Systems",
  "UI Animation",
];

export default function Home() {
  return (
    <>
      <Hero />

      <div className="border-y border-border bg-bg/40 py-6 sm:py-8 backdrop-blur-sm">
        <Marquee
          items={marqueeItems}
          speed={45}
          className="font-serif font-light text-3xl sm:text-5xl italic text-text-primary"
        />
      </div>

      <About />
      <Expertise />
      <Experience />
      <Projects />

      <div className="border-y border-border bg-bg/40 py-6 sm:py-8 backdrop-blur-sm">
        <Marquee
          items={["Open to opportunities", "Let's build something", "Available for freelance"]}
          speed={40}
          reverse
          className="font-serif font-light text-3xl sm:text-5xl italic text-text-primary"
          separator="→"
        />
      </div>

      <Contact />
    </>
  );
}
