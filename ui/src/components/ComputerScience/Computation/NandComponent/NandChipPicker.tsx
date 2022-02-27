import React from "react";
import { ControlledInput } from "../../../../types";
import { chipFactory } from "@comp-sci-maths/lib/dist";

interface Props extends ControlledInput<string> {
  className?: string;
}

const NandChipPicker: React.FunctionComponent<Props> = ({
  className,
  value,
  onChange,
}) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value: name } }) => {
      onChange(name);
    },
    [onChange]
  );

  return (
    <select className={className} onChange={onSelectChange} value={value}>
      <option />
      {Object.keys(chipFactory).map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};

interface UsePicker {
  chipName: string;
  componentProps: Props;
}

export const usePicker = (className?: string): UsePicker => {
  const [value, onChange] = React.useState<string>(Object.keys(chipFactory)[0]);

  return {
    chipName: value,
    componentProps: {
      className,
      value,
      onChange,
    },
  };
};

export default NandChipPicker;
