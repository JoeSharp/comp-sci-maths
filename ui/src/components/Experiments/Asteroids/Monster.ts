import p5 from "p5";
import monsters from "./images/monsters";
import { ImageSwitcher } from "./images";
import { GameObject } from "./types";

class Asteroid implements GameObject {
  s: p5;
  position: p5.Vector;
  velocity: p5.Vector;
  angularVelocity: number;
  heading: number;
  radius: number;
  imageSwitcher: ImageSwitcher;
  isDead: boolean;

  constructor(s: p5) {
    this.s = s;
    this.position = s.createVector(s.random(s.width), s.random(s.height));
    this.velocity = s.createVector(s.random(-1, 1), s.random(-1, 1));
    this.angularVelocity = s.map(s.random(), 0, 1, -s.PI, s.PI) * 0.01;
    this.heading = s.map(s.random(), 0, 1, -s.PI, s.PI);
    this.radius = s.floor(s.random(20, 60));
    this.imageSwitcher = new ImageSwitcher(s, monsters);
    this.imageSwitcher.randomImage();
    this.isDead = false;
  }

  hitBy(other: GameObject) {
    this.isDead = true;
  }

  isStillActive() {
    return !this.isDead;
  }

  update() {
    this.position.add(this.velocity);
    this.heading += this.angularVelocity;

    // Cycle around the edges
    this.position.x += this.s.width;
    this.position.x %= this.s.width;
    this.position.y += this.s.height;
    this.position.y %= this.s.height;
  }

  draw() {
    this.s.push();
    this.s.translate(this.position.x, this.position.y);
    this.s.rotate(this.heading);

    this.s.noFill();
    this.s.stroke(255);
    this.s.image(
      this.imageSwitcher.currentImage(),
      -this.radius / 2,
      -this.radius / 2,
      this.radius,
      this.radius
    );

    this.s.pop();
  }
}

export default Asteroid;
