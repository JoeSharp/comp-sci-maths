import p5 from "p5";
import drawArrow from "./drawArrow";

interface FlowFieldArgs {
  resolution: number;
  sketch: p5;
}

interface FlowCell {
  position: p5.Vector;
  angle: number;
  force: p5.Vector;
}

export default class FlowField {
  resolution: number;
  sketch: p5;
  cols: number;
  rows: number;
  field: Array<Array<FlowCell>>;
  flowCells: Array<FlowCell>;

  constructor({ sketch, resolution }: FlowFieldArgs) {
    this.sketch = sketch;
    const { width, height } = this.sketch;
    this.resolution = resolution;
    this.cols = width / resolution;
    this.rows = height / resolution;
    this.field = [];
    this.flowCells = [];
    this.init();
  }

  init() {
    const s = this.sketch;
    let xoff = 0;
    for (let i = 0; i < this.cols; i++) {
      let yoff = 0;
      let yField: Array<FlowCell> = [];
      for (let j = 0; j < this.rows; j++) {
        let theta = s.map(s.noise(xoff, yoff), 0, 1, 0, s.TWO_PI);
        let flowCell: FlowCell = {
          position: s.createVector(i * this.resolution, j * this.resolution),
          angle: theta,
          force: s.createVector(s.cos(theta), s.sin(theta)),
        };
        yField.push(flowCell);
        this.flowCells.push(flowCell);
        yoff += 0.1;
      }
      this.field.push(yField);

      xoff += 0.1;
    }
  }

  attract(focalPoint: p5.Vector, range: number) {
    const s = this.sketch;

    this.flowCells.forEach((flowCell) => {
      let diff: p5.Vector = p5.Vector.sub(focalPoint, flowCell.position);
      if (diff.mag() < range) {
        let a: number = diff.heading();
        flowCell.angle = a;
        flowCell.force = s.createVector(s.cos(a), s.sin(a));
      }
    });
  }

  display() {
    this.field.forEach((row) => {
      row.forEach(({ position, angle, force }) => {
        drawArrow({
          sketch: this.sketch,
          position,
          angle,
          colour: 50,
          radius: force.mag() * 2,
        });
      });
    });
  }

  lookup(lookup: p5.Vector) {
    const s = this.sketch;
    let column = Math.floor(
      s.constrain(lookup.x / this.resolution, 0, this.cols - 1)
    );
    let row = Math.floor(
      s.constrain(lookup.y / this.resolution, 0, this.rows - 1)
    );
    return this.field[column][row].force.copy();
  }
}
