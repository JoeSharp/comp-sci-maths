import { getStringVertex } from "common";
import { StringGraphVertex } from "types";
import Graph from "./Graph";

/**
 * A simple wrapper around the fully capable Graph class which just allows strings to be related, using bi-directional links
 */
export default class SimpleGraph extends Graph<StringGraphVertex> {
  verticesByValue: {
    [k: string]: StringGraphVertex;
  };

  constructor() {
    super();
    this.verticesByValue = {};
  }

  getVertex(vertex: string) {
    if (!this.verticesByValue[vertex]) {
      this.verticesByValue[vertex] = getStringVertex(vertex);
    }

    return this.verticesByValue[vertex];
  }

  addLink(from: string, to: string, weight: number = 1.0): this {
    this.addBiDirectionalEdge(this.getVertex(from), this.getVertex(to), weight);
    return this;
  }

  getConnectedVertices(from: string): string[] {
    return this.getOutgoing(from)
      .map((x) => x.to)
      .map((x) => x.value);
  }
}
