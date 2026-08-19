import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { MediaDialog } from "../components/MediaDialog";
import { MediaFrame } from "../components/MediaFrame";
import { getProject } from "../content/projects";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;
  const [previewOpen, setPreviewOpen] = useState(false);

  if (!project) {
    return (
      <div className="page page-empty">
        <span className="eyebrow">Project not found</span>
        <h1>这个项目暂时不存在。</h1>
        <Link className="primary-command" to="/dashboards">返回看板项目 <ArrowLeft aria-hidden="true" /></Link>
      </div>
    );
  }

  const media = project.media[0];

  return (
    <div className="page page-detail">
      <Link className="back-link" to={project.kind === "dashboard" ? "/dashboards" : "/research"}>
        <ArrowLeft aria-hidden="true" /> 返回{project.kind === "dashboard" ? "看板" : "研究"}项目
      </Link>
      <section className="detail-heading" aria-labelledby="detail-title">
        <div>
          <span className="eyebrow">{project.kind === "dashboard" ? "Dashboard evidence" : "Research evidence"}</span>
          <h1 id="detail-title">{project.title}</h1>
          <p>{project.summary}</p>
        </div>
        <div className="detail-index">
          <span className="utility-label">Question</span>
          <strong>{project.question}</strong>
        </div>
      </section>
      <section className="detail-body">
        <figure className="detail-media">
          <MediaFrame media={media} eager />
          <figcaption>
            <span>{media.label}</span>
            <button className="preview-button" type="button" onClick={() => setPreviewOpen(true)}>打开预览</button>
          </figcaption>
        </figure>
        <aside className="detail-aside">
          <div>
            <span className="utility-label">Capabilities</span>
            <ul className="detail-list">{project.capabilities.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <span className="utility-label">Tools</span>
            <ul className="detail-list">{project.tools.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <a className="row-link" href={media.src} target="_blank" rel="noopener noreferrer">
            打开原始文件 <ExternalLink aria-hidden="true" />
          </a>
        </aside>
      </section>
      <MediaDialog media={previewOpen ? media : null} title={project.title} onClose={() => setPreviewOpen(false)} />
    </div>
  );
}
