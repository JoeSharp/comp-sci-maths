import React from "react";

import DivisibilityRulePicker, {
  useDivisibilityRulePicker,
} from "./DivisibilityRulePicker";
import useDivisibilityRule from "./useDivisibilityRule";

const Divisibility: React.FunctionComponent = () => {
  const {
    divisibilityRule,
    componentProps: rulePickerProps,
  } = useDivisibilityRulePicker("form-control");
  const [value, setValue] = React.useState<number>(10);

  const onValueChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
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
          {divisibilityRule.explanation.map((e) => (
            <li>{e}</li>
          ))}
        </ul>
      </div>
      <div>Is Divisible? {isDivisible ? "Yes" : "No"}</div>

      <div>
        {logLines.map((l) => (
          <div>{l}</div>
        ))}
      </div>
    </div>
  );
};

export default Divisibility;
