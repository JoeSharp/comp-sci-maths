// Defines a type for each test case
export interface TestCase {
    input: number;
    expectedOutput: number;
}

export type FactorialFunction = (x: number) => number;

export interface NamedFactorialFunction {
    name: string;
    factorial: FactorialFunction;
}