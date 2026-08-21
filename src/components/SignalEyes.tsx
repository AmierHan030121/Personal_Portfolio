import { useEffect, useRef, useState } from "react";

interface SignalEyesProps {
  compact?: boolean;
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function getOrientationTravel(
  beta: number,
  gamma: number,
  baseline: { beta: number; gamma: number },
  screenAngle: number,
) {
  const deltaBeta = beta - baseline.beta;
  const deltaGamma = gamma - baseline.gamma;
  let horizontal = deltaGamma;
  let vertical = deltaBeta;

  if (screenAngle === 90) {
    horizontal = deltaBeta;
    vertical = -deltaGamma;
  } else if (screenAngle === 180) {
    horizontal = -deltaGamma;
    vertical = -deltaBeta;
  } else if (screenAngle === 270 || screenAngle === -90) {
    horizontal = -deltaBeta;
    vertical = deltaGamma;
  }

  const maxTilt = 15;
  const maxTravel = 24;
  return {
    x: (clamp(horizontal, -maxTilt, maxTilt) / maxTilt) * maxTravel,
    y: (clamp(vertical, -maxTilt, maxTilt) / maxTilt) * maxTravel,
  };
}

export function SignalEyes({ compact = false }: SignalEyesProps) {
  const leftEyeRef = useRef<HTMLSpanElement>(null);
  const rightEyeRef = useRef<HTMLSpanElement>(null);
  const orientationBaselineRef = useRef<{ beta: number; gamma: number } | null>(null);
  const [positions, setPositions] = useState({
    left: { x: 56, y: 50 },
    right: { x: 44, y: 50 },
  });

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 760px)");
    const isMobile = mobileQuery.matches;
    const supportsOrientation = isMobile && window.isSecureContext && "DeviceOrientationEvent" in window;

    const getPosition = (element: HTMLSpanElement | null, clientX: number, clientY: number) => {
      if (!element) return { x: 50, y: 50 };
      const bounds = element.getBoundingClientRect();
      return {
        x: clamp(((clientX - bounds.left) / bounds.width) * 100, 20, 80),
        y: clamp(((clientY - bounds.top) / bounds.height) * 100, 20, 80),
      };
    };

    const setSignalPosition = (x: number, y: number) => {
      setPositions({
        left: { x: clamp(56 + x, 20, 80), y: clamp(50 + y, 20, 80) },
        right: { x: clamp(44 + x, 20, 80), y: clamp(50 + y, 20, 80) },
      });
    };

    const updatePosition = (event: PointerEvent) => {
      setPositions({
        left: getPosition(leftEyeRef.current, event.clientX, event.clientY),
        right: getPosition(rightEyeRef.current, event.clientX, event.clientY),
      });
    };

    const updateFromOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta == null || event.gamma == null) return;
      if (!orientationBaselineRef.current) {
        orientationBaselineRef.current = { beta: event.beta, gamma: event.gamma };
        return;
      }

      const baseline = orientationBaselineRef.current;
      const orientation = Math.round(screen.orientation?.angle ?? 0);
      const travel = getOrientationTravel(event.beta, event.gamma, baseline, orientation);
      setSignalPosition(travel.x, travel.y);
    };

    const resetOrientationBaseline = () => {
      orientationBaselineRef.current = null;
    };

    let requestPermissionOnTouch: (() => void) | undefined;
    if (supportsOrientation) {
      window.addEventListener("deviceorientation", updateFromOrientation, { passive: true });
      window.addEventListener("orientationchange", resetOrientationBaseline, { passive: true });

      const orientationEvent = window.DeviceOrientationEvent as typeof DeviceOrientationEvent & {
        requestPermission?: () => Promise<"granted" | "denied">;
      };
      if (typeof orientationEvent.requestPermission === "function") {
        requestPermissionOnTouch = () => {
          void orientationEvent.requestPermission?.().catch(() => undefined);
        };
        window.addEventListener("pointerdown", requestPermissionOnTouch, { once: true, passive: true });
      }
    } else if (!isMobile) {
      window.addEventListener("pointermove", updatePosition, { passive: true });
    }

    return () => {
      window.removeEventListener("pointermove", updatePosition);
      window.removeEventListener("deviceorientation", updateFromOrientation);
      window.removeEventListener("orientationchange", resetOrientationBaseline);
      if (requestPermissionOnTouch) window.removeEventListener("pointerdown", requestPermissionOnTouch);
    };
  }, []);

  return (
    <div className={`signal-eyes${compact ? " signal-eyes--compact" : ""}`} aria-label="会随设备倾斜或鼠标移动的圆眼睛">
      <span className="signal-eyes__pair" aria-hidden="true">
        <span className="signal-eye" ref={leftEyeRef}><i style={{ left: `${positions.left.x}%`, top: `${positions.left.y}%` }} /></span>
        <span className="signal-eye" ref={rightEyeRef}><i style={{ left: `${positions.right.x}%`, top: `${positions.right.y}%` }} /></span>
      </span>
    </div>
  );
}
