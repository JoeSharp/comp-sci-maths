import p5 from "p5";
import AbstractDrawable from "./AbstractDrawable";

interface Coord {
  x: number;
  y: number;
}

const TShape: Coord[] = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: 1, y: 0 }
];
const LongOne: Coord[] = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: 0, y: 2 }
];
const ZRIght: Coord[] = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
  { x: 1, y: 0 }
];
const ZLeft: Coord[] = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: -1, y: 0 }
];
const LLeft: Coord[] = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: -1, y: 2 }
];
const LRight: Coord[] = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 1, y: 2 }
];
const Block: Coord[] = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 0 }
];
const SHAPES: Coord[][] = [
  TShape,
  LongOne,
  ZRIght,
  ZLeft,
  LLeft,
  LRight,
  Block
];

class Tetronimo extends AbstractDrawable {
  squares: Coord[] = SHAPES[Math.floor(Math.random() * SHAPES.length)];;

  update() {
    this.position.y += this.size;
    if (this.noteIsDown) {
      this.tailLength += 1;
    }
  }

  draw(s: p5) {
    s.strokeWeight(2);
    s.stroke("black");
    s.fill(this.colour);
    this.squares.forEach(({ x, y }) => {
      s.push();
      s.translate(
        this.position.x + this.size * x,
        this.position.y + this.size * y
      );
      s.square(0, 0, this.size);
      s.pop();
    });

    // Draw tail
    s.push();
    s.translate(this.position.x, this.position.y);
    for (let i = 0; i < this.tailLength; i++) {
      s.translate(0, -this.size);
      s.square(0, 0, this.size);
    }
    s.pop();
  }
}

export default Tetronimo;
