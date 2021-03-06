import { AbstractSketch } from "../../../../p5/useSketch";
import graphApi, { Graph } from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";
import p5 from "p5";
import { createP5Vector, pointToStr } from "./useGridGraph";
import DataItemBoid from "../../../../p5/Boid/DataItemBoid";
import { Point } from "../../../../p5/Boid/types";

interface Config {
  sourceNode: string;
  destinationNode: string;
  graph: Graph<Point>;
  path: string[];
  toggleConnection: (vertex: Point) => void;
}

const getDefaultConfig = (): Config => ({
  graph: graphApi.createInitialState(),
  sourceNode: "",
  destinationNode: "",
  path: [],
  toggleConnection: () => { },
});

const WIDTH = 800;
const HEIGHT = 500;
const SPREAD = 50;

class GridSketch extends AbstractSketch<Config> {
  boids: {
    [id: string]: DataItemBoid<Point>;
  };
  boidsInSketch: DataItemBoid<Point>[];
  edgesInSketch: { from: DataItemBoid<Point>, to: DataItemBoid<Point>, weight: number }[]

  constructor() {
    super(getDefaultConfig());
    this.boids = {};
    this.boidsInSketch = [];
    this.edgesInSketch = [];
  }

  setConfig(config: Config): void {
    super.setConfig(config);

    const {
      graph,
      sourceNode,
      destinationNode,
      path,
    } = this.config;

    // Finding boids on the path
    const { vertices, edges } = graph;

    this.boidsInSketch = vertices.map((v) => {
      const vertex = graphApi.getVertexValue(graph, v);
      const boid = this.getOrCreateBoid(vertex);

      if (v === sourceNode) {
        boid.colour = "lime";
      } else if (v === destinationNode) {
        boid.colour = "red";
      } else if (path.find((p) => p === v) !== undefined) {
        boid.colour = "cyan";
      } else {
        boid.colour = "black";
      }
      return boid;
    });

    this.edgesInSketch = edges
      .filter(
        ({ from, to }) =>
          vertices.includes(from) &&
          vertices.includes(to)
      )
      .map(({ from, to, ...rest }) => ({
        from: graphApi.getVertexValue(graph, from),
        to: graphApi.getVertexValue(graph, to),
        ...rest
      }))
      .map(({ from, to, weight }) => ({
        from: this.getOrCreateBoid(from),
        to: this.getOrCreateBoid(to),
        weight,
      }));
  }

  getBoid(vertex: string): DataItemBoid<Point> | undefined {
    return this.boids[vertex];
  }

  getOrCreateBoid(point: Point) {
    const pointS = pointToStr(point);
    if (!this.boids[pointS]) {
      this.boids[pointS] = new DataItemBoid<Point>({
        entity: point,
        label: pointS,
        radius: 20,
        position: createP5Vector((point.x + 1) * SPREAD, (point.y + 1) * SPREAD),
      });
    }
    return this.boids[pointS];
  }

  sketch(s: p5) {
    const that = this;

    s.setup = function () {
      s.createCanvas(WIDTH, HEIGHT);
      s.colorMode(s.HSB, 255);
      s.textFont("Helvetica", 10);
      s.textAlign(s.CENTER, s.CENTER);
    };

    s.mouseClicked = function () {
      const mousePosition = s.createVector(s.mouseX, s.mouseY);
      const boid = Object.values(that.boids).find((boid) =>
        boid.isMouseOver(mousePosition)
      );
      if (boid !== undefined) {
        that.config.toggleConnection(boid.entity);
      }
    };

    s.draw = function () {
      s.background(230);
      s.push();

      const {
        path,
      } = that.config;

      // Draw the lines for all connections
      s.stroke("black");
      s.strokeWeight(4);
      that.edgesInSketch
        .forEach(
          ({
            from: {
              position: { x: xFrom, y: yFrom },
            },
            to: {
              position: { x: xTo, y: yTo },
            },
          }) => {
            s.line(xFrom, yFrom, xTo, yTo);
          }
        );

      // Draw the lines on our route
      s.stroke("cyan");
      s.strokeWeight(4);
      for (let i = 0; i < path.length - 1; i++) {
        const from = that.getBoid(path[i]);
        const to = that.getBoid(path[i + 1]);
        if (!!from && !!to) {
          s.line(from.position.x, from.position.y, to.position.x, to.position.y);
        }
      }

      /// Call upon all boids to draw themselves
      that.boidsInSketch.forEach((b) => b.draw(s));
    };
  };
}

export default GridSketch;
