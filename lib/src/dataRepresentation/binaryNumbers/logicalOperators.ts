export const countOnes = (...digits: boolean[]): number => digits.reduce((acc, curr) => curr ? acc + 1 : acc, 0);
export const xor = (...digits: boolean[]): boolean => countOnes(...digits) === 1;
export const and = (...digits: boolean[]): boolean => countOnes(...digits) === digits.length;
export const or = (...digits: boolean[]): boolean => countOnes(...digits) > 0;

interface AddBitResult {
    sum: boolean;
    carry: boolean;
}

/**
 * Implementation of binary half adder.
 *
 * @param a First digit to add
 * @param b Second digit to add
 * @returns Result of addition (sum and carry)
 */
export const halfAdder = (a: boolean, b: boolean): AddBitResult => ({
    sum: xor(a, b),
    carry: and(a, b)
})

/**
 * Implementation of binary full addder.
 *
 * @param a The first digit to add
 * @param b The second digit to add
 * @param carry Carry from the previous addition
 * @returns The result of the bit addition.
 */
export const fullAdder = (a: boolean, b: boolean, carry: boolean): AddBitResult => ({
    sum: xor(xor(a, b), carry),
    carry: countOnes(a, b, carry) >= 2
})