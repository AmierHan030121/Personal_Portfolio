import { describe, expect, it } from "vitest";
import { getOrientationTravel } from "./SignalEyes";

describe("getOrientationTravel", () => {
  const baseline = { beta: 10, gamma: -4 };

  it("maps portrait tilt relative to the first sensor reading", () => {
    expect(getOrientationTravel(20, 1, baseline, 0)).toEqual({ x: 8, y: 16 });
  });

  it("rotates the axes in landscape mode", () => {
    expect(getOrientationTravel(20, 1, baseline, 90)).toEqual({ x: 16, y: -8 });
  });

  it("limits extreme tilt to the eye travel range", () => {
    expect(getOrientationTravel(80, -80, baseline, 0)).toEqual({ x: -24, y: 24 });
  });
});
