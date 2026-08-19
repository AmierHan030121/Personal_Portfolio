import { ArrowRight, Expand } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../content/projects";
import { MediaDialog } from "./MediaDialog";
import { MediaFrame } from "./MediaFrame";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const media = project.media[0];

  return (
    <article className="project-card">
      <div className="project-card__visual">
        <MediaFrame media={media} />
        <button className="preview-button" type="button" onClick={() => setPreviewOpen(true)}>
          <Expand aria-hidden="true" />
          预览
        </button>
      </div>
      <div className="project-card__body">
        <div className="project-card__meta">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.kind === "dashboard" ? "Dashboard" : "Research"}</span>
        </div>
        <h2><Link to={`/project/${project.slug}`}>{project.title}</Link></h2>
        <p>{project.summary}</p>
        <ul className="tag-list" aria-label="项目能力标签">
          {project.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
        </ul>
        <Link className="row-link" to={`/project/${project.slug}`}>
          打开项目 <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <MediaDialog media={previewOpen ? media : null} title={project.title} onClose={() => setPreviewOpen(false)} />
    </article>
  );
}
