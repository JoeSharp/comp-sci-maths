import p5 from "p5";

export interface AbstractBoid<T> {
  entity: T;
  position: p5.Vector;
  radius: number;
  label?: string;
  borderWeight?: number;
  borderColour?: string;
  colour?: string;
  maxSpeed?: number;
  maxForce?: number;
  minForce?: number;
  environmentalFriction?: number;
  lockX?: boolean;
  lockY?: boolean;
}

export interface Point {
  x: number;
  y: number;
}

