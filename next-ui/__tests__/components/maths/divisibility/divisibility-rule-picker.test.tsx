import { divisibilityRules } from "@comp-sci-maths/lib/dist/maths/primeNumbers/divisibilityRules";
import { NamedDivisibilityRule } from "@comp-sci-maths/lib/dist/types";
import { fireEvent, render, screen } from "@testing-library/react";
import DivisibilityRulePicker from "@/components/maths/divisibility/divisibility-rule-picker";

describe("divisibility-rule-picker", () => {
  it("renders correctly", () => {
    const onChange = jest.fn();
    const value: NamedDivisibilityRule = divisibilityRules[0];

    render(<DivisibilityRulePicker value={value} onChange={onChange} />);

    fireEvent.change(screen.getByTestId("div-rule-select"), {
      target: { value: "7" },
    });
  });
});
