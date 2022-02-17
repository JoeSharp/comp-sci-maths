import p5 from "p5";
import { Drawable } from "./types";

abstract class AbstractDrawable implements Drawable {
    note: number;
    noteIsDown: boolean;
    velocity: number;
    position: p5.Vector;
    size: number;
    colour: p5.Color;
    tailLength: number = 0;

    abstract draw(s: p5): void;
  
    constructor(note: number,
      velocity: number,
      position: p5.Vector,
      size: number,
      colour: p5.Color,
      noteIsDown: boolean) {
      this.note = note;
      this.velocity = velocity;
      this.position = position;
      this.size = size;
      this.colour = colour;
      this.noteIsDown = noteIsDown;
    }
  
    update() {
      this.position.add(this.velocity);
      if (this.noteIsDown) {
        this.tailLength += 1;
      }
    }
  }
  
  export default AbstractDrawable;