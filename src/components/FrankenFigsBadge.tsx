import mascotUrl from "../../assets/frankenfigs-character.png";
import { SignalEyes } from "./SignalEyes";

interface FrankenFigsBadgeProps {
  className?: string;
}

export function FrankenFigsBadge({ className = "" }: FrankenFigsBadgeProps) {
  return (
    <div className={`frankenfigs-badge ${className}`.trim()} aria-label="会随设备倾斜或鼠标移动的个人角色">
      <img src={mascotUrl} alt="粉色 Frankenfigs 卡通角色" />
      <span className="frankenfigs-badge__eyes"><SignalEyes compact /></span>
    </div>
  );
}
