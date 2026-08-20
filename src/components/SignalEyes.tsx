import { useEffect, useRef, useState } from "react";

interface SignalEyesProps {
  compact?: boolean;
}

export function SignalEyes({ compact = false }: SignalEyesProps) {
  const leftEyeRef = useRef<HTMLSpanElement>(null);
  const rightEyeRef = useRef<HTMLSpanElement>(null);
  const [positions, setPositions] = useState({
    left: { x: 56, y: 50 },
    right: { x: 44, y: 50 },
  });

  useEffect(() => {
    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
    const getPosition = (element: HTMLSpanElement | null, clientX: number, clientY: number) => {
      if (!element) return { x: 50, y: 50 };
      const bounds = element.getBoundingClientRect();
      return {
        x: clamp(((clientX - bounds.left) / bounds.width) * 100, 20, 80),
        y: clamp(((clientY - bounds.top) / bounds.height) * 100, 20, 80),
      };
    };

    const updatePosition = (event: PointerEvent) => {
      setPositions({
        left: getPosition(leftEyeRef.current, event.clientX, event.clientY),
        right: getPosition(rightEyeRef.current, event.clientX, event.clientY),
      });
    };
    window.addEventListener("pointermove", updatePosition, { passive: true });
    return () => window.removeEventListener("pointermove", updatePosition);
  }, []);

  return (
    <div className={`signal-eyes${compact ? " signal-eyes--compact" : ""}`} aria-label="会跟随鼠标移动的圆眼睛">
      <span className="signal-eyes__pair" aria-hidden="true">
        <span className="signal-eye" ref={leftEyeRef}><i style={{ left: `${positions.left.x}%`, top: `${positions.left.y}%` }} /></span>
        <span className="signal-eye" ref={rightEyeRef}><i style={{ left: `${positions.right.x}%`, top: `${positions.right.y}%` }} /></span>
      </span>
    </div>
  );
}
