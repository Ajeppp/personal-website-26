import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const projects = [
    { id: 1, title: "Project One", description: "Short project description", link: "#" },
    { id: 2, title: "Project Two", description: "Short project description", link: "#" },
  ];

  return (
    <div>
      <Hero />

      <section id="projects" className="mt-12">
        <h2 className="text-2xl font-bold">Projects</h2>
        <div className="mt-4 grid gap-6 grid-cols-1 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} title={p.title} description={p.description} link={p.link} />
          ))}
        </div>
      </section>
    </div>
  );
}
