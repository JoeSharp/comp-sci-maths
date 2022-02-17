import p5 from "p5";
import { AbstractSketch } from "../useSketch";

const WIDTH = 600;
const HEIGHT = 300;
const FIRST_MOONS = 3;
const SECOND_MOONS = 3;

export default class GravityOrbits extends AbstractSketch<{}> {
  sketch(s: p5) {
    s.setup = function () {
      s.createCanvas(WIDTH, HEIGHT);
      s.colorMode(s.HSB, 255);
      s.angleMode(s.DEGREES);
    };

    s.draw = function () {
      s.background(0);
      s.fill("yellow");

      s.translate(WIDTH / 2, HEIGHT / 2);
      s.ellipse(0, 0, WIDTH / 10);

      for (let i = 0; i < FIRST_MOONS; i++) {
        s.push();
        s.fill(
          s.color(
            (s.frameCount + s.map(i, 0, FIRST_MOONS, 0, 255)) % 255,
            255,
            255
          )
        );
        s.rotate(s.frameCount * 0.5 + s.map(i, 0, FIRST_MOONS, 0, 360));
        s.translate(WIDTH / 12, HEIGHT / 12);
        s.ellipse(0, 0, WIDTH / 13);
        for (let j = 0; j < SECOND_MOONS; j++) {
          s.push();
          s.fill(
            s.color(
              (s.frameCount + s.map(j, 0, FIRST_MOONS, 0, 255)) % 255,
              255,
              255
            )
          );
          s.rotate(s.frameCount * 0.5 + s.map(j, 0, SECOND_MOONS, 0, 360));
          s.translate(WIDTH / 12, HEIGHT / 12);
          s.ellipse(0, 0, WIDTH / 20);

          s.pop();
        }

        s.pop();
      }
    };
  };
}
