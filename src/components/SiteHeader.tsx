import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SiteHeaderProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onNavigate: () => void;
}

const navItems = [
  { to: "/", label: "工作台", end: true },
  { to: "/dashboards", label: "看板", end: false },
  { to: "/research", label: "研究", end: false },
  { to: "/about", label: "关于", end: false },
];

export function SiteHeader({ isMenuOpen, onMenuToggle, onNavigate }: SiteHeaderProps) {
  return (
    <>
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <header className="site-header">
        <div className="site-header__inner">
          <NavLink className="site-brand" to="/" onClick={onNavigate} aria-label="AmierHan 工作台首页">
            <span className="site-brand__mark">Am</span>
            <span className="site-brand__text">
              <strong>AmierHan</strong>
              <small>Data portfolio</small>
            </span>
          </NavLink>

          <nav id="mobile-navigation" className={`site-nav ${isMenuOpen ? "is-open" : ""}`} aria-label="主导航">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onNavigate}
                className={({ isActive }) => (isActive ? "is-active" : undefined)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <NavLink className="header-action" to="/dashboards" onClick={onNavigate}>
            查看作品
            <span aria-hidden="true">↗</span>
          </NavLink>

          <button
            className="menu-button"
            type="button"
            aria-label={isMenuOpen ? "关闭导航" : "打开导航"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={onMenuToggle}
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>
    </>
  );
}
