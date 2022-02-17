import p5 from "p5";
import { GameObject } from "./types";

const COLOURS = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet"
];

class Bullet implements GameObject {
  s: p5;
  position: p5.Vector;
  velocity: p5.Vector;
  radius: number;
  color: string;
  isDead: boolean;

  constructor(s: p5, position: p5.Vector, velocity: p5.Vector, radius: number) {
    this.s = s;
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.color = COLOURS[Math.floor(Math.random() * COLOURS.length)];
    this.isDead = false;
  }

  hitBy(other: GameObject) {
    this.isDead = true;
  }

  isStillActive() {
    return (
      !this.isDead &&
      this.position.x > 0 &&
        this.position.x < this.s.width &&
        this.position.y > 0 &&
        this.position.y < this.s.height
    );
  }

  update() {
    this.position.add(this.velocity);
  }

  draw() {
    this.s.push();
    this.s.translate(this.position.x, this.position.y);
    this.s.noStroke();
    this.s.fill(this.color);
    this.s.circle(0, 0, this.radius);
    this.s.pop();
  }
}

export default Bullet;
