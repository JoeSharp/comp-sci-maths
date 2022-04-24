export const DEFAULT_MANTISSA_BITS = 8;
export const DEFAULT_EXPONENT_BITS = 4;
export const DEFAULT_BIT_VALUE = false;
export const DEFAULT_BIT_WIDTH = 8;
export const DEFAULT_BITS_AFTER_POINT = 4;

export type BinaryNumber = boolean[];

export interface FloatingPointNumber {
    mantissa: BinaryNumber;
    exponent: BinaryNumber;
}

export interface FixedPointNumber {
    bits: BinaryNumber;
    bitsAfterPoint: number;
}

/**
 * Used to store the result of binary operation, and a flag to indicate if
 * overflow or underflow occurred.
 * Overflow is when a number gets too big to fit into the bits
 * Underflow is when a number gets rounded as digits drop off the right
 */
export interface ResultWithFlag {
    result: BinaryNumber,
    flag: boolean
}