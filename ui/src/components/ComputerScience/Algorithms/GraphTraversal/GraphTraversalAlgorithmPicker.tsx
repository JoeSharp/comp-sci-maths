import React from "react";

import { ControlledInput } from "../../../../types";
import { graphTraversalAlgorithms, BREADTH_FIRST_SEARCH } from "./common";

interface Props extends ControlledInput<string> {
  className?: string;
}

const GraphTraversalAlgorithmPicker: React.FunctionComponent<Props> = ({
  value,
  onChange,
  className,
}) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => onChange(value),
    [onChange]
  );

  React.useEffect(() => onChange(BREADTH_FIRST_SEARCH), [onChange]);

  return (
    <select className={className} onChange={onSelectChange} value={value}>
      <option />
      {graphTraversalAlgorithms.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

interface UsePicker {
  algorithmName: string;
  componentProps: Props;
}

export const usePicker = (className?: string): UsePicker => {
  const [value, onChange] = React.useState<string>(BREADTH_FIRST_SEARCH);

  return {
    algorithmName: value,
    componentProps: React.useMemo(
      () => ({
        className,
        value,
        onChange,
      }),
      [className, value, onChange]
    ),
  };
};

export default GraphTraversalAlgorithmPicker;
