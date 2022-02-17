import MonteCarloPi from './MonteCarloPi';
import percentageError from '../../maths/percentageError';

interface TestCase {
    iterations: number;
    expectedPercentageError: number;
}

const TEST_CASES: TestCase[] = [
    {
        iterations: 100,
        expectedPercentageError: 10,
    },
    {
        iterations: 10000,
        expectedPercentageError: 3,
    },
    {
        iterations: 1000000,
        expectedPercentageError: 1,
    }
]

describe("Monte Carlo Pi Calculator", () => {
    TEST_CASES.forEach(({ iterations, expectedPercentageError }) => {
        test(`${iterations} Iterations`, () => {
            const mpi = new MonteCarloPi().iterate(iterations).calculatePi();
            const err = percentageError(Math.PI, mpi);
            expect(err).toBeLessThan(expectedPercentageError);
        })
    })
})