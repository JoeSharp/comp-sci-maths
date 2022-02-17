import p5 from "p5";
import { AbstractSketch } from "../../p5/useSketch";
import { AxisRange, PlotConfiguration } from "./types";

const WIDTH = 600;
const HEIGHT = 600;

interface Config extends AxisRange {
  plotConfigurations: PlotConfiguration[];
}

export const DEFAULT_RANGE: AxisRange = {
  from: -100,
  to: +100,
  step: 1,
};

const getDefaultConfig = (): Config => ({
  ...DEFAULT_RANGE,
  plotConfigurations: [],
});

class GraphFunctionSketch extends AbstractSketch<Config> {
  constructor() {
    super(getDefaultConfig());
  }

  sketch(s: p5) {
    const that = this;

    s.setup = function () {
      s.createCanvas(WIDTH, HEIGHT);
      s.colorMode(s.HSB, 255);
      s.textFont("Helvetica", 18);
    };

    s.draw = function () {
      const { from, to, step, plotConfigurations } = that.config;

      const mapX = (x: number): number =>
        s.map(x, from, to, -s.width / 2, s.width / 2);
      const mapY = (y: number): number =>
        s.map(y, from, to, s.height / 2, -s.height / 2);

      s.background(230);
      s.strokeWeight(3);
      s.stroke("black");

      s.translate(s.width / 2, s.height / 2);

      // Draw x-axis
      s.line(-s.width / 2, 0, s.width / 2, 0);

      // Draw y-axis
      s.line(0, -s.height / 2, 0, s.height / 2);

      plotConfigurations.forEach(({ colour, graphFunction }) => {
        let lastX = from - step;
        let lastY = graphFunction(from - step);
        s.stroke(colour);

        for (let x = from; x < to; x += step) {
          let y = graphFunction(x);
          s.point(mapX(x), mapY(y));
          s.line(mapX(lastX), mapY(lastY), mapX(x), mapY(y));

          lastX = x;
          lastY = y;
        }
      });
    };
  }
}

export default GraphFunctionSketch;
