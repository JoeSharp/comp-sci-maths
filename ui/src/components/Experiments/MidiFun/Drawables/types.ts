import p5 from "p5";

export interface Drawable {
  draw: (s: p5) => void;
  update: (s: p5) => void;
}

export interface NoteBoid extends Drawable {
  note: number;
  noteIsDown: boolean;
  position: p5.Vector;
}

export interface NamedDrawables {
  [name: string]: new (note: number,
    velocity: number,
    position: p5.Vector,
    size: number,
    colour: p5.Color,
    noteIsDown: boolean) => Drawable;
}