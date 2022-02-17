import p5 from "p5";
import AbstractDrawable from "./AbstractDrawable";

class Triforce extends AbstractDrawable {
  draw(s: p5) {
    s.strokeWeight(2);
    s.stroke(this.colour);
    s.fill("gold");

    s.push();
    s.translate(this.position.x, this.position.y);
    s.triangle(0, -this.size, -(this.size / 2), 0, this.size / 2, 0);
    s.triangle(-this.size / 2, 0, -this.size, this.size, 0, this.size);
    s.triangle(this.size / 2, 0, this.size, this.size, 0, this.size);
    s.pop();

    s.push();
    s.translate(this.position.x, this.position.y);
    for (let i = 0; i < this.tailLength; i++) {
      s.translate(0, -this.size * 2);
      s.scale(0.9);
      s.triangle(0, -this.size, -(this.size / 2), 0, this.size / 2, 0);
    }
    s.pop();
  }
}

export default Triforce;
