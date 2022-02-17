import p5 from "p5";

import ArrowBoid from "../rainbowFlowField/ArrowBoid";
import { AbstractSketch } from "../../useSketch";

/**
 * Generate a random integer within a p5 sketch.
 *
 * @param s The p5 sketch, provides library function .map()
 * @param from The lower bound of the number (inclusive)
 * @param to The upper bound of the number to generate (exclusive)
 */
function randomInt(s: p5, from: number, to: number) {
  return Math.floor(s.map(Math.random(), 0, 1, from, to));
}

// Each boid will be one of these colours
const COLOURS: string[] = ["red", "blue", "green"];

// Clip the speed of all boids to this
const MAX_SPEED = 1.5;

// Clip the force applied per frame
const MAX_FORCE = 0.5;

// Size of boid
const RADIUS = 3;

export default class GravitySketch extends AbstractSketch<{}> {
  sketch(s: p5) {
    let boids: Array<ArrowBoid> = [];
    let centreScreen: p5.Vector;

    // Create the initial list of boids
    s.setup = function () {
      s.createCanvas(400, 400);
      centreScreen = s.createVector(200, 200);

      for (let i = 0; i < 5; i++) {
        // Place the boids randomly anywhere within the view
        let position = s.createVector(
          randomInt(s, 0, s.width),
          randomInt(s, 0, s.height)
        );

        // Each boid will be a random colour
        let aBoid = new ArrowBoid({
          entity: i,
          position,
          radius: RADIUS,
          maxSpeed: MAX_SPEED,
          maxForce: MAX_FORCE,
        });
        aBoid.colour = s.random(COLOURS);
        boids.push(aBoid);
      }
    };

    s.draw = function () {
      // Draw the background
      s.background(0);

      // Loop through the boids
      boids.forEach((b) => {
        b.seek(centreScreen);
      });

      // Loop through each boid, calling update
      boids.forEach((b) => b.update(s));

      // Loop through each boid, calling display
      boids.forEach((b) => b.draw(s));

      // Filter boids by calling onScreen
      boids = boids.filter((b) => b.onScreen(s));
    };
  };
}
