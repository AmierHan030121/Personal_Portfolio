import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AnalysisRoute } from "../components/AnalysisRoute";
import { MediaFrame } from "../components/MediaFrame";
import { ProjectFortune } from "../components/ProjectFortune";
import { ProjectOrbit } from "../components/ProjectOrbit";
import { ResumeSnapshot } from "../components/ResumeSnapshot";
import { featuredProjects, orderedProjects } from "../content/projects";
import { profile } from "../content/profile";

export function HomePage() {
  const featured = featuredProjects[0];

  return (
    <div className="page page-home">
      <section className="workbench" aria-labelledby="home-title">
        <span className="coordinate-label coordinate-label--x">X / BUSINESS QUESTION</span>
        <span className="coordinate-label coordinate-label--y">Y / DECISION CLARITY</span>
        <div className="portrait-zone">
          <figure className="portrait-orbit">
            <span className="orbit-label orbit-label--top">Observe</span>
            <span className="orbit-label orbit-label--side">Explain</span>
            <img src={profile.avatarUrl} alt={`${profile.name} 个人头像`} />
          </figure>
          <p className="hand-note">Hi, I am</p>
        </div>

        <div className="home-intro">
          <h1 id="home-title">{profile.name}</h1>
          <p className="role-line">{profile.title}</p>
          <p className="intro-copy">{profile.statement}</p>
          <div className="intro-actions">
            <Link className="primary-command" to="/dashboards">查看精选项目 <ArrowRight aria-hidden="true" /></Link>
            <Link className="text-command" to="/research">浏览研究项目</Link>
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

        <ResumeSnapshot />
        <ProjectFortune projects={orderedProjects} />
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
