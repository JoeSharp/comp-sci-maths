import { ROW_SIZE } from "./constants";
import { Pin } from "./Pin";
import Row from "./Row";

describe("MasterMind - Row", () => {
    test("Exact Match", () => {
        const target = new Row(ROW_SIZE)
            .withValues(1, 5, 3, 3);
        const row = new Row(ROW_SIZE)
            .withValues(1, 5, 3, 3);

        const valid = row.evaluate(target);
        expect(valid[Pin.correct]).toBe(4);
    });

    test("Lots of similair numbers", () => {
        const target = new Row(ROW_SIZE)
            .withValues(0, 2, 0, 0)
        const row = new Row(ROW_SIZE)
            .withValues(0, 0, 2, 0);

        const valid = row.evaluate(target);
        expect(valid[Pin.correct]).toBe(2);
        expect(valid[Pin.incorrectPlace]).toBe(2);
    })

    test("Couple correct", () => {
        const target = new Row(ROW_SIZE)
            .withValues(1, 5, 3, 3);
        const row = new Row(ROW_SIZE)
            .withValues(1, 5, 7, 2);

        const valid = row.evaluate(target);
        expect(valid[Pin.correct]).toBe(2);
        expect(valid[Pin.incorrect]).toBe(2);
    });

    test("One correct, two in wrong place", () => {
        const target = new Row(ROW_SIZE)
            .withValues(1, 5, 3, 3);
        const row = new Row(ROW_SIZE)
            .withValues(1, 3, 5, 2);

        const valid = row.evaluate(target);
        expect(valid[Pin.correct]).toBe(1);
        expect(valid[Pin.incorrectPlace]).toBe(2);
        expect(valid[Pin.incorrect]).toBe(1);
    });

    test("All Wrong", () => {
        const target = new Row(ROW_SIZE).withValues(1, 5, 3, 3);
        const row = new Row(ROW_SIZE).withValues(7, 8, 4, 2);

        const valid = row.evaluate(target);
        expect(valid[Pin.incorrect]).toBe(4);
    });

    test("Mismatching 'target' row", () => {
        const row = new Row(6);
        const target = new Row(7);

        expect(() => row.evaluate(target)).toThrowError();
    });

    test("Invalid Index on Build", () => {
        const row = new Row(ROW_SIZE);
        expect(() => row.withValue(row.values.length + 1, 1)).toThrowError();
        expect(() => row.withValue(-9, 1)).toThrowError();
    })
});
