import {
  useCallback,
  useMemo,
  useState,
  useEffect,
  FC,
  ChangeEventHandler,
} from "react";

import {
  divisibilityRules,
  defaultNamedDivisibilityRule,
} from "@comp-sci-maths/lib/dist/maths/primeNumbers/divisibilityRules";
import { ControlledInput } from "components/controlledInput";
import { NamedDivisibilityRule } from "@comp-sci-maths/lib/dist/types";

interface Props extends ControlledInput<NamedDivisibilityRule> {
  className?: string;
}

const DivisibilityRulePicker: FC<Props> = ({ value, onChange, className }) => {
  const onSelectChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    ({ target: { value } }) =>
      onChange(
        divisibilityRules.find(({ factor }) => factor.toString(10) === value) ||
          defaultNamedDivisibilityRule
      ),
    [onChange]
  );

  useEffect(() => onChange(divisibilityRules[0]), [onChange]);

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
  const [value, onChange] = useState<NamedDivisibilityRule | undefined>(
    undefined
  );

  return {
    divisibilityRule: value || defaultNamedDivisibilityRule,
    componentProps: useMemo(
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
