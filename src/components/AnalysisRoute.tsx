export function AnalysisRoute() {
  return (
    <div className="analysis-route" aria-label="分析路径：业务问题、数据与方法、决策表达">
      <span className="analysis-route__step analysis-route__step--one"><i></i>业务问题</span>
      <span className="analysis-route__step analysis-route__step--two"><i></i>数据与方法</span>
      <span className="analysis-route__step analysis-route__step--three"><i></i>决策表达</span>
      <svg viewBox="0 0 760 120" aria-hidden="true" focusable="false">
        <path d="M12 82 C 130 82, 168 24, 286 44 S 478 108, 742 28" />
        <circle cx="12" cy="82" r="5" />
        <circle cx="286" cy="44" r="5" />
        <circle cx="742" cy="28" r="5" />
      </svg>
    </div>
  );
}
