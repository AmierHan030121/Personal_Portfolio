import { useMemo, useState } from "react";
import { FilterBar } from "../components/FilterBar";
import { ProjectCard } from "../components/ProjectCard";
import { type Project, orderedProjects } from "../content/projects";
import { ALL_FILTER, collectCapabilities, filterProjects } from "../lib/project-filters";

interface ProjectListPageProps {
  kind: Project["kind"];
  eyebrow: string;
  title: string;
  description: string;
}

export function ProjectListPage({ kind, eyebrow, title, description }: ProjectListPageProps) {
  const [selectedCapability, setSelectedCapability] = useState(ALL_FILTER);
  const sourceProjects = orderedProjects.filter((project) => project.kind === kind);
  const options = useMemo(() => collectCapabilities(sourceProjects), [sourceProjects]);
  const visibleProjects = filterProjects(sourceProjects, selectedCapability);

  return (
    <div className="page page-list">
      <section className="page-heading" aria-labelledby="list-title">
        <span className="eyebrow">{eyebrow}</span>
        <h1 id="list-title">{title}</h1>
        <p>{description}</p>
      </section>
      <FilterBar options={options} selected={selectedCapability} onSelect={setSelectedCapability} resultCount={visibleProjects.length} />
      <section className="project-list" aria-label={`${title}项目列表`}>
        {visibleProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
      </section>
    </div>
  );
}
