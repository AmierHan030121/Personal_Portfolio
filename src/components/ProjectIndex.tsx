import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "../content/projects";

interface ProjectIndexProps {
  projects: Project[];
  visibleCount?: number;
}

export function ProjectIndex({ projects, visibleCount = 4 }: ProjectIndexProps) {
  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <div className="project-index">
      <div className="project-index__head">
        <span className="utility-label">Project index</span>
        <strong>{projects.length} 项真实作品</strong>
      </div>
      {visibleProjects.map((project, index) => (
        <Link key={project.slug} to={`/project/${project.slug}`}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <b>{project.shortTitle}</b>
          <i>{project.kind === "dashboard" ? "Dashboard" : "Research"}</i>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}
