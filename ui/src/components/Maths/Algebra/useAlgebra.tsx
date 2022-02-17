import React from "react";

import generateQuestion from "./multiplySameBase";
import { Question } from "./types";

interface UseAlgebra {
  question: Question;
  regenerateQuestion: () => void;
}

const FIRST_QUESTION = generateQuestion();

const useAlgebra = (): UseAlgebra => {
  const [question, setQuestion] = React.useState<Question>(FIRST_QUESTION);

  const regenerateQuestion = React.useCallback(
    () => setQuestion(generateQuestion()),
    [setQuestion]
  );

  return { question, regenerateQuestion };
};

export default useAlgebra;
