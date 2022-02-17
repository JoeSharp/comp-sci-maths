import React from "react";
import Button from "../../Bootstrap/Buttons/Button";
import Checkbox from "../../Bootstrap/Checkbox";
import useAlgebra from "./useAlgebra";

import "./algebra.css";

interface SelectedByIndex {
  [i: number]: boolean;
}

const DEFAULT_SELECTED_BY_INDEX: SelectedByIndex = {};

interface ToggleAction {
  type: "toggle";
  index: number;
}

interface SetAction {
  type: "set";
  indices: number[];
}

type SelectedAction = ToggleAction | SetAction;

const selectedReducer = (
  state: SelectedByIndex,
  action: SelectedAction
): SelectedByIndex => {
  switch (action.type) {
    case "set":
      return action.indices.reduce(
        (acc, curr) => ({ ...acc, [curr]: false }),
        {}
      );
    case "toggle":
      return {
        ...state,
        [action.index]: !state[action.index],
      };
  }
};

const Algebra: React.FunctionComponent = () => {
  const {
    question: { question, possibleAnswers },
    regenerateQuestion,
  } = useAlgebra();

  const [selectedByIndex, dispatchSelectedByIndex] = React.useReducer(
    selectedReducer,
    DEFAULT_SELECTED_BY_INDEX
  );

  const [submitted, setSubmit] = React.useState(false);

  React.useEffect(
    () =>
      dispatchSelectedByIndex({
        type: "set",
        indices: possibleAnswers.map((_, i) => i),
      }),
    [possibleAnswers]
  );

  const onAnswer = React.useCallback(() => {
    setSubmit(true);
  }, [setSubmit]);
  const onNext = React.useCallback(() => {
    setSubmit(false);
    regenerateQuestion();
  }, [setSubmit, regenerateQuestion]);

  return (
    <div className="algebra">
      Simplify {question}
      <div>
        {possibleAnswers.map(({ answer, correct, explanation }, i) => (
          <div key={i}>
            <Checkbox
              id={`answerSelected_{i}`}
              label={
                submitted && selectedByIndex[i] ? (
                  <span className={correct ? "correct" : "incorrect"}>
                    {answer} - {explanation}
                  </span>
                ) : (
                  answer
                )
              }
              checked={selectedByIndex[i] || false}
              onChange={() =>
                dispatchSelectedByIndex({ type: "toggle", index: i })
              }
            />
          </div>
        ))}
      </div>
      <div className="mt-4">
        {submitted || (
          <Button text="Submit" onClick={onAnswer} styleType="primary" />
        )}
        {submitted && (
          <Button text="Next" onClick={onNext} styleType="secondary" />
        )}
      </div>
    </div>
  );
};

export default Algebra;
