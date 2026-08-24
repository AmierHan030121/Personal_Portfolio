import { describe, expect, it } from "vitest";
import { profile } from "./profile";

describe("resume content", () => {
  it("shows the newest internship first", () => {
    expect(profile.experiences.map((experience) => experience.period)).toEqual([
      "2026.05 — 2026.08",
      "2025.07 — 2025.09",
    ]);
    expect(profile.experience.company).toBe("跨企查｜数据开发部");
  });

  it("shows the newest resume project first with its workflow stack", () => {
    expect(profile.resumeDetails.projects[0].title).toBe("跨境商业新闻智能打标与情报结构化系统（Agent Workflow）");
    expect(profile.resumeDetails.projects[0].period).toBe("2026.07 — 2026.08");
    expect(profile.resumeDetails.projects[0].tools).toContain("Playwright MCP");
  });
});
