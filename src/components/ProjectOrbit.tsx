import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../content/projects";
import { MediaFrame } from "./MediaFrame";

interface ProjectOrbitProps {
  projects: Project[];
}

export function ProjectOrbit({ projects }: ProjectOrbitProps) {
  return (
    <section className="project-orbit" aria-label="环绕展示的精选作品">
      <div className="project-orbit__core">
        <span>Selected</span>
        <strong>{projects.length} works</strong>
        <small>作品环绕展示</small>
      </div>
      {projects.map((project, index) => (
        <Link
          className={`project-orbit__card project-orbit__card--${index + 1}`}
          to={`/project/${project.slug}`}
          style={{ "--orbit-delay": `${index * -3.6}s` } as CSSProperties}
          key={project.slug}
        >
          <MediaFrame media={project.media[0]} />
          <span>
            <strong>{project.shortTitle}</strong>
            <ArrowUpRight aria-hidden="true" />
          </span>
        </Link>
      ))}
    </section>
  );
}
