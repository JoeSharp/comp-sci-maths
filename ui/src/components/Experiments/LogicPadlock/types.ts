export type EvaluateFunction = (guess: number[], clue: number[]) => boolean;

export type IGuess = number[];

export interface IClue {
  description: string;
  evaluate: EvaluateFunction;
}

export interface IClueWithValue {
  value: IGuess;
  clue: IClue;
}

type CountFunction = (guess: number[], clue: number[]) => number;

const numberCommonDigits: CountFunction = (guess, clue) =>
  guess.reduce((acc, curr) => (clue.includes(curr) ? acc + 1 : acc), 0);
const numberCorrectDigits: CountFunction = (guess, clue) =>
  guess.reduce((acc, curr, i) => (clue[i] === curr ? acc + 1 : acc), 0);

const commonEvaluate = (
  commonDigits: number,
  correctDigits: number
): EvaluateFunction => (guess: number[], clue: number[]) =>
  numberCommonDigits(guess, clue) === commonDigits &&
  numberCorrectDigits(guess, clue) === correctDigits;

export const oneDigitInCorrectPlace: IClue = {
  description: "One digit is right and in it's place",
  evaluate: commonEvaluate(1, 1),
};

export const oneDigitInWrongPlace: IClue = {
  description: "One digit is right but in the wrong place",
  evaluate: commonEvaluate(1, 0),
};

export const twoDigitsInWrongPlace: IClue = {
  description: "Two digits are right but both are in the wrong place",
  evaluate: commonEvaluate(2, 0),
};

export const allDigitsWrong: IClue = {
  description: "All digits are wrong",
  evaluate: commonEvaluate(0, 0),
};
