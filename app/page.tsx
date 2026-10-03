import Hero from "../components/Hero";
import About from "../components/About";
import Expertise from "../components/Expertise";
import Experience from "../components/Experience";
import Work from "../components/Work";
import Contact from "../components/Contact";
import Marquee from "../components/Marquee";

const disciplines = [
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

      {/* two crossed tapes between the hero and the story */}
      <div className="relative z-[2] py-10 sm:py-16" aria-hidden="true">
        <div className="-mx-[4vw] rotate-[2.2deg] border-y border-line-strong bg-bg py-2.5 sm:py-3.5">
          <Marquee
            items={disciplines}
            speed={55}
            reverse
            className="display text-4xl text-fg-2 sm:text-6xl"
            separatorClass="text-accent"
          />
        </div>
        <div className="-mx-[4vw] -mt-8 -rotate-[1.6deg] bg-accent py-2.5 sm:-mt-12 sm:py-3.5">
          <Marquee items={disciplines} speed={42} className="display text-4xl text-bg sm:text-6xl" />
        </div>
      </div>

      <About />
      <Expertise />
      <Experience />
      <Work />
      <Contact />
    </>
  );
}
