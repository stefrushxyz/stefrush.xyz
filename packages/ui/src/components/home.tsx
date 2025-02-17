import { githubUrl, name, projects, title } from "../data";
import { ProjectCard } from "./project-card";

export function Home() {
  return (
    <main className="font-mono">
      <section id="hero" className="flex h-screen flex-col items-center justify-center gap-6">
        <h1 className="font-bold text-6xl max-sm:text-4xl">{name}</h1>
        <p className="text-4xl max-sm:text-2xl">{title}</p>
        <p className="text-2xl max-sm:text-xl">
          <a href="#projects" className="underline">
            Projects
          </a>
          <span> • </span>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="underline">
            GitHub
          </a>
        </p>
      </section>

      <section id="projects" className="min-h-screen px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-bold text-4xl max-sm:text-2xl">Projects</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
