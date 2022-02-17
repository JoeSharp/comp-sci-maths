import {
  arithmeticComparator,
  generateRandomNumbers,
} from "comp-sci-maths-lib/dist/common";
import React from "react";
import useInterval from "../../../lib/useInterval";
import { BigOMeasurements, MeasureProps } from "./types";

interface Props extends MeasureProps {
  playing: boolean;
  algorithmWrapper: (inputList: number[]) => number;
}

interface ReducerState extends MeasureProps {
  algorithmWrapper: (inputList: number[]) => number;
  iterations: number;
  measurements: BigOMeasurements;
}

interface TickAction {
  type: "tick";
}
interface ResetAction extends MeasureProps {
  type: "reset";
  algorithmWrapper: (inputList: number[]) => number;
}

type ReducerAction = TickAction | ResetAction;

const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  switch (action.type) {
    case "tick":
      let measurements: BigOMeasurements = {};

      for (let n = state.startSize; n < state.endSize; n += state.step) {
        const inputList: number[] = generateRandomNumbers(0, 1000, n);
        inputList.sort(arithmeticComparator);

        // Search for some specific indices
        let numberOfComparisons: number = state.algorithmWrapper(inputList);

        measurements[n] =
          state.iterations > 0
            ? Math.floor(
                numberOfComparisons / (state.iterations + 1) +
                  ((state.measurements[n] || 0) * state.iterations) /
                    (state.iterations + 1)
              )
            : numberOfComparisons;
      }
      return {
        ...state,
        iterations: state.iterations + 1,
        measurements,
      };
    case "reset":
      const resetAction = action as ResetAction;
      console.log("Reset");
      return {
        ...resetAction,
        iterations: 1,
        measurements: {},
      };
  }
};

const useAlgorithmMeasure = ({
  playing,
  startSize,
  endSize,
  step,
  algorithmWrapper,
}: Props): BigOMeasurements => {
  const [{ measurements }, dispatch] = React.useReducer(reducer, {
    algorithmWrapper,
    iterations: 1,
    measurements: {},
    startSize,
    endSize,
    step,
  });

  const tick = React.useCallback(() => dispatch({ type: "tick" }), []);

  React.useEffect(
    () =>
      dispatch({
        type: "reset",
        startSize,
        endSize,
        step,
        algorithmWrapper,
      }),
    [algorithmWrapper, startSize, endSize, step]
  );

  useInterval(tick, playing ? 1000 : null);

  return measurements;
};

export default useAlgorithmMeasure;
