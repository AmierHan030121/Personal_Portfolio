import {
  BarChart3,
  Braces,
  Calculator,
  ChartNoAxesCombined,
  Database,
  FileSpreadsheet,
  GitBranch,
  Layers3,
  Sigma,
} from "lucide-react";

const skills = [
  { label: "SQL", icon: Database, color: "#2e6bff" },
  { label: "Python", icon: Braces, color: "#0f8f83" },
  { label: "Pandas", icon: Layers3, color: "#8c5de8" },
  { label: "Tableau", icon: BarChart3, color: "#e07a21" },
  { label: "Power BI", icon: ChartNoAxesCombined, color: "#d4a017" },
  { label: "Excel", icon: FileSpreadsheet, color: "#16834b" },
  { label: "统计建模", icon: Sigma, color: "#d95470" },
  { label: "机器学习", icon: Calculator, color: "#3f7dba" },
  { label: "DataWorks", icon: GitBranch, color: "#7d5ac7" },
] as const;

function SkillItem({ skill }: { skill: (typeof skills)[number] }) {
  const Icon = skill.icon;
  return (
    <span className="skill-marquee__item">
      <span className="skill-marquee__icon" style={{ color: skill.color }}><Icon aria-hidden="true" /></span>
      <span>{skill.label}</span>
    </span>
  );
}

export function SkillMarquee() {
  return (
    <section className="skill-marquee" aria-label="个人技能">
      <div className="skill-marquee__viewport">
        <div className="skill-marquee__track">
          <div className="skill-marquee__group">
            {skills.map((skill) => <SkillItem key={skill.label} skill={skill} />)}
          </div>
          <div className="skill-marquee__group" aria-hidden="true">
            {skills.map((skill) => <SkillItem key={`duplicate-${skill.label}`} skill={skill} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
