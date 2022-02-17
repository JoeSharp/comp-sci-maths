import { GAME_ROWS } from "./constants";
import { Pin } from "./Pin";
import Row from "./Row";
import ValidatedRow from "./EvaluatedRow";

class MasterMind {
    target: Row;
    validatedRows: ValidatedRow[] = [];
    hasWon: boolean;
    rowSize: number;
    pinValues: number[];

    constructor(rowSize: number, pinValues: number[]) {
        this.rowSize = rowSize;
        this.pinValues = pinValues;
        this.reset();
    }

    /**
     * Generate a new 'correct' row.
     */
    reset() {
        this.target = Row.createRandom(this.pinValues, this.rowSize);
        this.validatedRows = [];
        this.hasWon = false;
    }

    gameContinues() {
        return this.validatedRows.length < GAME_ROWS && !this.hasWon;
    }

    /**
     * Submit a guess to the game for evaluation
     * @param row The player guess
     * @returns True/False to indicate if the game has been won.
     */
    submitRow(row: Row): boolean {
        // Check the values are in our valid pinValues
        row.values.forEach(v => {
            if (!this.pinValues.includes(v)) {
                throw new Error(`Invalid pin value ${v}, expected one of ${this.pinValues}`)
            }
        })

        const result = row.evaluate(this.target);
        this.validatedRows.push(new ValidatedRow(row, result));
        this.hasWon = result[Pin.correct] === this.target.values.length;
        return this.hasWon;
    }
}

export default MasterMind;