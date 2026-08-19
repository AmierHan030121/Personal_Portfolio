import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "../content/profile";

export function AboutPage() {
  return (
    <div className="page page-about">
      <section className="page-heading" aria-labelledby="about-title">
        <span className="eyebrow">Profile / working approach</span>
        <h1 id="about-title">关于 AmierHan</h1>
        <p>{profile.statement}</p>
      </section>
      <section className="about-layout">
        <article className="about-panel about-panel--identity">
          <img src={profile.avatarUrl} alt={`${profile.name} 个人头像`} />
          <div>
            <span className="utility-label">Current focus</span>
            <h2>{profile.title}</h2>
            <p>以真实作品为证据，连接业务问题、分析方法和决策表达。</p>
          </div>
        </article>
        <article className="about-panel">
          <span className="utility-label">Capabilities</span>
          <div className="capability-list">
            {profile.capabilities.map((item) => (
              <div key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.detail}</p>
                <span>{item.tools.join(" · ")}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="about-panel about-panel--next">
          <span className="utility-label">Start with a project</span>
          <h2>先看真实作品，再了解我的方法。</h2>
          <div>
            <Link className="primary-command" to="/dashboards">查看看板 <ArrowUpRight aria-hidden="true" /></Link>
            <Link className="text-command" to="/research">查看研究</Link>
          </div>
        </article>
      </section>
    </div>
  );
}
