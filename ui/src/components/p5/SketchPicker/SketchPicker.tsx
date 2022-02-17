import React from "react";

import { ControlledInput } from "../../../types";

interface Props extends ControlledInput<string> {
  sketchNames: string[];
  className?: string;
}

const SketchPicker: React.FunctionComponent<Props> = ({
  sketchNames,
  value,
  onChange,
  className,
}: Props) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => onChange(value),
    [onChange]
  );

  return (
    <select className={className} onChange={onSelectChange} value={value}>
      <option />
      {sketchNames.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
};

export default SketchPicker;
