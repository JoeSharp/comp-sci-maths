export enum Edge {
  left = "Left",
  right = "Right",
  top = "Top",
  bottom = "Bottom",
}

export enum RotateDirection {
  clockwise = "Clockwise",
  anticlockwise = "Anti-Clockwise",
}

class Side {
  content: number[][];
  dimension: number;

  constructor(content: number[][]) {
    this.content = content;
    this.dimension = this.content.length;
  }

  rotate(direction: RotateDirection) {
    let newContent = Array.from({ length: this.dimension }, () =>
      Array.from({ length: this.dimension }, () => 0)
    );

    for (let row = 0; row < this.dimension; row++) {
      for (let col = 0; col < this.dimension; col++) {
        switch (direction) {
          case RotateDirection.clockwise:
            newContent[col][this.dimension - 1 - row] = this.content[row][col];
            break;
          case RotateDirection.anticlockwise:
            newContent[row][col] = this.content[col][this.dimension - 1 - row];
        }
      }
    }

    this.content = newContent;
  }

  getEdge(edge: Edge): number[] {
    switch (edge) {
      case Edge.left:
        return Array.from(
          { length: this.dimension },
          (_, i) => this.content[i][0]
        );
      case Edge.right:
        return Array.from(
          { length: this.dimension },
          (_, i) => this.content[i][this.dimension - 1]
        );
      case Edge.top:
        return Array.from(
          { length: this.dimension },
          (_, i) => this.content[0][i]
        );
      case Edge.bottom:
        return Array.from(
          { length: this.dimension },
          (_, i) => this.content[this.dimension - 1][i]
        );
    }
  }

  static of(input: string): Side {
    const content: number[][] = input
      .split("\n")
      .map((r) => r.trim())
      .map((r) => r.split("").map((s) => parseInt(s, 10)));

    const dimension = content.length;
    content.forEach((c) => {
      if (c.length !== dimension) {
        throw new Error(
          `Invalid dimension, expected ${dimension}, but this row has ${c.length}`
        );
      }
    });

    return new Side(content);
  }
}

export default Side;
