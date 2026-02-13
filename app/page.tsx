import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const projects = [
    {
      id: 1, title: "Nikmat Group Website",
      description: "This is the first freelance project that I have worked on seriously, this project was built using Laravel + Vue.js and Twill as a CMS framework, this project was done in a team and I have a role as a frontend developer.",
      link: "https://nikmatgroup.co/"
    },
    {
      id: 2, title: "Me But Better",
      description: "This is a follow-up project after completing the NikmatGroup project, this is a website prepared for clients selling skincare products, in this project the team working on it is smaller with me focusing on the frontend and backend, this project still uses Laravel + Vue.js.",
      link: "https://mebutbetter.co"
    },
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
