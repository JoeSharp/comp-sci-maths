import React from "react";

import { IClueWithValue, IGuess } from "./types";
import ValueDisplay from "./ValueDisplay";

interface Props {
  guess: IGuess;
  clueWithValue: IClueWithValue;
}

const Clue: React.FunctionComponent<Props> = ({
  guess,
  clueWithValue: {
    clue: { description, evaluate },
    value,
  },
}) => {
  const guessMatches: boolean = React.useMemo(() => evaluate(guess, value), [
    guess,
    value,
    evaluate,
  ]);

  return (
    <div className="clueWithValue">
      <div className="clueWithValue__display">
        <ValueDisplay value={value} />
      </div>
      <div className="clueWithValue__description">{description}</div>
      <div
        className={`clueWithValue__guessMatches alert alert-${
          guessMatches ? "success" : "danger"
        }`}
      >
        {guessMatches ? "YES" : "NO"}
      </div>
    </div>
  );
};

export default Clue;
