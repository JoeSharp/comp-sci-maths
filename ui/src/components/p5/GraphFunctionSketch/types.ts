export interface AxisRange {
  from: number;
  to: number;
  step: number;
}

export type GraphFunction = (x: number) => number;

export interface PlotConfiguration {
  name: string;
  graphFunction: GraphFunction;
  colour: string;
}
