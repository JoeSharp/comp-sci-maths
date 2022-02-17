import { ROW_SIZE } from "./constants";
import EvaluatedRow from "./EvaluatedRow";
import Row from "./Row"

describe("MasterMind - Evaluated Row", () => {
    test("Evaluation Gives Consistent Results", () => {
        const target = new Row(ROW_SIZE).withValues(...[1, 2, 2, 3]);
        const row1 = new Row(ROW_SIZE).withValues(...[1, 3, 4, 5]);
        const result1 = EvaluatedRow.createFromTarget(target, row1);
        const row2 = new Row(ROW_SIZE).withValues(...[1, 5, 4, 3]);
        expect(result1.isConsistent(row2));
    })
})