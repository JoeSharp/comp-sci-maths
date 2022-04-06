import p5 from "p5";
import Boid from "./Boid";

export default class DataItemBoid<T> extends Boid<T> {
  isMouseOver(mousePosition: p5.Vector) {
    // Is the mouse pointer within the radius of our boid circle?
    let diff = p5.Vector.sub(this.position, mousePosition);
    return diff.mag() < this.radius;
  }

  update(s: p5) {
    super.update(s);

    // Clip to Sides
    if (this.position.x > s.width) {
      this.position.x = s.width;
    } else if (this.position.x < 0) {
      this.position.x = 0;
    }

    // Clip to top and bottom
    if (this.position.y > s.height) {
      this.position.y = s.height;
    } else if (this.position.y < 0) {
      this.position.y = 0;
    }
  }

  draw(s: p5) {
    s.stroke(this.borderColour);
    if (this.grabbed) {
      s.strokeWeight(4);
    } else {
      s.strokeWeight(this.borderWeight);
    }

    s.fill(this.colour);
    s.ellipse(this.position.x, this.position.y, this.radius);

    if (this.label !== undefined) {
      s.fill("white");
      s.stroke("black");
      s.textAlign(s.CENTER, s.CENTER);
      s.text(this.label, this.position.x, this.position.y);
    }
  }
}
