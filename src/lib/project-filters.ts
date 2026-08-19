import type { Project } from "../content/projects";

export const ALL_FILTER = "全部";

export function collectCapabilities(projects: Project[]) {
  return [ALL_FILTER, ...new Set(projects.flatMap((project) => project.capabilities))];
}

export function filterProjects(projects: Project[], capability: string) {
  if (capability === ALL_FILTER) return projects;
  return projects.filter((project) => project.capabilities.includes(capability));
}
