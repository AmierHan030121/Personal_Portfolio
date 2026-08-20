import { ArrowUpRight, Cookie, Shuffle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../content/projects";

interface ProjectFortuneProps {
  projects: Project[];
}

export function ProjectFortune({ projects }: ProjectFortuneProps) {
  const [index, setIndex] = useState(0);
  const project = projects[index % projects.length];

  return (
    <section className="project-fortune" aria-labelledby="fortune-title">
      <div className="project-fortune__topline">
        <span className="utility-label">Project fortune</span>
        <Cookie aria-hidden="true" />
      </div>
      <h2 id="fortune-title">不知道从哪项作品开始？</h2>
      <p className="project-fortune__hint">抽取一个入口，直接查看问题、方法和原始文件。</p>
      <div className="project-fortune__result" aria-live="polite">
        <span>{project.kind === "dashboard" ? "Dashboard" : "Research"} / {project.filterLabel}</span>
        <strong>{project.shortTitle}</strong>
        <p>{project.question}</p>
      </div>
      <div className="project-fortune__actions">
        <button type="button" onClick={() => setIndex((value) => (value + 1) % projects.length)}>
          <Shuffle aria-hidden="true" /> 抽取项目
        </button>
        <Link to={`/project/${project.slug}`} aria-label={`打开${project.shortTitle}`}>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
