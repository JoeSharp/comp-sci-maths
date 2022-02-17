import p5 from "p5";
import { AbstractSketch } from "../../../p5/useSketch";
import { BigOMeasurements } from "./types";

const WIDTH = 600;
const HEIGHT = 600;

interface Config {
  startSize: number;
  endSize: number;
  measurements: BigOMeasurements;
}

const getDefaultConfig = (): Config => ({
  startSize: 100,
  endSize: 1000,
  measurements: {},
});

class BigOSketch extends AbstractSketch<Config> {
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
      const { measurements, startSize, endSize } = that.config;

      s.background(230);
      s.strokeWeight(5);
      s.stroke("blue");

      // Find the largest measurement
      let highest = 0;
      Object.values(measurements).forEach((i: number) => {
        if (i > highest) {
          highest = i;
        }
      });

      Object.entries(measurements)
        .map((k) => ({ index: parseInt(k[0]), value: k[1] }))
        .forEach(({ index, value }) => {
          const x = s.map(index, startSize, endSize, 0, WIDTH);
          const y = s.map(value, 0, highest, 0, HEIGHT);
          s.point(x, HEIGHT - y);
        });
    };
  }
}

export default BigOSketch;
