import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="section-line" />
      <About />
      <div className="section-line" />
      <Experience />
      <div className="section-line" />
      <Projects />
      <div className="section-line" />
      <Contact />
    </>
  );
}
