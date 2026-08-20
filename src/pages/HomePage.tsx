import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AnalysisRoute } from "../components/AnalysisRoute";
import { MediaFrame } from "../components/MediaFrame";
import { FrankenFigsBadge } from "../components/FrankenFigsBadge";
import { ProjectOrbit } from "../components/ProjectOrbit";
import { SkillMarquee } from "../components/SkillMarquee";
import { featuredProjects, orderedProjects } from "../content/projects";
import { getCurrentAge, profile } from "../content/profile";

export function HomePage() {
  const featured = featuredProjects[0];

  return (
    <div className="page page-home">
      <section className="workbench" aria-labelledby="home-title">
        <span className="coordinate-label coordinate-label--x">X / BUSINESS QUESTION</span>
        <span className="coordinate-label coordinate-label--y">Y / DECISION CLARITY</span>
        <div className="portrait-zone">
          <figure className="portrait-orbit" data-cursor-hover>
            <svg className="portrait-orbit__ring" viewBox="0 0 240 240" aria-hidden="true">
              <defs>
                <path id="portrait-ring-path" d="M 120,120 m -101,0 a 101,101 0 1,1 202,0 a 101,101 0 1,1 -202,0" />
              </defs>
              <text><textPath href="#portrait-ring-path">DATA · ANALYSIS · INSIGHT · DATA · ANALYSIS · INSIGHT · </textPath></text>
            </svg>
            <img src={profile.avatarUrl} alt={`${profile.name} 个人头像`} />
          </figure>
          <p className="hand-note">Hi, I am</p>
          <FrankenFigsBadge className="frankenfigs-badge--home" />
        </div>

        <div className="home-intro">
          <h1 id="home-title">{profile.name}</h1>
          <p className="role-line">{profile.title}</p>
          <div className="home-facts" aria-label="个人信息">
            <span><strong>所在地</strong>{profile.location}</span>
            <span><strong>求职方向</strong>{profile.desiredRole}</span>
            <span><strong>状态</strong>{profile.status}</span>
            <span><strong>年龄</strong>{getCurrentAge()}岁</span>
          </div>
          <SkillMarquee />
          <div className="intro-actions">
            <Link className="primary-command" to="/dashboards">精选看板 <ArrowRight aria-hidden="true" /></Link>
            <Link className="primary-command" to="/research">研究论文 <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>

        <AnalysisRoute />

        <figure className="featured-media" id="selected-work">
          <div className="media-toolbar">
            <span>Selected work / {featured.kind === "dashboard" ? "Dashboard" : "Research"}</span>
            <span className="media-status"><i></i> 可查看</span>
          </div>
          <MediaFrame media={featured.media[0]} eager className="media-window" />
          <figcaption>
            <span className="project-type">{featured.capabilities.join(" / ")}</span>
            <strong title={featured.title}>{featured.shortTitle}</strong>
            <Link to={`/project/${featured.slug}`} aria-label={`打开${featured.title}`}><ArrowUpRight aria-hidden="true" /></Link>
          </figcaption>
        </figure>

      </section>

      <section className="evidence-showcase" aria-labelledby="evidence-title">
        <header className="evidence-showcase__head">
          <div>
            <span className="utility-label">作品一览 / {orderedProjects.length}</span>
            <h2 id="evidence-title">看板与研究作品</h2>
          </div>
          <Link className="row-link" to="/dashboards">进入完整项目库 <ArrowRight aria-hidden="true" /></Link>
        </header>
        <ProjectOrbit projects={orderedProjects.slice(0, 5)} />
      </section>

    </div>
  );
}
