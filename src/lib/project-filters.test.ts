import { projects } from "../content/projects";
import { ALL_FILTER, collectCapabilities, filterProjects } from "./project-filters";

describe("project content", () => {
  it("keeps the six confirmed projects with unique slugs and order values", () => {
    expect(projects).toHaveLength(6);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(6);
    expect(new Set(projects.map((project) => project.order)).size).toBe(6);
  });

  it("keeps the confirmed dashboard and research split", () => {
    expect(projects.filter((project) => project.kind === "dashboard")).toHaveLength(4);
    expect(projects.filter((project) => project.kind === "research")).toHaveLength(2);
  });

  it("filters by capability and preserves the all option", () => {
    const capabilities = collectCapabilities(projects);
    expect(capabilities[0]).toBe(ALL_FILTER);
    expect(filterProjects(projects, "增长分析").map((project) => project.slug)).toEqual([
      "ai-ecommerce-growth",
      "bilibili-creator-monitoring",
    ]);
    expect(filterProjects(projects, ALL_FILTER)).toEqual(projects);
  });
});
