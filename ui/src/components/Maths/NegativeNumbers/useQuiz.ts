import React from "react";
import { ArithemeticOperation } from "./arithmeticOperations";

export interface Question {
  question: string;
  answer: number;
  givenAnswer?: number;
}

export interface Props {
  partRange: number;
  numberParts: number;
  numberQuestions: number;
  operation: ArithemeticOperation;
}

export interface UseQuiz {
  questions: Question[];
  giveAnswer: (index: number, givenAnswer: number) => void;
  regenerateQuiz: () => void;
}

interface RegenerateQuizAction extends Props {
  type: 'regenerate'
}
interface AnswerAction {
  type: 'answer',
  index: number;
  givenAnswer: number;
}
type Action = RegenerateQuizAction | AnswerAction;

interface ReducerState extends Props {
  questions: Question[];
}

const quizReducer = (state: ReducerState, action: Action): ReducerState => {
  switch (action.type) {
    case "regenerate": {
      const { numberQuestions, numberParts, partRange, operation } = action;
      const { getParts, symbol, reducer } = operation;
      let questions: Question[] = [];

      for (let x = 0; x < numberQuestions; x++) {
        let parts: number[] = getParts(numberParts, partRange);
        questions.push({
          question: parts
            .map((p) => (p > 0 ? p.toString() : `(${p.toString()})`))
            .join(` ${symbol} `),
          answer: parts.reduce(reducer),
        });
      }

      return {
        ...action,
        questions
      };
    }
    case "answer":
      {
        return {
          ...state,
          questions: state.questions.map((q, i) => i === action.index ? { ...q, givenAnswer: action.givenAnswer } : q)
        }
      }
  }
}

const useQuiz = ({ numberParts, numberQuestions, partRange, operation }: Props): UseQuiz => {
  const [{ questions }, reduceQuiz] = React.useReducer(quizReducer, { numberParts, numberQuestions, partRange, operation, questions: [] });

  const regenerateQuiz = React.useCallback(
    () => reduceQuiz({ type: 'regenerate', numberParts, numberQuestions, partRange, operation }),
    [numberParts, numberQuestions, partRange, operation])

  React.useEffect(() => regenerateQuiz(), [
    regenerateQuiz,
  ]);

  const giveAnswer = React.useCallback((index: number, givenAnswer: number) => {
    reduceQuiz({
      type: 'answer',
      index,
      givenAnswer,
    })
  }, [reduceQuiz]);

  return { questions, giveAnswer, regenerateQuiz };
};

export default useQuiz;
