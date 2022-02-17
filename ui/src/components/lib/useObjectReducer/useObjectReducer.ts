import React from "react";
import { UseObjectReducer } from "./types";

interface MergeAction<T> {
  type: "merge";
  value: Partial<T>;
}

interface ReplaceAction<T> {
  type: "replace";
  value: T;
}

type Action<T> = MergeAction<T> | ReplaceAction<T>;

const reducer = <T extends {}>(state: T, action: Action<T>) => {
  if (action.type === "replace") {
    return action.value;
  } else if (action.type === "merge") {
    return { ...state, ...action.value };
  }
  return state;
};

const useObjectReducer = <T extends {}>(
  initialValue: T
): UseObjectReducer<T> => {
  const [value, dispatch] = React.useReducer<React.Reducer<T, Action<T>>>(
    reducer,
    initialValue
  );

  return {
    value,
    onChange: React.useCallback(
      (value: Partial<T>) => dispatch({ type: "merge", value }),
      []
    ),
  };
};

export default useObjectReducer;
