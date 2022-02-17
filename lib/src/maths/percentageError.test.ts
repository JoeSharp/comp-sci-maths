import percentageError from './percentageError';

describe("Percentage Error", () => {
    test("+ve Number, Large Negative Error", () => {
        const result = percentageError(100, 80);
        expect(result).toBe(20);
    });
    test("+ve Number, Large Positive Error", () => {
        const result = percentageError(100, 120);
        expect(result).toBe(20);
    });
    test("-ve Number, Small Negative Error", () => {
        const result = percentageError(100, 99.5);
        expect(result).toBe(0.5);
    });
    test("-ve Number, Small Positive Error", () => {
        const result = percentageError(100, 100.5);
        expect(result).toBe(0.5);
    });
    test("-ve Number, Small Number", () => {
        const result = percentageError(0.01, 0.0105);
        expect(result).toBe(5);
    });
})