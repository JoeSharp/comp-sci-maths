import React from "react";

import {
  divisibilityRules,
  defaultNamedDivisibilityRule,
} from "@comp-sci-maths/lib/dist/algorithms/primeNumbers/divisibilityRules";
import { ControlledInput } from "../../../types";
import { NamedDivisibilityRule } from "@comp-sci-maths/lib/dist/types";

interface Props extends ControlledInput<NamedDivisibilityRule> {
  className?: string;
}

const DivisibilityRulePicker: React.FunctionComponent<Props> = ({
  value,
  onChange,
  className,
}) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) =>
      onChange(
        divisibilityRules.find(({ factor }) => factor.toString(10) === value) ||
        defaultNamedDivisibilityRule
      ),
    [onChange]
  );

  React.useEffect(() => onChange(divisibilityRules[0]), [onChange]);

  return (
    <select
      className={className}
      onChange={onSelectChange}
      value={value && value.factor}
    >
      <option />
      {divisibilityRules.map(({ factor }) => (
        <option key={factor} value={factor}>
          {factor}
        </option>
      ))}
    </select>
  );
};

interface UsePicker {
  divisibilityRule: NamedDivisibilityRule;
  componentProps: Props;
}

export const useDivisibilityRulePicker = (className?: string): UsePicker => {
  const [value, onChange] = React.useState<NamedDivisibilityRule | undefined>(
    undefined
  );

  return {
    divisibilityRule: value || defaultNamedDivisibilityRule,
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

export default DivisibilityRulePicker;
