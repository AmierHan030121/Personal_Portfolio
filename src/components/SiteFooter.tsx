import { ArrowUpRight } from "lucide-react";
import { NavLink } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__lead">
        <span className="utility-label">Continue exploring</span>
        <strong>从看板到研究，查看完整分析过程。</strong>
      </div>
      <nav aria-label="页脚导航">
        <NavLink to="/dashboards">看板项目 <ArrowUpRight aria-hidden="true" /></NavLink>
        <NavLink to="/research">研究项目 <ArrowUpRight aria-hidden="true" /></NavLink>
        <NavLink to="/about">关于我 <ArrowUpRight aria-hidden="true" /></NavLink>
      </nav>
      <div className="site-footer__meta">
        <p>© {new Date().getFullYear()} AmierHan. Analytics & BI Portfolio.</p>
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">浙ICP备2026033437号</a>
      </div>
    </footer>
  );
}
