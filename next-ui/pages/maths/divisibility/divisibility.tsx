import { FC, useState, useCallback } from "react";
import DivisibilityRulePicker, {
  useDivisibilityRulePicker,
} from "components/maths/divisibility/divisibility-rule-picker";
import useDivisibilityRule from "components/maths/divisibility/use-divisibility-rule";

const Divisibility: FC = () => {
  const { divisibilityRule, componentProps: rulePickerProps } =
    useDivisibilityRulePicker("form-control");
  const [value, setValue] = useState<number>(10);

  const onValueChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: { value } }) => setValue(parseInt(value)),
    [setValue]
  );

  const { isDivisible, logLines } = useDivisibilityRule({
    divisibilityRule,
    value,
  });

  return (
    <div>
      <form>
        <div className="form-group">
          <label>Factor</label>
          <DivisibilityRulePicker {...rulePickerProps} />
        </div>
        <div className="form-group">
          <label>Value</label>
          <input
            className="form-control"
            type="number"
            value={value}
            onChange={onValueChange}
          />
        </div>
      </form>

      <div>
        <h3>Rule</h3>
        <ul>
          {divisibilityRule.explanation.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>
      <div>Is Divisible? {isDivisible ? "Yes" : "No"}</div>

      <div>
        {logLines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
};

export default Divisibility;
