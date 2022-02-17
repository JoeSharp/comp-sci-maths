import { shuffle } from "lodash";
import React from "react";
import { choose } from "../../lib/utilities";
import Fraction from "./Fraction";
import NumberToPower from "./NumberToPower";
import { Answer, Question } from "./types";

const bases: string[] = [
  "𝑥", // x
  "𝑦", // y
  "𝑧", // z
];

const MULTIPLICATION_SYMBOL: string = "×";
const DIVISION_SYMBOL: string = "÷";

const goodIndices: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10];
const goodCoefficients: number[] = [1, 2, 3, 4, 5, 6];

const generateQuestion = (): Question => {
  const base = choose(bases);
  const coeffA: number = choose(goodCoefficients);
  const coeffB: number = choose(goodCoefficients, [coeffA]);
  const a: number = choose(goodIndices);
  const b: number = choose(goodIndices, [a]);

  const isMultiplication = Math.random() > 0.5;

  const correctCoefficient: number | React.ReactElement = isMultiplication ? (
    coeffA * coeffB
  ) : (
      <Fraction numerator={coeffA} denominator={coeffB} />
    );
  const correctIndex = isMultiplication ? a + b : a - b;

  const possibleAnswers: Answer[] = [
    {
      answer: (
        <NumberToPower
          coefficient={correctCoefficient}
          base={base}
          exponent={correctIndex}
        />
      ),
      correct: true,
      explanation: "Good job!",
    },
  ];
  if (correctIndex !== a * b) {
    possibleAnswers.push({
      answer: (
        <NumberToPower
          coefficient={correctCoefficient}
          base={base}
          exponent={a * b}
        />
      ),
      correct: false,
      explanation:
        "Remember that you should sum the indices with a common base, rather than multiply them",
    });
  }
  if (correctIndex !== a + b) {
    possibleAnswers.push({
      answer: (
        <NumberToPower
          coefficient={correctCoefficient}
          base={base}
          exponent={a + b}
        />
      ),
      correct: false,
      explanation:
        "Remember that you should substract the indices with a common base, rather than sum them",
    });
  }
  if (correctIndex !== a - b) {
    possibleAnswers.push({
      answer: (
        <NumberToPower
          coefficient={correctCoefficient}
          base={base}
          exponent={a - b}
        />
      ),
      correct: false,
      explanation:
        "Remember that you should sum the indices with a common base, rather than subtract them",
    });
  }
  if (correctIndex !== Math.min(a, b)) {
    possibleAnswers.push({
      answer: (
        <NumberToPower
          coefficient={correctCoefficient}
          base={base}
          exponent={Math.min(a, b)}
        />
      ),
      correct: false,
      explanation:
        "Remember that you should sum the indices with a common base, don't just choose the lowest",
    });
  }

  return {
    question: (
      <span>
        <NumberToPower coefficient={coeffA} base={base} exponent={a} />
        {isMultiplication ? MULTIPLICATION_SYMBOL : DIVISION_SYMBOL}
        <NumberToPower coefficient={coeffB} base={base} exponent={b} />
      </span>
    ),
    possibleAnswers: shuffle(possibleAnswers),
  };
};

export default generateQuestion;
