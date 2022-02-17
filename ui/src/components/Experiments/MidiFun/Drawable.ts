import p5 from "p5";

abstract class Drawable {
  note: number;
  accumulating: boolean;
  velocity: number;
  position: p5.Vector;
  size: number;
  colour: p5.Color;
  tailLength: number = 0;
  abstract draw(s: p5): void;

  constructor(
    note: number,
    velocity: number,
    position: p5.Vector,
    size: number,
    colour: p5.Color,
    accumulating: boolean) {
    this.note = note;
    this.velocity = velocity;
    this.position = position;
    this.size = size;
    this.colour = colour;
    this.accumulating = accumulating;
  }

  update() {
    this.position.y += this.size;
    if (this.accumulating) {
      this.tailLength += 1;
    }
  }
}

export default Drawable;