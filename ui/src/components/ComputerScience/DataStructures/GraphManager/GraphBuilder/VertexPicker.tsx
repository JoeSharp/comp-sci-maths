import React from "react";
import Graph from "@comp-sci-maths/lib/dist/dataStructures/graph/Graph";
import { DisplayDataItem } from "../../../../p5/Boid/types";

export interface Props<DATA_ITEM extends DisplayDataItem<any>> {
  className?: string;
  graph: Graph<DATA_ITEM>;
  value: string | undefined;
  onChange: (v: string | undefined) => void;
}

const VertexPicker = <DATA_ITEM extends DisplayDataItem<any>>({
  graph,
  value,
  onChange,
  className,
}: Props<DATA_ITEM>) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => {
      onChange(value);
    },
    [onChange]
  );

  React.useEffect(() => {
    if (graph.vertices.length > 0) {
      onChange(graph.vertices[0].key);
    }
  }, [graph, onChange]);

  return (
    <select className={className} onChange={onSelectChange} value={value}>
      {graph.vertices.map((vertex) => (
        <option key={vertex.key} value={vertex.key}>
          {vertex.label}
        </option>
      ))}
    </select>
  );
};

interface UsePicker<DATA_ITEM extends DisplayDataItem<any>> {
  vertex: DATA_ITEM | undefined;
  componentProps: Props<DATA_ITEM>;
}

export const usePicker = <DATA_ITEM extends DisplayDataItem<any>>(
  graph: Graph<DATA_ITEM>,
  className?: string
): UsePicker<DATA_ITEM> => {
  const [value, onChange] = React.useState<string | undefined>(undefined);

  const vertex = React.useMemo(
    () => graph.vertices.find((v) => v.key === value),
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
