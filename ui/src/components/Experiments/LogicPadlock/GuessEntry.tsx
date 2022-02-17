import React from "react";

import { IGuess } from "./types";

interface Props {
  numberDigits: number;
  value: number[];
  onChange: (v: number[]) => any;
}

interface DigitUpdateAction {
  index: number;
  value: number;
}

const boundValue = (v: number): number => {
  if (v < 0) return 0;
  if (v > 9) return 9;
  return v;
};

const valueReducer = (state: IGuess, action: DigitUpdateAction): IGuess => {
  const { index, value } = action;
  return state.map((v, i) => (i === index ? boundValue(value) : v));
};

interface DigitWithHandlers {
  digit: number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const GuessEntry: React.FunctionComponent<Props> = ({
  numberDigits,
  value,
  onChange,
}) => {
  const [digits, dispatchDigits] = React.useReducer(valueReducer, value);

  const digitWithHandlers: DigitWithHandlers[] = React.useMemo(
    () =>
      digits.map((digit, index) => ({
        digit,
        onChange: (e) =>
          dispatchDigits({ value: Number.parseInt(e.target.value), index }),
      })),
    [digits, dispatchDigits]
  );

  React.useEffect(() => onChange(digits), [digits, onChange]);

  if (value.length !== numberDigits) {
    return <div>INVALID NUMBER OF DIGITS</div>;
  }

  return (
    <form className="form-inline">
      {digitWithHandlers.map(({ digit, onChange }, i) => (
        <div key={i} className="form-group">
          <select className="form-control" value={digit} onChange={onChange}>
            {Array(10)
              .fill(null)
              .map((d, i) => (
                <option>{i}</option>
              ))}
          </select>
        </div>
      ))}
    </form>
  );
};

export default GuessEntry;
