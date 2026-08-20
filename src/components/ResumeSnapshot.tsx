import { ArrowUpRight, Award, BriefcaseBusiness, Code2, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "../content/profile";

export function ResumeSnapshot() {
  return (
    <section className="resume-snapshot" aria-labelledby="resume-snapshot-title">
      <div className="resume-snapshot__head">
        <span className="utility-label">Resume snapshot</span>
        <Link className="row-link" to="/about">完整经历 <ArrowUpRight aria-hidden="true" /></Link>
      </div>
      <h2 id="resume-snapshot-title">教育 · 实习 · 技能</h2>
      <div className="resume-snapshot__grid">
        <article>
          <GraduationCap aria-hidden="true" />
          <div>
            <span className="utility-label">Education</span>
            <strong>{profile.education.school}</strong>
            <p>{profile.education.program}</p>
            <small>{profile.education.period} · {profile.education.gpa}</small>
            <small>{profile.education.undergraduate}</small>
          </div>
        </article>
        <article>
          <BriefcaseBusiness aria-hidden="true" />
          <div>
            <span className="utility-label">Experience</span>
            <strong>{profile.experience.company} · {profile.experience.role}</strong>
            <p>{profile.experience.highlights[1]}</p>
            <small>{profile.experience.period}</small>
          </div>
        </article>
      </div>
      <div className="resume-snapshot__signals">
        <article>
          <Code2 aria-hidden="true" />
          <div>
            <span className="utility-label">Toolkit</span>
            <p>{profile.skillGroups.map((group) => group.value).join(" · ")}</p>
          </div>
        </article>
        <article>
          <Award aria-hidden="true" />
          <div>
            <span className="utility-label">Selected awards</span>
            <p>{profile.awards.slice(0, 2).join(" · ")}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
