import { CountByPin, Pin } from "./Pin";
import Row from "./Row";

class EvaluatedRow {
    row: Row;
    result: CountByPin;

    constructor(row: Row, result: CountByPin) {
        this.row = row;
        this.result = result;
    }

    static createFromTarget(target: Row, row: Row): EvaluatedRow {
        return new EvaluatedRow(row, row.evaluate(target));
    }

    isConsistent(newRow: Row): boolean {
        const result: CountByPin = this.row.evaluate(newRow);

        for (const t of [Pin.correct, Pin.incorrectPlace]) {
            if (result[t] !== this.result[t]) {
                return false;
            }
        }

        return true;
    }
}

export default EvaluatedRow;