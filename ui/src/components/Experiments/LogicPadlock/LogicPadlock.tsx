import React from "react";

import "./styles.css";

import GuessEntry from "./GuessEntry";
import {
  IGuess,
  IClueWithValue,
  allDigitsWrong,
  oneDigitInCorrectPlace,
  oneDigitInWrongPlace,
  twoDigitsInWrongPlace,
} from "./types";
import Clue from "./Clue";

const cluesWithValues: IClueWithValue[] = [
  {
    clue: oneDigitInCorrectPlace,
    value: [6, 8, 2],
  },
  {
    clue: oneDigitInWrongPlace,
    value: [6, 1, 4],
  },
  {
    clue: twoDigitsInWrongPlace,
    value: [2, 0, 6],
  },
  {
    clue: allDigitsWrong,
    value: [7, 3, 8],
  },
  {
    clue: oneDigitInWrongPlace,
    value: [3, 8, 0],
  },
];

const AllAreCorrect: React.FunctionComponent = () => (
  <div className="alert alert-success" role="alert">
    All the clues match your value!
  </div>
);

const SomeIncorrect: React.FunctionComponent = () => (
  <div className="alert alert-danger" role="alert">
    Some of the clues do not match your value
  </div>
);

const LogicPadlock: React.FunctionComponent = () => {
  const [guess, setGuess] = React.useState<IGuess>([0, 0, 0]);

  const allCorrect = React.useMemo(
    () =>
      cluesWithValues.reduce(
        (acc, curr) => (curr.clue.evaluate(guess, curr.value) ? acc : false),
        true
      ),
    [guess]
  );

  return (
    <div>
      <p>Can you open the lock using these clues?</p>
      {cluesWithValues.map((clueWithValue, i) => (
        <Clue key={i} guess={guess} clueWithValue={clueWithValue} />
      ))}
      <p>Set your guess here</p>
      <GuessEntry numberDigits={3} value={guess} onChange={setGuess} />
      <div>Guess: {guess}</div>
      {allCorrect ? <AllAreCorrect /> : <SomeIncorrect />}
    </div>
  );
};

export default LogicPadlock;
