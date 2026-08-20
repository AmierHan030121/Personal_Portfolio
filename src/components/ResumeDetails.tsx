import { BriefcaseBusiness, GraduationCap, Trophy } from "lucide-react";
import { profile } from "../content/profile";

export function ResumeDetails() {
  return (
    <section className="resume-details" aria-labelledby="resume-details-title">
      <header className="resume-details__header">
        <span className="utility-label">简历详情</span>
        <h2 id="resume-details-title">教育、实习与项目经历</h2>
      </header>
      <div className="resume-details__education">
        <GraduationCap aria-hidden="true" />
        <div>
          <h3>教育经历</h3>
          <p><strong>{profile.education.school}</strong> · {profile.education.program} · {profile.education.period}</p>
          <p><strong>{profile.education.school}</strong> · {profile.education.undergraduate} · 2021.09 — 2025.06</p>
          <small>主修课程：{profile.resumeDetails.coursework.join("、")}</small>
        </div>
      </div>
      <div className="resume-details__experience">
        <BriefcaseBusiness aria-hidden="true" />
        <div>
          <h3>{profile.experience.company} · {profile.experience.role}</h3>
          <span className="resume-details__period">{profile.experience.period}</span>
          <ul>{profile.experience.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
      <div className="resume-details__projects">
        {profile.resumeDetails.projects.map((project) => (
          <article key={project.title}>
            <div className="resume-details__project-head">
              <h3>{project.title}</h3>
              <span>{project.period}</span>
            </div>
            <ul>{project.points.map((point) => <li key={point}>{point}</li>)}</ul>
          </article>
        ))}
      </div>
      <div className="resume-details__awards">
        <Trophy aria-hidden="true" />
        <p><strong>竞赛奖项</strong> · {profile.awards.join(" · ")}</p>
      </div>
      <div className="resume-details__skills">
        <h3>专业技能</h3>
        <div>
          {profile.skillGroups.map((group) => <p key={group.label}><strong>{group.label}</strong> · {group.value}</p>)}
        </div>
      </div>
    </section>
  );
}
