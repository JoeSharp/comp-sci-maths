import p5 from "p5";

import ships from "./images/ships";
import { ImageSwitcher } from "./images";
import { GameObject } from "./types";

class Ship implements GameObject {
  s: p5;
  position: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  heading: number;
  radius: number;
  imageSwitcher: ImageSwitcher;

  constructor(s: p5, position: p5.Vector, radius: number) {
    this.s = s;
    this.position = position;
    this.velocity = s.createVector();
    this.acceleration = s.createVector();
    this.heading = 0;
    this.radius = radius;
    this.imageSwitcher = new ImageSwitcher(s, ships);
  }

  nextImage() {
    this.imageSwitcher.nextImage();
  }

  hitBy(other: GameObject) {}

  isStillActive() {
    return true;
  }

  update() {
    let steer = 0;
    let thrust = 0;
    if (this.s.keyIsDown((this.s as any).LEFT_ARROW)) {
      steer = -1;
    } else if (this.s.keyIsDown((this.s as any).RIGHT_ARROW)) {
      steer = 1;
    } else if (this.s.keyIsDown((this.s as any).UP_ARROW)) {
      thrust = 1;
    }

    this.heading += steer * 0.1;

    let thrustForce = this.s.createVector(0, thrust * 0.4);
    thrustForce.rotate(this.heading);
    this.acceleration.add(thrustForce);
    this.velocity.add(this.acceleration);
    this.velocity.limit(4);
    this.velocity.mult(0.95);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    // Cycle around the edges
    this.position.x += this.s.width;
    this.position.x %= this.s.width;
    this.position.y += this.s.height;
    this.position.y %= this.s.height;
  }

  draw() {
    this.s.push();
    this.s.noFill();
    this.s.stroke("green");
    this.s.translate(this.position.x, this.position.y);
    this.s.rotate(this.heading);
    this.s.image(
      this.imageSwitcher.currentImage(),
      -this.radius,
      -this.radius,
      this.radius * 2,
      this.radius * 2
    );
    // this.s.triangle(
    //   -this.radius,
    //   -this.radius,
    //   this.radius,
    //   -this.radius,
    //   0,
    //   this.radius
    // );
    this.s.pop();
  }
}

export default Ship;
