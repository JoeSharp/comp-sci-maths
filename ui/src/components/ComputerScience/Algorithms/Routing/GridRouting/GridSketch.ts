import { AbstractSketch } from "../../../../p5/useSketch";
import graphApi, { Graph } from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";
import p5 from "p5";
import { pointToStr } from "./useGridGraph";
import DataItemBoid from "../../../../p5/Boid/DataItemBoid";
import { Point } from "../../../../p5/Boid/types";

interface Config {
  sourceNode: Point;
  destinationNode: Point;
  graph: Graph<Point>;
  path: Point[];
  toggleConnection: (vertex: Point) => void;
}

const getDefaultConfig = (): Config => ({
  graph: graphApi.createInitialState(),
  sourceNode: { x: 0, y: 0 },
  destinationNode: { x: 0, y: 0 },
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

  constructor() {
    super(getDefaultConfig());
    this.boids = {};
  }

  getBoid(vertex: string): DataItemBoid<Point> | undefined {
    return this.boids[vertex];
  }

  getOrCreateBoid(sketch: p5, point: Point) {
    const pointS = pointToStr(point);
    if (!this.boids[pointS]) {
      this.boids[pointS] = new DataItemBoid<Point>({
        entity: point,
        label: pointS,
        radius: 20,
        position: sketch.createVector(
          (point.x + 1) * SPREAD,
          (point.y + 1) * SPREAD
        ),
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
        graph,
        sourceNode,
        destinationNode,
        path,
      } = that.config;

      const { vertices, edges } = graph;

      let boidsInSketch: DataItemBoid<Point>[] = vertices.map((v) => {
        const vertex = graphApi.getVertexValue(graph, v);
        const boid = that.getOrCreateBoid(s, vertex);
        if (v === pointToStr(sourceNode)) {
          boid.colour = "lime";
        } else if (v === pointToStr(destinationNode)) {
          boid.colour = "red";
        } else if (path.find((p) => pointToStr(p) === v) !== undefined) {
          boid.colour = "cyan";
        } else {
          boid.colour = "black";
        }
        return boid;
      });

      // Draw the lines for all connections
      s.stroke("black");
      s.strokeWeight(4);
      edges
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
          from: that.getOrCreateBoid(s, from),
          to: that.getOrCreateBoid(s, to),
          weight,
        }))
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
        const from = that.getOrCreateBoid(s, path[i]);
        const to = that.getOrCreateBoid(s, path[i + 1]);
        s.line(from.position.x, from.position.y, to.position.x, to.position.y);
      }

      /// Call upon all boids to draw themselves
      boidsInSketch.forEach((b) => b.draw(s));
    };
  };
}

export default GridSketch;
