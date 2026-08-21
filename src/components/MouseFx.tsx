import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
}

export function MouseFx() {
  const target = useRef<Point>({ x: -80, y: -80 });
  const current = useRef<Point>({ x: -80, y: -80 });
  const frame = useRef<number | null>(null);
  const [point, setPoint] = useState<Point>({ x: -80, y: -80 });
  const [visible, setVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const updateHover = (element: Element | null) => {
      setIsHover(Boolean(element?.closest("a, button, [data-cursor-hover]")));
    };

    const move = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
      setVisible(true);
      updateHover(event.target instanceof Element ? event.target : null);
    };

    const leave = () => {
      setVisible(false);
      setIsHover(false);
    };

    const resize = () => {
      const clamp = (point: Point): Point => ({
        x: Math.max(-40, Math.min(window.innerWidth + 20, point.x)),
        y: Math.max(-40, Math.min(window.innerHeight + 20, point.y)),
      });
      target.current = clamp(target.current);
      current.current = clamp(current.current);
    };

    const tick = () => {
      const next = current.current;
      next.x += (target.current.x - next.x) * 0.085;
      next.y += (target.current.y - next.y) * 0.085;
      setPoint({ x: next.x, y: next.y });
      frame.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointerleave", leave, { passive: true });
    window.addEventListener("blur", leave, { passive: true });
    frame.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <span
      className={`mouse-fx${visible ? " is-visible" : ""}${isHover ? " is-hover" : ""}`}
      style={{ transform: `translate3d(${point.x}px, ${point.y}px, 0)` }}
      aria-hidden="true"
    />
  );
}
