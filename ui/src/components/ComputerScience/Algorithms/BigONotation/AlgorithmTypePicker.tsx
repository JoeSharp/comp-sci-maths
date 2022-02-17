import React from "react";

import { ControlledInput } from "../../../../types";

export type AlgorithmType = "search" | "sort";

const ALGORITHM_TYPES: AlgorithmType[] = ["search", "sort"];

interface Props extends ControlledInput<AlgorithmType> {
  className?: string;
}

const AlgorithmTypePicker: React.FunctionComponent<Props> = ({
  value,
  onChange,
  className,
}) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) =>
      onChange(ALGORITHM_TYPES.find((a) => a === value) || "search"),
    [onChange]
  );

  React.useEffect(() => onChange(ALGORITHM_TYPES[0]), [onChange]);

  return (
    <select className={className} onChange={onSelectChange} value={value}>
      <option />
      {ALGORITHM_TYPES.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

interface UsePicker {
  componentProps: Props;
}

export const usePicker = (className?: string): UsePicker => {
  const [value, onChange] = React.useState<AlgorithmType>(ALGORITHM_TYPES[0]);

  return {
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

export default AlgorithmTypePicker;
