import { projects } from "../content/projects";
import { ALL_FILTER, collectCapabilities, filterProjects } from "./project-filters";

describe("project content", () => {
  it("keeps the seven confirmed projects with unique slugs and order values", () => {
    expect(projects).toHaveLength(7);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(7);
    expect(new Set(projects.map((project) => project.order)).size).toBe(7);
  });

  it("keeps the confirmed dashboard and research split", () => {
    expect(projects.filter((project) => project.kind === "dashboard")).toHaveLength(4);
    expect(projects.filter((project) => project.kind === "research")).toHaveLength(3);
  });

  it("filters by capability and preserves the all option", () => {
    const capabilities = collectCapabilities(projects);
    expect(capabilities[0]).toBe(ALL_FILTER);
    expect(filterProjects(projects, "电商增长").map((project) => project.slug)).toEqual([
      "ai-ecommerce-growth",
    ]);
    expect(capabilities).toContain("算电协同");
    expect(filterProjects(projects, ALL_FILTER)).toEqual(projects);
  });
});
