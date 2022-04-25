import { binaryAddition, getBinaryIntegerFromDenary } from "./binaryIntegers";
import { countOnes } from "./logicalOperators";
import { BinaryNumber, ResultWithFlag } from "./types";

/**
 * Inverts all the bits in a binary number.
 *
 * @param binary The binary number to take the 1's complement
 * @returns The 1s complement of the input number.
 */
export const getOnesComplement = (binary: BinaryNumber): BinaryNumber => {
    return binary.map(x => !x);
}

/**
 * Convert a 2's complement binary number to a denary number.
 * @param bits The bits of the number, from the MSB (index 0) to LSB (index length - 1)
 * @returns The denary conversion. From -2^(length-1) to 2^(length-1) - 1
 */
export const getDenaryFromTwosComplementInteger = (bits: BinaryNumber): number =>
    bits
        .filter((_, i) => i > 0)
        .reduce((acc, curr, i) => acc + (curr ? Math.pow(2, bits.length - 2 - i) : 0), bits[0] ? -Math.pow(2, bits.length - 1) : 0)

/**
 * Takes the twos complement of the input number.
 * This effectively converts between positive and negative numbers.
 *
 * @param binary The input binary number
 * @returns The twos complement of the input. Flag indicates if we converted the extreme negative to +ve, for which there isn't room
 */
export const getTwosComplement = (binary: BinaryNumber): ResultWithFlag => {
    const { result: one } = getBinaryIntegerFromDenary(1, binary.length);

    const { result } = binaryAddition(getOnesComplement(binary), one);
    return {
        result,
        // Special case, if the number is the largest negative, then we cannot represent the equivalent positive number
        flag: binary[0] && countOnes(...binary) === 1
    }
}

/**
 * Convert a denary number into twos complement binary
 *
 * @param denary The denary number to convert
 * @param bits The number of bits in the output number
 * @returns The twos complement binary number
 */
export const getTwosComplementIntegerFromDenary = (denary: number, bits: number): ResultWithFlag => {
    const isNegative = denary < 0;
    denary = isNegative ? denary * -1 : denary;

    const binary = getBinaryIntegerFromDenary(denary, bits);
    let { result } = binary;

    if (isNegative) {
        const twosComplement = getTwosComplement(result);
        result = twosComplement.result;
    }

    return { result, flag: binary.flag };
}