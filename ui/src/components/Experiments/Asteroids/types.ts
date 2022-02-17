import p5 from "p5";

export interface GameObject {
  s: p5;
  position: p5.Vector;
  velocity: p5.Vector;
  radius: number;

  update: () => void;
  draw: () => void;
  hitBy: (other: GameObject) => void;
  isStillActive: () => void;
}
