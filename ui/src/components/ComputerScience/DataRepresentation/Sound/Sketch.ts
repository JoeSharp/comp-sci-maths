import p5 from "p5";
import { AbstractSketch } from "../../../p5/useSketch";

export const SIGNAL_MODE_SINE = "Sine Wave";
export const SIGNAL_MODE_NOISE = "Perlin Noise";

export const signalTypes = [SIGNAL_MODE_SINE, SIGNAL_MODE_NOISE];

const WIDTH = 480;
const HEIGHT = 320;

interface Sample {
  signal: number;
  x: number;
  qSignal: number;
}

export interface Config {
  samplingRate: number;
  resolution: number;
  signalFrequency: number;
  plotSignal: boolean;
  plotSamples: boolean;
  plotSquareWave: boolean;
  plotQuantisation: boolean;
  signalType: string;
}

const defaultConfig: Config = {
  samplingRate: 10,
  resolution: 3,
  signalFrequency: 3,
  plotSignal: true,
  plotSamples: false,
  plotQuantisation: false,
  plotSquareWave: true,
  signalType: SIGNAL_MODE_NOISE,
};

class Sketch extends AbstractSketch<Config> {
  constructor() {
    super(defaultConfig);
  }

  sketch(s: p5) {
    const that = this;
    let analogueSignal: number[] = [];
    const CROSS_LENGTH = 5;

    s.setup = function () {
      s.createCanvas(WIDTH, HEIGHT);
    };

    s.draw = function () {
      s.background(240);
      s.translate(0, s.height / 2);

      const {
        samplingRate,
        resolution,
        signalFrequency,
        plotSignal,
        plotSamples,
        plotSquareWave,
        plotQuantisation,
        signalType,
      } = that.config;

      let quantisationStep = s.height / Math.pow(2, resolution);

      // Record analogue signal
      let signalValue = 0.0;
      switch (signalType) {
        case SIGNAL_MODE_SINE:
          let t = s.map(s.frameCount, 0, s.width, 0, s.TWO_PI);
          signalValue = s.sin(t * signalFrequency) * (s.height / 2);
          break;
        case SIGNAL_MODE_NOISE:
          signalValue =
            s.noise((s.frameCount / 1000) * signalFrequency) * s.height -
            s.height / 2;
          break;
      }

      // Write the signals
      analogueSignal.splice(0, 0, signalValue);

      // Control their length
      while (analogueSignal.length > s.width) {
        analogueSignal.pop();
      }

      let samples: Sample[] = analogueSignal
        .map((signal, x) => ({
          signal,
          qSignal: quantisationStep * Math.floor(signal / quantisationStep),
          x,
        }))
        .filter(
          ({ x }) =>
            (x - s.frameCount) % Math.floor(s.width / samplingRate) === 0
        );

      // Draw Axis and gridlines
      s.noFill();
      s.stroke("black");
      s.strokeWeight(2);
      s.line(0, 0, s.width, 0);
      s.strokeWeight(1);
      s.stroke("grey");
      for (let y = 0; y < s.height / 2; y += quantisationStep) {
        s.line(0, y, s.width, y);
        s.line(0, -y, s.width, -y);
      }

      // Plot the Samples
      if (plotSamples) {
        s.stroke("green");
        samples.forEach(({ signal, x }) => {
          s.strokeWeight(2);
          s.push();
          s.translate(x, signal);
          s.line(-CROSS_LENGTH, -CROSS_LENGTH, CROSS_LENGTH, CROSS_LENGTH);
          s.line(-CROSS_LENGTH, CROSS_LENGTH, CROSS_LENGTH, -CROSS_LENGTH);
          s.pop();
          s.strokeWeight(1);
          s.line(x, signal, x, s.height / 2);
        });
      }

      // Plot Quantisation
      if (plotQuantisation) {
        s.stroke("red");
        s.strokeWeight(8);
        samples.forEach(({ qSignal, x }) => {
          s.point(x, qSignal);
        });
      }

      // Draw the Analogue Signal
      if (plotSignal) {
        showSignal("blue", analogueSignal);
      }

      if (plotSquareWave) {
        s.stroke("red");
        for (let i = 0; i < samples.length - 1; i++) {
          s.line(
            samples[i].x,
            samples[i].qSignal,
            samples[i + 1].x,
            samples[i].qSignal
          );
          s.line(
            samples[i + 1].x,
            samples[i].qSignal,
            samples[i + 1].x,
            samples[i + 1].qSignal
          );
        }
      }
    };

    function showSignal(colour: string, signal: number[]) {
      s.stroke(colour);
      s.strokeWeight(1);
      s.beginShape();
      signal.forEach((signal, x) => {
        s.vertex(x, signal);
      });
      s.endShape();
    }
  };
}

export default Sketch;
