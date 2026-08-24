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

  it("keeps the complete resume wording for older entries", () => {
    const internship = profile.experiences.find((experience) => experience.company === "易成教育");
    const regional = profile.resumeDetails.projects.find((project) => project.title.includes("省域研发投入"));
    const logistics = profile.resumeDetails.projects.find((project) => project.title.includes("国际物流"));
    const video = profile.resumeDetails.projects.find((project) => project.title.includes("自动化账号"));

    expect(internship?.highlights).toHaveLength(4);
    expect(internship?.highlights[1]).toContain("REGEXEXTRA、SUMIF");
    expect(regional?.points).toHaveLength(5);
    expect(regional?.points[3]).toContain("ElasticNet");
    expect(logistics?.points).toHaveLength(5);
    expect(logistics?.tools).toEqual(["阿里云 RDS", "DataWorks", "MaxCompute", "FineBI"]);
    expect(video?.points).toHaveLength(6);
    expect(video?.points[5]).toContain("提升 50% 数据解读与决策的效率");
  });
});
