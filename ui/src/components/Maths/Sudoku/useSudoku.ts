import React from "react";

import {
    Coordinate,
    BoardActionConsumer,
    BoardAction,
    BoardState,
    Cell,
} from "./types";

export const EMPTY_CELL = -1;
export const SUB_DIMENSION = 3;
export const DIMENSION = Math.pow(SUB_DIMENSION, 2);

export const DIGITS = Array(DIMENSION).fill(null).map((_, i) => i + 1);


type GetOtherCellsFunction = (x: number, y: number) => Coordinate[];

const getRowCells: GetOtherCellsFunction = (
    x: number,
    y: number
): Coordinate[] =>
    Array(DIMENSION)
        .fill(null)
        .map((_, i) => ({ x: i, y }));
const getColCells: GetOtherCellsFunction = (
    x: number,
    y: number
): Coordinate[] =>
    Array(DIMENSION)
        .fill(null)
        .map((_, i) => ({ x, y: i }));
const getSquareCells: GetOtherCellsFunction = (
    x: number,
    y: number
): Coordinate[] => {
    let coords: Coordinate[] = [];
    let xFloor = Math.floor(x / SUB_DIMENSION) * SUB_DIMENSION;
    let yFloor = Math.floor(y / SUB_DIMENSION) * SUB_DIMENSION;
    for (let xi = 0; xi < SUB_DIMENSION; xi++) {
        for (let yi = 0; yi < SUB_DIMENSION; yi++) {
            coords.push({
                x: xFloor + xi,
                y: yFloor + yi,
            });
        }
    }
    return coords;
};
const getOtherCellFunctions: GetOtherCellsFunction[] = [
    getRowCells,
    getColCells,
    getSquareCells,
];

const reducer = (state: BoardState, action: BoardAction): BoardState => {
    // Make a complete deep copy of the board
    const cells: Cell[][] = state.cells.map((col) => col.map((c) => ({ ...c })));
    const hints: BoardAction[] = [];

    // Use this action to change the appropriate cell
    for (let x = 0; x < DIMENSION; x++) {
        for (let y = 0; y < DIMENSION; y++) {
            if (x === action.x && y === action.y) {
                if (action.fix || !cells[x][y].fixed) {
                    if (cells[x][y].value === action.value) {
                        cells[x][y].value = EMPTY_CELL;
                    } else {
                        cells[x][y].value = action.value;
                        cells[x][y].fixed = action.fix || false;
                    }
                }
            }

            cells[x][y].error = false;
        }
    }

    // Check each cell
    for (let x = 0; x < DIMENSION; x++) {
        for (let y = 0; y < DIMENSION; y++) {
            let allowed = new Set(DIGITS);
            getOtherCellFunctions.forEach((f) => {
                let found: Set<number> = new Set();
                let otherCells = f(x, y);
                otherCells.forEach(({ x: xi, y: yi }) => {
                    if (cells[x][y].value !== EMPTY_CELL) {
                        if (
                            found.has(cells[xi][yi].value) &&
                            cells[xi][yi].value !== EMPTY_CELL
                        ) {
                            otherCells.forEach(({ x: xj, y: yj }) => {
                                if (cells[xj][yj].value === cells[xi][yi].value) {
                                    cells[xj][yj].error = true;
                                }
                            });
                        }
                        found.add(cells[xi][yi].value);
                    } else {
                        allowed.delete(cells[xi][yi].value);
                    }
                });
            });

            //   console.log("Allowed...", { x, y, allowed });
            cells[x][y].allowed = new Set(allowed);
            if (allowed.size === 1) {
                hints.push({
                    x,
                    y,
                    value: allowed.values().next().value,
                });
            }
        }
    }

    return {
        cells,
        hints,
    };
};

const defaultState: BoardState = {
    hints: [],
    cells: Array(DIMENSION)
        .fill(null)
        .map((i) =>
            Array(DIMENSION)
                .fill(null)
                .map((j) => ({
                    value: EMPTY_CELL,
                    error: false,
                    fixed: false,
                    allowed: new Set(DIGITS),
                }))
        ),
};

const initialActions: BoardAction[] = [
    { x: 0, y: 0, value: 6 },
    { x: 0, y: 1, value: 2 },
    { x: 0, y: 8, value: 1 },
    { x: 1, y: 2, value: 4 },
    { x: 1, y: 3, value: 7 },
    { x: 1, y: 5, value: 1 },
    { x: 1, y: 6, value: 6 },
    { x: 1, y: 7, value: 9 },
    { x: 2, y: 1, value: 1 },
    { x: 2, y: 3, value: 3 },
    { x: 2, y: 4, value: 6 },
    { x: 2, y: 7, value: 8 },
    { x: 3, y: 0, value: 3 },
    { x: 3, y: 3, value: 8 },
    { x: 3, y: 5, value: 6 },
    { x: 3, y: 6, value: 9 },
    { x: 4, y: 3, value: 9 },
    { x: 4, y: 4, value: 4 },
    { x: 4, y: 5, value: 3 },
    { x: 5, y: 2, value: 6 },
    { x: 5, y: 3, value: 1 },
    { x: 5, y: 5, value: 2 },
    { x: 5, y: 8, value: 5 },
    { x: 6, y: 1, value: 9 },
    { x: 6, y: 4, value: 3 },
    { x: 6, y: 5, value: 8 },
    { x: 6, y: 7, value: 1 },
    { x: 7, y: 1, value: 3 },
    { x: 7, y: 2, value: 5 },
    { x: 7, y: 3, value: 6 },
    { x: 7, y: 5, value: 7 },
    { x: 7, y: 6, value: 4 },
    { x: 8, y: 0, value: 1 },
    { x: 8, y: 7, value: 5 },
    { x: 8, y: 8, value: 8 },
];

interface UseSudoku {
    board: BoardState;
    setBoard: BoardActionConsumer;
    autoSolveStep: () => void;
}

const useSudoku = (): UseSudoku => {
    const [board, setBoard] = React.useReducer(reducer, defaultState);

    React.useEffect(() => {
        initialActions.map((i) => ({ ...i, fix: true })).forEach(setBoard);
    }, []);

    const autoSolveStep = React.useCallback(() => {
        if (board.hints.length > 0) {
            setBoard(board.hints[0]);
        }
    }, [board]);

    return { board, setBoard, autoSolveStep };
};

export default useSudoku;
