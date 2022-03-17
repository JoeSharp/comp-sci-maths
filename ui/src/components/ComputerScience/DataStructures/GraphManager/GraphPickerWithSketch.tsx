import React from "react";
import useSavedGraph, { UseSavedGraph } from "./useSavedGraph";
import graphReducer, { GraphAction, Graph } from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";
import useSketch, { UseSketch } from "../../../p5/useSketch";
import GraphSketch from "../../../ComputerScience/DataStructures/GraphManager/GraphSketch";
import { GraphSketchConfig } from "./GraphBuilder/types";
import { PositionByVertex } from "./types";
import cannedGraphs from "./cannedGraphs";

interface Props {
  names: string[];
  value?: string;
  onSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
  refContainer: any;
}

const GraphPickerWithSketch: React.FunctionComponent<Props> = ({
  names,
  value,
  onSelectChange,
  refContainer,
}) => (
  <React.Fragment>
    <div className="form-group">
      <label>Graph</label>
      <select className="form-control" value={value} onChange={onSelectChange}>
        {names.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>

    <div className="sketch mt-3" ref={refContainer} />
  </React.Fragment>
);

interface UsePicker {
  graphName: string;
  graph: Graph<string>;
  graphDispatch: (action: GraphAction<string>) => void;
  vertexPositions: PositionByVertex;
  componentProps: Props;
  onValueChange: (name: string) => void;
  savedGraphUse: UseSavedGraph;
  sketchUse: UseSketch<
    GraphSketchConfig,
    GraphSketch
  >;
}

const wrappedGraphReducer = (graph: Graph<string>, action: GraphAction<string>): Graph<string> => {
  return graphReducer(graph, action);
}

export const usePicker = (
  defaultGraphName: keyof typeof cannedGraphs
): UsePicker => {
  const savedGraphUse = useSavedGraph();
  const { names, graphs, vertexPositionsByGraph } = savedGraphUse;

  const [graph, graphDispatch] = React.useReducer(wrappedGraphReducer, graphs[defaultGraphName]);

  const [graphName, setGraphName] = React.useState<string>(defaultGraphName);
  const [vertexPositions, setVertexPositions] = React.useState<
    PositionByVertex
  >({});

  const onChange = React.useCallback(
    (name: string, graph: Graph<string>) => {
      graphDispatch({ type: 'replace', newState: graph });
      setGraphName(name);
      setVertexPositions(vertexPositionsByGraph[name]);
    },
    [graphDispatch, vertexPositionsByGraph, setVertexPositions]
  );

  const [value, setValue] = React.useState<string>();

  const onValueChange = React.useCallback(
    (name: string) => {
      onChange(name, graphs[name]);
      setValue(name);
    },
    [onChange, graphs]
  );

  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => {
      onValueChange(value);
    },
    [onValueChange]
  );

  // This needs to re-initialise the positions, graph name etc on startup
  React.useEffect(() => {
    if (defaultGraphName === graphName) {
      onChange(defaultGraphName, graphs[defaultGraphName]);
      setValue(defaultGraphName);
    }
  }, [defaultGraphName, graphName, graphs, onChange, setValue]);

  const sketchUse = useSketch<
    GraphSketchConfig,
    GraphSketch
  >(GraphSketch);

  const { updateConfig, refContainer } = sketchUse;

  React.useEffect(() => updateConfig({ graph, vertexPositions }), [
    graph,
    vertexPositions,
    updateConfig,
  ]);

  return {
    graphName,
    graph,
    graphDispatch,
    vertexPositions,
    savedGraphUse,
    onValueChange,
    componentProps: { onSelectChange, value, names, refContainer },
    sketchUse,
  };
};

export default GraphPickerWithSketch;
