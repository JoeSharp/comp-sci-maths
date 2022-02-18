import p5 from "p5";
import { IKeyWithValue } from "@comp-sci-maths/lib/dist/types";

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

export interface DisplayDataItem<T> extends IKeyWithValue<T> {
  label: string;
}

export type NumberDataItem = DisplayDataItem<number>;
export type StringDataItem = DisplayDataItem<string>;

export interface Point {
  x: number;
  y: number;
}

export type PointDataItem = DisplayDataItem<Point>;
