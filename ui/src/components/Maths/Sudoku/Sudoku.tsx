import React from "react";

import useSudoku, { EMPTY_CELL, DIGITS } from './useSudoku';
import { Cell, CoordinateConsumer } from "./types";

import "./sudoku.css";

interface DigitButton {
    digit: number;
    onClick: () => void;
}
interface CellProps {
    cell: Cell;
    x: number;
    y: number;
    setBoard: CoordinateConsumer;
}

const CellComponent: React.FunctionComponent<CellProps> = ({
    x,
    y,
    cell,
    setBoard,
}) => {
    let classNames: string[] = ["sudoku-cell"];
    if (cell.error) {
        classNames.push("sudoku-cell-error");
    }
    if (cell.value === EMPTY_CELL) {
        classNames.push("sudoku-cell-hint");
    }
    return (
        <td className={classNames.join(" ")} onClick={() => setBoard({ x, y })}>
            {cell.value === EMPTY_CELL
                ? Array.from(cell.allowed).join(", ")
                : cell.value}
        </td>
    );
};

interface RowProps {
    x: number;
    row: Cell[];
    value: number;
    setBoard: CoordinateConsumer;
}

const RowComponent: React.FunctionComponent<RowProps> = ({
    x,
    row,
    setBoard,
    value,
}) => (
        <tr>
            {row.map((cell, y) => (
                <CellComponent key={y} {...{ x, y, cell, setBoard, value }} />
            ))}
        </tr>
    );

const Sudoku: React.FunctionComponent = () => {
    const [value, setValue] = React.useState<number>(5);
    const { board, setBoard: _setBoard, autoSolveStep } = useSudoku();

    const buttonProps: DigitButton[] = React.useMemo(() => DIGITS.map(digit => ({
        digit,
        onClick: () => setValue(digit)
    })), [setValue]);

    const setBoard: CoordinateConsumer = React.useCallback(
        ({ x, y }) => _setBoard({ x, y, value }),
        [value, _setBoard]
    );

    return (
        <div>
            <div className="btn-group pb-3" role="group" aria-label="Basic example">
                {buttonProps.map(({ digit, onClick }) => {
                    let classNames: string[] = ['btn']
                    if (digit === value) {
                        classNames.push('btn-success')
                    } else {
                        classNames.push('btn-secondary')
                    }

                    return (<button className={classNames.join(' ')} onClick={onClick}>{digit}</button>);
                })}
                <button className="btn btn-primary" onClick={autoSolveStep}>
                    Auto Solve Step
            </button>
            </div>
            <table className="sudoku-table">
                <thead></thead>
                <tbody>
                    {board.cells.map((row, x) => (
                        <RowComponent key={x} {...{ x, setBoard, row, value }} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Sudoku;
