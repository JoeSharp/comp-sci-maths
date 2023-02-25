import Side from "./Side";
enum Face {
  top = "Top",
  bottom = "Bottom",
  left = "Left",
  right = "Right",
  front = "Front",
  back = "Back",
}

class Cube {
  faces: Map<Face, Side>;

  constructor() {
    this.faces = new Map();
  }
}

export default Cube;
