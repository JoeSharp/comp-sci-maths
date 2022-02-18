import { Optional, AnyGraphVertex } from "../../types";
import { ObservableVersioned } from "../../common";

/**
 * This class encapsulates a weighted directional graph.
 * Each Edge is stored as a separate object in an array
 */
export interface Edge<VERTEX extends AnyGraphVertex> {
  from: VERTEX;
  to: VERTEX;
  weight: number;
}

export default class Graph<
  VERTEX extends AnyGraphVertex
  > extends ObservableVersioned {
  vertices: VERTEX[];
  edges: Edge<VERTEX>[];

  /**
   * A constructor that accepts existing graph details.
   * Allows it to be used as a copy constructor.
   *
   * @param graphData Existing graph data
   * @param areVerticesEqual Function to determine if two vertices are equal
   */
  constructor() {
    super();
    this.vertices = [];
    this.edges = [];
  }

  areVerticesEqual(a: VERTEX, b: VERTEX): boolean {
    return a.key === b.key;
  }

  /**
   * Clear any vertices and edges
   * @returns This to allow method chaining
   */
  clearAll(): this {
    this.vertices = [];
    this.edges = [];
    this.tickVersion();
    return this;
  }

  /**
   * Remove all edges to and from a given vertex, leave the vertex on the graph though
   * @param vertex The vertex to disconnect
   */
  disconnectVertex(vertex: VERTEX): this {
    this.removeVertex(vertex);
    this.addVertex(vertex);
    return this;
  }

  /**
   * Register the existence of a vertex,
   * this might be done to represent disconnected vertexs,
   * or to simply prepare the list of vertexs before edges are known.
   *
   * @param vertex The vertex to add
   * @returns this, to allow method chaining
   */
  addVertex(vertex: VERTEX): this {
    this.vertices = [
      ...this.vertices.filter(v => !this.areVerticesEqual(v, vertex)),
      vertex
    ];
    this.tickVersion();
    return this;
  }

  /**
   *
   * @param key The string representation of the vertex to search for
   */
  getVertex(key: string): Optional<VERTEX> {
    return this.vertices.find((v) => v.key === key);
  }

  /**
   * Remove the existence of a vertex,
   * will also remove any edges from/to the given vertex.
   * @param vertex The vertex to remove
   */
  removeVertex(vertex: VERTEX): this {
    this.vertices = this.vertices.filter(
      (v) => !this.areVerticesEqual(v, vertex)
    );
    this.edges = this.edges.filter(
      ({ from, to }) =>
        !(
          this.areVerticesEqual(from, vertex) ||
          this.areVerticesEqual(to, vertex)
        )
    );
    this.tickVersion();

    return this;
  }

  /**
   *
   * @param from The source vertex
   * @param to The destination vertex
   */
  removeEdge(from: VERTEX, to: VERTEX): this {
    this.edges = this.edges.filter(
      (l) =>
        !(
          this.areVerticesEqual(l.from, from) && this.areVerticesEqual(l.to, to)
        )
    );
    this.tickVersion();
    return this;
  }

  /**
   * Add a new Edge to the graph, one direction only
   * @param {string} from The source vertex
   * @param {string} to The destination vertex
   * @param {number} weight The weighting to attach
   * @returns this to allow method chaining
   */
  addUnidirectionalEdge(from: VERTEX, to: VERTEX, weight: number = 1.0): this {
    this.addVertex(from);
    this.addVertex(to);
    this.edges = [
      ...this.edges.filter(
        (l) =>
          !(
            this.areVerticesEqual(l.from, from) &&
            this.areVerticesEqual(l.to, to)
          )
      ), // filter any existing Edge in this direction
      { from, to, weight },
    ];
    this.tickVersion();
    return this;
  }

  /**
   * Add a new Edge to the graph, add both directions
   * @param {string} from The source vertex
   * @param {string} to The destination vertex
   * @param {number} weight The weighting to attach
   * @returns this to allow method chaining
   */
  addBiDirectionalEdge(from: VERTEX, to: VERTEX, weight: number = 1.0): this {
    this.addVertex(from);
    this.addVertex(to);

    this.edges = [
      ...this.edges.filter(
        (l) =>
          !(
            (this.areVerticesEqual(l.from, from) &&
              this.areVerticesEqual(l.to, to)) ||
            (this.areVerticesEqual(l.from, to) &&
              this.areVerticesEqual(l.to, from))
          )
      ), // filter any existing Edge in both directions
      { from, to, weight },
      { from: to, to: from, weight }, // add the other direction
    ];
    this.tickVersion();

    return this;
  }

  /**
   * Find a Edge between a specific source and destination vertex.
   * @param from The source vertex
   * @param to The destination vertex
   * @returns The Edge if one exists
   */
  getEdge(from: VERTEX, to: VERTEX): Optional<Edge<VERTEX>> {
    return this.edges.find(
      (l) =>
        this.areVerticesEqual(l.from, from) && this.areVerticesEqual(l.to, to)
    );
  }

  /**
   * Access edges coming into a specific vertex
   * @param vertex The from vertex
   */
  getIncoming(toKey: string): Edge<VERTEX>[] {
    return this.edges.filter((l) => l.to.key === toKey);
  }

  /**
   * Access the edges from a specific vertex
   * @param {string} vertex The from vertex
   */
  getOutgoing(fromKey: string): Edge<VERTEX>[] {
    return this.edges.filter((l) => l.from.key === fromKey);
  }

  /**
   * This function will look for a Edge between the two vertexs (in that specific direction)
   * It will return the weight of the Edge between the two.
   * If there is no Edge, it will return Infinity.
   *
   * @param {string} from The source vertex
   * @param {string} to The destination vertex
   * @return The weight of the Edge, or Infinity if there is no Edge.
   */
  getEdgeWeight(from: VERTEX, to: VERTEX): number {
    const edge = this.getEdge(from, to);
    return !!edge ? edge.weight : Infinity;
  }

  /**
   * Represent the graph as a string, it will use tabs and newlines to space things out.
   */
  toString() {
    return `Graph\n${[...this.vertices]
      .map((vertex) => ({
        from: vertex,
        edges: this.getOutgoing(vertex.key),
      })) // make the entries into a nicer looking object
      .map(
        ({ from, edges }) =>
          `From: ${from.key}\n${edges
            .map(({ to, weight }) => `\tTo: ${to.key} (${weight})`)
            .join("\n")}` // each outgoing Edge should be represented on it's own line
      )
      .join("\n")}`; // Each section will be separated by a newline
  }
}
