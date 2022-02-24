import React from "react";

import { ControlledInput } from "../../../../types";
import {
  signed16bitBinary,
  denaryInteger,
  signed16bitHex,
} from "@comp-sci-maths/lib";
import { INumberBase } from "@comp-sci-maths/lib/dist/dataRepresentation/numberBases/types";

const NUMBER_BASES: INumberBase[] = [
  denaryInteger,
  signed16bitBinary,
  signed16bitHex,
];

interface Props extends ControlledInput<INumberBase> {
  className?: string;
}

const NumberBasePicker: React.FunctionComponent<Props> = ({
  value,
  onChange,
  className,
}) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) => {
      const found = NUMBER_BASES.find(({ name }) => name === value);
      if (found !== undefined) {
        onChange(found);
      }
    },
    [onChange]
  );

  React.useEffect(() => onChange(NUMBER_BASES[0]), [onChange]);

  return (
    <select
      className={className}
      onChange={onSelectChange}
      value={value && value.name}
    >
      <option />
      {NUMBER_BASES.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};

interface UsePicker {
  numberBase: INumberBase;
  componentProps: Props;
}

export const usePicker = (className?: string): UsePicker => {
  const [value, onChange] = React.useState<INumberBase>(NUMBER_BASES[0]);

  return {
    numberBase: value,
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

export default NumberBasePicker;
