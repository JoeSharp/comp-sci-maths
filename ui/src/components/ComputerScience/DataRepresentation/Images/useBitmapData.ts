import React from "react";
import { ColourMap } from "./types";

interface Props {
  width: number;
  height: number;
  colourDepth: number;
  availableColours: ColourMap;
}

interface UseBitmapData {
  pixels: number[][];
  rawData: string;
  setColour: (x: number, y: number, colour: number) => void;
  randomiseColours: () => void;
}

interface SetColourAction {
  type: "setColour";
  x: number;
  y: number;
  colour: number;
}

interface InitialiseAction extends Props {
  type: "initialise";
}

interface RandomizeAction {
  type: "randomize";
}

type ReducerAction = SetColourAction | InitialiseAction | RandomizeAction;

interface ReducerState {
  availableColours: ColourMap;
  pixels: number[][];
  colourDepth: number;
  rawData: string;
  width: number;
  height: number;
}

const defaultReducerState: ReducerState = {
  availableColours: { 0: "FF0000", 1: "0000FF" },
  colourDepth: 1,
  pixels: [],
  rawData: "",
  width: 0,
  height: 0,
};

const getRawData = (colourDepth: number, pixels: number[][]): string => {
  return pixels
    .map((row) =>
      row.map((i) => i.toString(2).padStart(colourDepth, "0")).join("")
    )
    .join("");
};

const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  switch (action.type) {
    case "initialise": {
      const { width, height, availableColours, colourDepth } = action;
      const pixels: number[][] = Array(height)
        .fill(null)
        .map((i) =>
          Array(width)
            .fill(null)
            .map((i) => 0)
        );
      return {
        width,
        height,
        availableColours,
        colourDepth,
        pixels: pixels,
        rawData: getRawData(state.colourDepth, pixels),
      };
    }
    case "setColour": {
      const { x, y, colour } = action;
      const pixels = state.pixels.map((row, sx) =>
        sx === x ? row.map((cell, sy) => (sy === y ? colour : cell)) : row
      );

      return {
        ...state,
        pixels: pixels,
        rawData: getRawData(state.colourDepth, pixels),
      };
    }
    case "randomize": {
      const pixels = state.pixels.map((row) =>
        row.map(() =>
          Math.floor(
            Math.random() * Object.values(state.availableColours).length
          )
        )
      );
      return {
        ...state,
        pixels,
        rawData: getRawData(state.colourDepth, pixels),
      };
    }
  }
};

const useBitmapData = ({
  height,
  width,
  colourDepth,
  availableColours,
}: Props): UseBitmapData => {
  const [{ pixels, rawData }, dispatch] = React.useReducer(
    reducer,
    defaultReducerState
  );

  React.useEffect(
    () =>
      dispatch({
        type: "initialise",
        width,
        height,
        colourDepth,
        availableColours,
      }),
    [width, height, availableColours, colourDepth]
  );

  const setColour = React.useCallback(
    (x: number, y: number, colour: number) =>
      dispatch({ type: "setColour", x, y, colour }),
    []
  );

  const randomiseColours = React.useCallback(
    () => dispatch({ type: "randomize" }),
    []
  );

  return { pixels, rawData, setColour, randomiseColours };
};

export default useBitmapData;