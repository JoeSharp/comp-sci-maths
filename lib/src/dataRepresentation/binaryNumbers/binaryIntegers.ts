import { fullAdder } from "./logicalOperators";
import { BinaryNumber, ResultWithFlag, DEFAULT_BIT_VALUE, DEFAULT_BIT_WIDTH, ShiftDirection } from "./types";

/**
 * Create a binary number of a given width.
 *
 * @param digits The number of binary digits
 * @param defaultValue The value to use for each digit
 * @returns The binary number (array of booleans)
 */
export const createBinaryNumber = (
    digits: number = DEFAULT_BIT_WIDTH,
    defaultValue: boolean = DEFAULT_BIT_VALUE
): BinaryNumber =>
    Array(digits).fill(null).map(() => defaultValue);

/**
 * Toggle a specific digit in a binary number.
 *
 * @param bits The original number
 * @param digit The digit to toggle
 * @returns The new number with the toggled bit.
 */
export const toggleBitInBinary = (bits: BinaryNumber, digit: number): BinaryNumber => {
    if (digit < 0 || digit >= bits.length) {
        throw new Error(`Cannot toggle bit ${digit} for a binary number of ${bits.length} digits`)
    }

    return bits.map((v, i) => i === digit ? !v : v);
}

/**
 * Convert a boolean bit to a printable value.
 *
 * @param bit The bit value
 * @returns The string representation (1 or 0)
 */
export const bitToString = (bit: boolean): string => bit ? '1' : '0';

/**
 * Create a printable representation of a binary number.
 *
 * @param binary The binary number
 * @returns A string representation
 */
export const binaryToString = (binary: BinaryNumber) => binary.map(bitToString).join('');

/**
 * Parse a binary string into a binary number.
 *
 * @param value The string value
 * @returns The binary number
 */
export const binaryFromString = (value: string): BinaryNumber =>
    value.replace(/\s/g, '').split('')
        .map(x => parseInt(x, 2) === 1);

/**
 * Shift a binary number in a given direction.
 *
 * @param binary The binary number
 * @param direction The direction to shift it
 * @param gapFill The value to use to fill the vacated spots (defaults to false).
 * @returns The shifted number.
 */
export const shiftBinaryInteger = (
    binary: BinaryNumber,
    direction: ShiftDirection,
    gapFill: boolean = DEFAULT_BIT_VALUE
) => direction === ShiftDirection.left ? shiftLeft(binary, gapFill) : shiftRight(binary, gapFill);

/**
 * Multiply a number by 2 by shifting it's bits to the left.
 *
 * @param binary The number to shift left
 * @returns The binary number shifted, filled with zeroes on the right hand side
 */
export const shiftLeft = (
    binary: BinaryNumber,
    gapFill: boolean = DEFAULT_BIT_VALUE
): ResultWithFlag =>
({
    result: binary.map((_, i) => i === binary.length - 1 ? gapFill : binary[i + 1]),
    flag: binary[0]
})

/**
 * Divide a number by 2 by shifting it's bits to the left.
 *
 * @param binary The number to shift right
 * @returns The binary number shifted, filled with zeroes on the left hand side
 */
export const shiftRight = (
    binary: BinaryNumber,
    gapFill: boolean = DEFAULT_BIT_VALUE
): ResultWithFlag => ({
    result: binary.map((_, i) => i === 0 ? gapFill : binary[i - 1]),
    flag: binary[binary.length - 1]
})

/**
 * Convert a binary number to denary.
 *
 * @param bits The binary number
 * @returns The denary equivalent.
 */
export const getDenaryFromBinaryInteger = (bits: BinaryNumber) => bits.reduce((acc, curr) => (2 * acc) + (curr ? 1 : 0), 0)

/**
 *
 * @param denary
 * @param bits
 */
export const getBinaryIntegerFromDenary = (denary: number, bits: number = DEFAULT_BIT_WIDTH): ResultWithFlag => {

    const result = createBinaryNumber(bits);
    let index = result.length - 1;
    while (denary > 0 && index >= 0) {
        result[index] = (denary % 2 === 1);
        denary = Math.floor(denary / 2);
        index--;
    }

    return {
        result,
        flag: denary > 0
    }
}

/**
 * Add two binary numbers together.
 *
 * @param a The first number to add
 * @param b The second number to add
 * @returns The result of the addition, it includes the number and a flag to indicate if overflow occurred
 */
export const binaryAddition = (a: BinaryNumber, b: BinaryNumber): ResultWithFlag => {
    if (a.length !== b.length) throw new Error('Cannot add numbers with different bit lengths');

    const result = createBinaryNumber(a.length);
    let currentCarry: boolean = false;

    for (let digit = a.length - 1; digit >= 0; digit--) {
        const { sum, carry } = fullAdder(a[digit], b[digit], currentCarry);
        result[digit] = sum;
        currentCarry = carry;
    }

    return {
        result,
        flag: currentCarry
    };
}