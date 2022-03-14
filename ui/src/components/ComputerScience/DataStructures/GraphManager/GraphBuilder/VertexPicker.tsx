import React from "react";
import { GraphState } from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";
import { DisplayDataItem } from "../../../../p5/Boid/types";

export interface Props {
  className?: string;
  graph: GraphState<string>;
  value: string | undefined;
  onChange: (v: string | undefined) => void;
}

const VertexPicker = ({
  graph,
  value,
  onChange,
  className,
}: Props) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => {
      onChange(value);
    },
    [onChange]
  );

  React.useEffect(() => {
    if (graph.vertices.length > 0) {
      onChange(graph.vertices[0]);
    }
  }, [graph, onChange]);

  return (
    <select className={className} onChange={onSelectChange} value={value}>
      {graph.vertices.map((vertex) => (
        <option key={vertex} value={vertex}>
          {vertex}
        </option>
      ))}
    </select>
  );
};

interface UsePicker {
  vertex: string | undefined;
  componentProps: Props;
}

export const usePicker = (
  graph: GraphState<string>,
  className?: string
): UsePicker => {
  const [value, onChange] = React.useState<string | undefined>(undefined);

  const vertex = React.useMemo(
    () => graph.vertices.find((v) => v === value),
    [value, graph]
  );

  return {
    vertex,
    componentProps: React.useMemo(
      () => ({
        graph,
        className,
        value,
        onChange,
      }),
      [graph, className, value, onChange]
    ),
  };
};

export default VertexPicker;
