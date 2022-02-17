import React from "react";
import { ControlledInput } from "../../../types";
import { ArithemeticOperation, operations } from "./arithmeticOperations";

interface Props extends ControlledInput<ArithemeticOperation> {
  className?: string;
}

const ArithmeticOperationPicker: React.FunctionComponent<Props> = ({
  onChange,
  value,
  className,
}) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) =>
      onChange(operations.find(({ name }) => name === value) || operations[0]),
    [onChange]
  );

  React.useEffect(() => onChange(operations[0]), [onChange]);

  return (
    <select
      className={className}
      onChange={onSelectChange}
      value={value && value.name}
    >
      <option />
      {operations.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};

interface UsePicker {
  operation: ArithemeticOperation;
  componentProps: Props;
}

export const usePicker = (className?: string): UsePicker => {
  const [value, onChange] = React.useState<ArithemeticOperation>(operations[0]);

  return {
    operation: value,
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

export default ArithmeticOperationPicker;
