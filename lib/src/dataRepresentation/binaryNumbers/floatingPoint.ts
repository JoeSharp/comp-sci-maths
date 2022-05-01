import {
    binaryAddition,
    binaryToString,
    bitToString,
    createBinaryNumber,
    shiftBinaryInteger,
    toggleBitInBinary
} from "./binaryIntegers";
import { xor } from "./logicalOperators";
import { getDenaryFromTwosComplementInteger, getTwosComplementIntegerFromDenary } from "./twosComplement";
import {
    BinaryNumber,
    DEFAULT_EXPONENT_BITS,
    DEFAULT_MANTISSA_BITS,
    FloatingPointNumber,
    ShiftDirection
} from "./types";

export interface ShiftAction {
    type: 'shift',
    direction: ShiftDirection
}

export type FloatingPointComponent = 'mantissa' | 'exponent';

export interface ToggleBitAction {
    type: 'toggle',
    component: FloatingPointComponent;
    digit: number;
}

export interface SetMantissaAction {
    type: 'setMantissa',
    mantissa: BinaryNumber
}

export interface SetExponentAction {
    type: 'setExponent',
    exponent: BinaryNumber
}

export interface SetDenaryAction {
    type: 'setDenary',
    denary: number
}

export type FloatingPointAction = ShiftAction
    | SetMantissaAction
    | SetExponentAction
    | ToggleBitAction
    | SetDenaryAction;

/**
 * Toggle a bit within a floating point number.
 *
 * @param fp The floating point number
 * @param component The component we are toggling a bit in
 * @param digit The digit we are toggling within that component
 * @returns The new floating point number with the required bit toggled.
 */
export const toggleBitInFloatingPoint = (
    { mantissa, exponent }: FloatingPointNumber,
    component: FloatingPointComponent,
    digit: number
): FloatingPointNumber => {
    switch (component) {
        case 'exponent':
            return {
                mantissa,
                exponent: toggleBitInBinary(exponent, digit)
            }
        case 'mantissa':
            return {
                mantissa: toggleBitInBinary(mantissa, digit),
                exponent
            }
    }
}

/**
 * Replace the mantissa with a new value
 *
 * @param fp The floating point number
 * @param mantissa The new mantissa
 * @returns The new floating point number
 */
export const setMantissa = ({ exponent }: FloatingPointNumber, mantissa: BinaryNumber): FloatingPointNumber => {
    return {
        mantissa,
        exponent
    }
}

/**
 * Replace the exponent with a new value
 *
 * @param fp The floating point number
 * @param exponent The new exponent
 * @returns The new floating point number
 */
export const setExponent = ({ mantissa }: FloatingPointNumber, exponent: BinaryNumber): FloatingPointNumber => {
    return {
        mantissa,
        exponent
    }
}

/**
 * This takes the floating point number and increments or decrements the exponent.
 * It then adjust the mantissa to keep the value the same.
 *
 * @param state The floating point number
 * @param direction true = increment exponent, false = decrement exponent
 * @returns the shifted floating point number
 */
export const shift = (fp: FloatingPointNumber, direction: ShiftDirection): FloatingPointNumber => {
    const { result: increment } = getTwosComplementIntegerFromDenary(direction ? 1 : -1, fp.exponent.length)
    const { result: exponent, flag: incrementFlag } = binaryAddition(fp.exponent, increment);
    const { result: mantissa, flag: mantissaFlag } = shiftBinaryInteger(fp.mantissa, direction);

    return {
        mantissa,
        exponent,
    };
}

/**
 * Create a printable representation of a floating point number.
 *
 * @param fp Floating point number
 * @returns The string representation
 */
export const floatingPointToString = ({ mantissa: [sign, ...mantissa], exponent }: FloatingPointNumber): string =>
    `${bitToString(sign)}.${binaryToString(mantissa)} exp ${binaryToString(exponent)}`

/**
 * Create a new blank floating point number.
 *
 * @param mantissaBits The number of bits for the mantissa
 * @param exponentBits The number of bits for the exponent
 * @returns The full floating point number
 */
export const createFloatingPoint = (
    mantissaBits: number = DEFAULT_MANTISSA_BITS,
    exponentBits: number = DEFAULT_EXPONENT_BITS
): FloatingPointNumber => ({
    mantissa: createBinaryNumber(mantissaBits),
    exponent: createBinaryNumber(exponentBits)
})

/**
 * Determines if a floating point number is normalised.
 * It is normalised if the first two digits are 0.1 OR 1.0.
 * This is effectively an XOR on those most significant bits
 *
 * @param fp The floating point number to evaluate
 * @returns True if the floating point representation is normalised.
 */
export const isNormalised = ({ mantissa: [sign, msb] }: FloatingPointNumber): boolean => xor(sign, msb);

/**
 * Normalise a twos complement value.
 *
 * @param input A Floating point number that may not be normalised
 * @returns The normalised form of the same value.
 */
export const normalise = (
    fp: FloatingPointNumber
): FloatingPointNumber => {
    let maxIters = fp.mantissa.length;

    while (!isNormalised(fp) && maxIters > 0) {
        fp = shift(fp, ShiftDirection.left);

        maxIters--;
    }

    return fp;
}

/**
 * Convert a denary number into it's normalised floating point representation.
 * TODO - Does not work yet.
 * @param denary The number to turn into a floating point
 * @param mantissaBits Number of bits to allocate to the mantissa
 * @param exponentBits Number of bits to allocate to the exponent
 * @returns The floating point representation.
 */
export const getFloatingPointFromDenary = (
    denary: number,
    mantissaBits: number = DEFAULT_MANTISSA_BITS,
    exponentBits: number = DEFAULT_EXPONENT_BITS
): FloatingPointNumber => {
    if (denary === 0) return createFloatingPoint(mantissaBits, exponentBits);

    let exponentValue = 0;
    while (Math.abs(denary) > 1 || Math.abs(denary) < 0.5) {
        if (Math.abs(denary) > 1) {
            denary /= 2;
            exponentValue++;
        } else {
            denary *= 2;
            exponentValue--;
        }
    }

    // Push the denary number back up 'mantissa bits - 1' since there is then the implied decimal point.
    const { result: mantissa } = getTwosComplementIntegerFromDenary(denary * Math.pow(2, mantissaBits - 1), mantissaBits);
    const { result: exponent } = getTwosComplementIntegerFromDenary(exponentValue, exponentBits);

    return {
        mantissa,
        exponent
    };
}

/**
 * Convert a floating point number to a denary number.
 *
 * @param fp The floating point number
 * @returns The denary number that this binary represents.
 */
export const getDenaryFromFloatingPoint = ({ mantissa, exponent }: FloatingPointNumber): number => {
    const mantissaDec = getDenaryFromTwosComplementInteger(mantissa) / Math.pow(2, mantissa.length - 1);
    const exponentDec = getDenaryFromTwosComplementInteger(exponent);
    return mantissaDec * Math.pow(2, exponentDec);
}

export const reducer = (state: FloatingPointNumber, action: FloatingPointAction): FloatingPointNumber => {

    switch (action.type) {
        case 'setDenary': return getFloatingPointFromDenary(action.denary);
        case 'setMantissa': return setExponent(state, action.mantissa);
        case 'setExponent': return setExponent(state, action.exponent);
        case 'shift': return shift(state, action.direction);
        case 'toggle': return toggleBitInFloatingPoint(state, action.component, action.digit);
    }

}

export default {
    reducer
}