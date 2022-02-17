import { factorial as factorialRecursive } from './factorialRecursive'
import { factorial as factorialLoop } from './factorialLoop'
import { TestCase, NamedFactorialFunction } from './types';

// We want to test both functions using the same code, so put into a collection
const FACTORIAL_FUNCTIONS: NamedFactorialFunction[] = [
    { name: 'Recursive', factorial: factorialRecursive },
    { name: 'Loop', factorial: factorialLoop }
]

// Pre-calculated factorial results that we can try each function on
const TEST_CASES: TestCase[] = [{
    input: 5,
    expectedOutput: 120
}, {
    input: 8,
    expectedOutput: 40320
}, {
    input: 11,
    expectedOutput: 39916800
}]

FACTORIAL_FUNCTIONS.forEach(({ name, factorial }) => {
    TEST_CASES.forEach(({ input, expectedOutput }) => {
        test(`Factorial - ${name} of ${input}`, () => {

            const output = factorial(input);
            expect(output).toBe(expectedOutput);
        });
    });
})

// These are basically the same tests, but without using the gnarly named test collection
// Note that this test code is perhaps clearer, but more repetitive
test("Factorial - Recursive vs Loop", () => {
    // try a couple of cases with the recursive function
    const factorial5Recurse = factorialRecursive(5);
    expect(factorial5Recurse).toBe(120);

    // Note that I am having to repeat the structure here...
    const factorial8Recurse = factorialRecursive(8);
    expect(factorial8Recurse).toBe(40320);

    // Then same again with loop based
    const factorial5Loop = factorialLoop(5);
    expect(factorial5Loop).toBe(120);

    const factorial8Loop = factorialLoop(8);
    expect(factorial8Loop).toBe(40320)
});