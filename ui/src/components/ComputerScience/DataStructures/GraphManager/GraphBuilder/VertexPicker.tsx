import React from "react";
import { Graph } from "@comp-sci-maths/lib/dist/dataStructures/graph/graphReducer";

export interface Props {
  className?: string;
  graph: Graph<string>;
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
  graph: Graph<string>,
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
