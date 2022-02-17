import percentageError from '../../maths/percentageError';
import montyHall from './montyHall';

const ITERATIONS = 10000;

interface TestCase {
    switchStrategy: boolean;
    expectedSuccessRate: number;
}

const TEST_CASES: TestCase[] = [
    {
        switchStrategy: true,
        expectedSuccessRate: 2 / 3
    },
    {
        switchStrategy: false,
        expectedSuccessRate: 1 / 3
    }
]

describe("Monty Hall Problem", () => {
    TEST_CASES.forEach(({ switchStrategy, expectedSuccessRate }) => {
        test(`Switching ${switchStrategy} Should Yield ${expectedSuccessRate.toFixed(2)} success`, () => {
            let successes = 0;

            for (let i = 0; i < ITERATIONS; i++) {
                if (montyHall(switchStrategy)) {
                    successes++;
                }
            }

            const successPercent = successes / ITERATIONS;
            const err = percentageError(expectedSuccessRate, successPercent);
            expect(err).toBeLessThan(5);
        });
    })
})