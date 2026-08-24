import { BriefcaseBusiness, Code2, FolderKanban, GraduationCap, Trophy } from "lucide-react";
import { profile } from "../content/profile";

function renderResumePoint(point: string) {
  const separatorIndex = point.indexOf("：");
  if (separatorIndex <= 0 || separatorIndex > 24) return point;

  return (
    <>
      <strong>{point.slice(0, separatorIndex + 1)}</strong>
      {point.slice(separatorIndex + 1)}
    </>
  );
}

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
      <section className="resume-details__experience" aria-labelledby="experience-title">
        <BriefcaseBusiness aria-hidden="true" />
        <div className="resume-details__track-wrap">
          <h3 id="experience-title">实习经历</h3>
          <div className="resume-details__track">
            {profile.experiences.map((experience) => (
              <article key={`${experience.company}-${experience.period}`}>
                <div className="resume-details__project-head">
                  <h4>{experience.company} · {experience.role}</h4>
                  <span>{experience.period}</span>
                </div>
                {experience.tools?.length ? <small className="resume-details__tools"><strong>技术栈：</strong>{experience.tools.join("、")}</small> : null}
                <ul>{experience.highlights.map((item) => <li key={item}>{renderResumePoint(item)}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="resume-details__projects" aria-labelledby="projects-title">
        <FolderKanban aria-hidden="true" />
        <div className="resume-details__track-wrap">
          <h3 id="projects-title">项目经历</h3>
          <div className="resume-details__track">
            {profile.resumeDetails.projects.map((project) => (
              <article key={project.title}>
                <div className="resume-details__project-head">
                  <h4>{project.title}</h4>
                  <span>{project.period}</span>
                </div>
                {project.tools?.length ? <small className="resume-details__tools"><strong>技术栈：</strong>{project.tools.join("、")}</small> : null}
                <ul>{project.points.map((point) => <li key={point}>{renderResumePoint(point)}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="resume-details__awards">
        <Trophy aria-hidden="true" />
        <p><strong>竞赛奖项</strong> · {profile.awards.join(" · ")}</p>
      </div>
      <div className="resume-details__skills">
        <Code2 aria-label="专业技能" />
        <div>
          {profile.skillGroups.map((group) => <p key={group.label}><strong>{group.label}</strong> · {group.value}</p>)}
        </div>
      </div>
    </section>
  );
}
