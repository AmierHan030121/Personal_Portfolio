import { useEffect, useState } from "react";

export function SignalEyes() {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const updatePosition = (event: PointerEvent) => {
      setPosition({
        x: Math.max(20, Math.min(80, (event.clientX / window.innerWidth) * 100)),
        y: Math.max(20, Math.min(80, (event.clientY / window.innerHeight) * 100)),
      });
    };
    window.addEventListener("pointermove", updatePosition, { passive: true });
    return () => window.removeEventListener("pointermove", updatePosition);
  }, []);

  return (
    <div className="signal-eyes" aria-label="会跟随鼠标移动的圆眼睛">
      <span className="signal-eyes__pair" aria-hidden="true">
        <span className="signal-eye"><i style={{ left: `${position.x}%`, top: `${position.y}%` }} /></span>
        <span className="signal-eye"><i style={{ left: `${position.x}%`, top: `${position.y}%` }} /></span>
      </span>
    </div>
  );
}
