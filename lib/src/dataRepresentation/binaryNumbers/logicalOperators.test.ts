import { countOnes, or, and, xor, halfAdder, fullAdder } from "./logicalOperators";

describe("Logical Operators", () => {
    test("Count Ones", () => {
        expect(countOnes(false, false, true, true)).toBe(2);
        expect(countOnes(true, false, true, true)).toBe(3);
        expect(countOnes(false, false, false, false)).toBe(0);
        expect(countOnes(false, false, true, false)).toBe(1);
        expect(countOnes(true, true, true, true)).toBe(4);
    })

    test("OR", () => {
        expect(or(false, false)).toBe(false);
        expect(or(true, false)).toBe(true);
        expect(or(false, true)).toBe(true);
        expect(or(true, true)).toBe(true);
    })

    test("AND", () => {
        expect(and(false, false)).toBe(false);
        expect(and(true, false)).toBe(false);
        expect(and(false, true)).toBe(false);
        expect(and(true, true)).toBe(true);
    })

    test("XOR", () => {
        expect(xor(false, false)).toBe(false);
        expect(xor(true, false)).toBe(true);
        expect(xor(false, true)).toBe(true);
        expect(xor(true, true)).toBe(false);
    })

    test("halfAdder", () => {
        expect(halfAdder(false, false)).toEqual({ sum: false, carry: false });
        expect(halfAdder(false, true)).toEqual({ sum: true, carry: false });
        expect(halfAdder(true, false)).toEqual({ sum: true, carry: false });
        expect(halfAdder(true, true)).toEqual({ sum: false, carry: true });
    })

    test("fullAdder", () => {
        expect(fullAdder(false, false, false)).toEqual({ sum: false, carry: false });
        expect(fullAdder(false, true, false)).toEqual({ sum: true, carry: false });
        expect(fullAdder(true, false, false)).toEqual({ sum: true, carry: false });
        expect(fullAdder(true, true, false)).toEqual({ sum: false, carry: true });

        expect(fullAdder(false, false, true)).toEqual({ sum: true, carry: false });
        expect(fullAdder(false, true, true)).toEqual({ sum: false, carry: true });
        expect(fullAdder(true, false, true)).toEqual({ sum: false, carry: true });
        expect(fullAdder(true, true, true)).toEqual({ sum: true, carry: true });
    });

})