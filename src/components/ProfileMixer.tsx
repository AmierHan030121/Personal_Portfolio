import { Dices, Sparkles, WandSparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { orderedProjects } from "../content/projects";

function normalize(value: string) {
  return value.trim().toLocaleLowerCase();
}

export function ProfileMixer() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [seedIndex, setSeedIndex] = useState(0);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const matches = useMemo(() => {
    const needle = normalize(query);
    if (!needle) return orderedProjects;
    return orderedProjects.filter((project) => normalize([
      project.shortTitle,
      project.title,
      project.filterLabel,
      ...project.capabilities,
    ].join(" ")).includes(needle));
  }, [query]);

  const project = matches[seedIndex % matches.length] ?? orderedProjects[0];

  const spawnProject = () => {
    setSeedIndex((value) => (value + 1) % Math.max(matches.length, 1));
  };

  return (
    <div className="profile-mixer">
      <button className="header-action" type="button" title="生成作品入口" aria-label="生成作品入口" aria-expanded={open} aria-controls="profile-mixer-panel" onClick={() => setOpen((value) => !value)}>
        <WandSparkles aria-hidden="true" /> 生成入口
      </button>
      {open && (
        <section className="profile-mixer__panel" id="profile-mixer-panel" aria-label="生成作品入口">
          <header>
            <div>
              <span className="utility-label">Figspawn</span>
              <strong>生成一个作品入口</strong>
            </div>
            <Sparkles aria-hidden="true" />
          </header>
          <div className="profile-mixer__query">
            <label htmlFor="profile-mixer-query">项目关键词</label>
            <div>
              <input
                id="profile-mixer-query"
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSeedIndex(0);
                }}
                placeholder="例如：电商、研究、物流"
              />
              <button type="button" aria-label="随机生成一个入口" onClick={spawnProject}>
                <Dices aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="profile-mixer__result" aria-live="polite">
            <span>{project.kind === "dashboard" ? "Dashboard" : "Research"} / {project.filterLabel}</span>
            <strong>{project.shortTitle}</strong>
            <p>{project.question}</p>
            <Link to={`/project/${project.slug}`} onClick={() => setOpen(false)}>打开项目</Link>
          </div>
        </section>
      )}
    </div>
  );
}
