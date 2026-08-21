import { useState, type KeyboardEvent } from "react";

const steps = [
  { label: "业务问题", detail: "先确认真正需要回答的问题。" },
  { label: "数据与方法", detail: "再选择可复现的数据和方法。" },
  { label: "决策表达", detail: "最后把证据变成可执行的表达。" },
] as const;

export function AnalysisRoute() {
  const [activeStep, setActiveStep] = useState(0);

  const advanceWithEnter = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && event.target === event.currentTarget) {
      setActiveStep((step) => (step + 1) % steps.length);
    }
  };

  return (
    <div className="analysis-route" aria-label="分析路径：业务问题、数据与方法、决策表达" tabIndex={0} onKeyDown={advanceWithEnter}>
      {steps.map((step, index) => (
        <button
          className={`analysis-route__step analysis-route__step--${["one", "two", "three"][index]} ${activeStep === index ? "is-active" : ""}`}
          type="button"
          aria-pressed={activeStep === index}
          aria-label={`${step.label}：${step.detail}`}
          key={step.label}
          onClick={() => setActiveStep(index)}
        >
          <i></i>{step.label}
        </button>
      ))}
      <svg viewBox="0 0 760 120" aria-hidden="true" focusable="false">
        <path d="M12 82 C 130 82, 168 24, 286 44 S 478 108, 742 28" />
        <circle cx="12" cy="82" r="5" />
        <circle cx="286" cy="44" r="5" />
        <circle cx="742" cy="28" r="5" />
      </svg>
    </div>
  );
}
