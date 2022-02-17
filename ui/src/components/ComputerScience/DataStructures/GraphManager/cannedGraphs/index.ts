import simpleStringGraph, {
  vertexPositions as simpleStringGraphVertexPositions,
} from "./simpleStringGraph";
import largerStringGraph, {
  vertexPositions as largerStringGraphVertexPositions,
} from "./largerStringGraph";
import complexStringGraph, {
  vertexPositions as complexStringGraphVertexPositions,
} from "./complexStringGraph";
import motorwayCrossingGraph, {
  vertexPositions as motorwayCrossingGraphVertexPositions,
} from "./motorwayCrossingGraph";

export const graphs = {
  motorwayCrossingGraph,
  simpleStringGraph,
  largerStringGraph,
  complexStringGraph,
};
export const vertexPositionsByGraphName = {
  simpleStringGraph: simpleStringGraphVertexPositions,
  largerStringGraph: largerStringGraphVertexPositions,
  complexStringGraph: complexStringGraphVertexPositions,
  motorwayCrossingGraph: motorwayCrossingGraphVertexPositions,
};

export default graphs;