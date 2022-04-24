import { binaryToString, createBinaryNumber } from "./binaryIntegers";
import { DEFAULT_BITS_AFTER_POINT, DEFAULT_BIT_WIDTH, FixedPointNumber } from "./types";

/**
 * Create a new fixed point binary number
 *
 * @param digits The number of digits in total
 * @param bitsAfterPoint The number of bits that are after the point.
 * @returns The representation of the fixed point binary number.
 */
export const createFixedPointBinaryNumber = (
    digits: number = DEFAULT_BIT_WIDTH,
    bitsAfterPoint: number = DEFAULT_BITS_AFTER_POINT
): FixedPointNumber => {
    if (bitsAfterPoint > digits) throw new Error('Cannot have more digits after the point than we have digits');

    return {
        bits: createBinaryNumber(digits),
        bitsAfterPoint
    }
}

/**
 * Create a printable representation of a fixed point number.
 *
 * @param fp Fixed point number
 * @returns The string representation
 */
export const fixedPointToString = ({ bits, bitsAfterPoint }: FixedPointNumber): string => {
    return `${binaryToString(bits.slice(0, bitsAfterPoint - 1))}.${bits.slice(-bitsAfterPoint)}`
}


/**
 * Convert a fixed point number into it's denary value.
 *
 * @param fp the Fixed point number
 * @returns The decimal equivalent.
 */
export const getDenaryFromFixedPoint = (
    { bits, bitsAfterPoint }: FixedPointNumber
): number => {
    let wholePart: number = 0;
    const bitsBeforePoint = bits.length - bitsAfterPoint;

    for (let i = 0; i < bitsBeforePoint; i++) {
        wholePart *= 2;

        if (bits[i]) {
            wholePart += 1;
        }
    }

    let fractionalPart = 0;
    for (let i = bitsBeforePoint; i < bits.length; i++) {
        fractionalPart /= 2;

        if (bits[i]) {
            fractionalPart += 0.5;
        }
    }

    return wholePart + fractionalPart;
}