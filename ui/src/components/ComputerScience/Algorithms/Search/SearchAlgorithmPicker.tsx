import React from "react";

import algorithms from "@comp-sci-maths/lib/dist/algorithms/search";
import { NamedSearch } from "@comp-sci-maths/lib/dist/types";
import { ControlledInput } from "../../../../types";

interface Props extends ControlledInput<NamedSearch | undefined> {
  className?: string;
}

const SearchAlgorithmPicker: React.FunctionComponent<Props> = ({
  value,
  onChange,
  className,
}) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) =>
      onChange(algorithms.find(({ name }) => name === value)),
    [onChange]
  );

  React.useEffect(() => onChange(algorithms[0]), [onChange]);

  return (
    <select
      className={className}
      onChange={onSelectChange}
      value={value && value.name}
    >
      <option />
      {algorithms.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};

interface UsePicker {
  algorithm: NamedSearch | undefined;
  componentProps: Props;
}

export const usePicker = (className?: string): UsePicker => {
  const [value, onChange] = React.useState<NamedSearch | undefined>(undefined);

  return {
    algorithm: value,
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

export default SearchAlgorithmPicker;
