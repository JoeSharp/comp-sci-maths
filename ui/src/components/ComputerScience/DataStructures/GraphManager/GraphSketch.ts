import p5 from "p5";
import { AbstractSketch } from "../../../p5/useSketch";
import { createInitialState } from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";

import { GraphSketchConfig } from "./GraphBuilder/types";
import DataItemBoid from "../../../p5/Boid/DataItemBoid";
import { createP5Vector } from "../../Algorithms/Routing/GridRouting/useGridGraph";

const WIDTH = 500;
const HEIGHT = 300;

const getDefaultConfig = (): GraphSketchConfig => ({
  graph: createInitialState(),
  vertexPositions: {},
  physicsEnabled: false,
});

class GraphSketch extends AbstractSketch<GraphSketchConfig> {
  boids: {
    [id: string]: DataItemBoid<string>;
  };

  colours: {
    [id: string]: string;
  };
  borderWeights: {
    [id: string]: number;
  };
  borderColours: {
    [id: string]: string;
  };

  constructor() {
    super(getDefaultConfig());
    this.boids = {};
    this.colours = {};
    this.borderWeights = {};
    this.borderColours = {};
  }

  setColour(vertex: string, colour: string) {
    this.colours[vertex] = colour;
  }

  setBorderColour(vertex: string, borderColour: string) {
    this.borderColours[vertex] = borderColour;
  }

  setBorderWeight(vertex: string, borderWeight: number) {
    this.borderWeights[vertex] = borderWeight;
  }

  getBoid(vertex: string): DataItemBoid<string> | undefined {
    return this.boids[vertex];
  }

  getOrCreateBoid(s: p5, vertex: string): DataItemBoid<string> {
    let boid = this.boids[vertex];
    if (!boid) {
      let storedPosition = (this.config.vertexPositions || {})[vertex] || {
        x: s.random(0, s.width),
        y: s.random(0, s.height),
      };

      boid = new DataItemBoid<string>({
        entity: vertex,
        label: vertex,
        radius: !!s ? s.width / 12 : 5,
        position: !!s
          ? s.createVector(storedPosition.x, storedPosition.y)
          : createP5Vector(0, 0),
      });
      this.boids[vertex] = boid;
    }

    boid.colour = this.colours[vertex] || "red";
    boid.borderWeight = this.borderWeights[vertex] || 1;
    boid.borderColour = this.borderColours[vertex] || "black";

    return boid;
  }

  sketch(s: p5) {
    const that = this;
    let screenCentre: p5.Vector;

    s.setup = function () {
      s.createCanvas(WIDTH, HEIGHT);
      s.colorMode(s.HSB, 255);
      s.textAlign(s.CENTER, s.CENTER);
      screenCentre = s.createVector(s.width / 2, s.height / 2);
    };

    s.mousePressed = function () {
      const mousePosition = s.createVector(s.mouseX, s.mouseY);
      const boid = Object.values(that.boids).find((boid) =>
        boid.isMouseOver(mousePosition)
      );
      if (boid !== undefined) {
        boid.grab();
      }
    };

    s.mouseDragged = function () {
      const mousePosition = s.createVector(s.mouseX, s.mouseY);
      Object.values(that.boids).forEach((boid) => boid.dragged(mousePosition));
    };

    s.mouseReleased = function () {
      Object.values(that.boids).forEach((boid) => boid.releaseGrab());
    };

    s.draw = function () {
      s.background("skyblue");
      s.fill("blue");

      const {
        graph: { vertices, edges },
        physicsEnabled,
      } = that.config;

      // Get the list of boids in this sketch based on the vertex IDs
      const boidsInSketch: DataItemBoid<string>[] = vertices.map((v) =>
        that.getOrCreateBoid(s, v)
      );
      const boidIdsInSketch: string[] = vertices;

      // Get the list of boid edges
      const boidEdges = edges
        .filter(
          ({ from, to }) =>
            boidIdsInSketch.includes(from) &&
            boidIdsInSketch.includes(to)
        )
        .map(({ from, to, weight }) => ({
          from: that.getOrCreateBoid(s, from),
          to: that.getOrCreateBoid(s, to),
          weight,
        }));

      if (physicsEnabled) {
        // Attract any boids that are very near the edge to the centre
        boidsInSketch
          .filter(({ position: { x, y } }) => {
            return (
              x < s.width / 8 ||
              x > (s.width * 7) / 8 ||
              y < s.height / 8 ||
              y > (s.height * 7) / 8
            );
          })
          .forEach((b) => b.seek(screenCentre));

        // They should all repel each other
        boidsInSketch.forEach((ba, ia) => {
          boidsInSketch
            .filter((_, ib) => ia !== ib)
            .forEach((bb) => ba.flee(bb.position, s.width / 4));
        });

        // Apply force of a spring between connected boids
        boidEdges.forEach(({ from, to }) => {
          from.spring(to.position, s.width / 8, s.width / 32);
          to.spring(from.position, s.width / 8, s.width / 32);
        });

        // Call upon all boids to update themselves
        boidsInSketch.forEach((b) => b.update(s));
      }

      // Draw the lines
      boidEdges.forEach(({ from, to, weight }) => {
        s.strokeWeight(4);
        s.line(from.position.x, from.position.y, to.position.x, to.position.y);
        let midpoint: p5.Vector = (p5.Vector.lerp(
          from.position,
          to.position,
          0.5
        ) as unknown) as p5.Vector; // error in p5 type definition

        s.strokeWeight(1);
        s.fill("white");
        s.circle(midpoint.x, midpoint.y, from.radius / 2);
        s.fill("black");
        s.textFont("Helvetica", 14);
        s.textAlign(s.CENTER, s.CENTER);
        s.text(`${weight}`, midpoint.x, midpoint.y);
      });

      /// Call upon all boids to draw themselves
      s.textFont("Helvetica", 20);
      boidsInSketch.forEach((b) => b.draw(s));
    };
  };
}

export default GraphSketch;
