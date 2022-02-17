import randomBetween from "./randomBetween";

const NUMBER_ATTEMPTS = 1000;

interface TestCase {
    name: string;
    upper: number;
    lower: number;
}

const TEST_CASES: TestCase[] = [
    {
        name: "Large + Bounds",
        upper: 1000,
        lower: 500
    },
    {
        name: "About Zero",
        upper: 300,
        lower: -300
    },
    {
        name: "Decimal Numbers",
        upper: 1000,
        lower: 500
    }
]

describe("Random Between", () => {
    TEST_CASES.forEach(({ name, upper, lower }) => {
        test(name, () => {
            for (let i = 0; i < NUMBER_ATTEMPTS; i++) {
                const result = randomBetween(lower, upper);
                expect(result).toBeLessThanOrEqual(upper);
                expect(result).toBeGreaterThanOrEqual(lower);
            }
        })
    })
})