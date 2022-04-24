import {
    binaryAddition,
    binaryFromString,
    binaryToString,
    bitToString,
    createBinaryNumber,
    getBinaryIntegerFromDenary,
    toggleBitInBinary
} from "./binaryIntegers";
import { countOnes } from "./logicalOperators";
import { getDenaryFromTwosComplement } from "./negativeNumbers";
import {
    BinaryNumber,
    DEFAULT_BITS_AFTER_POINT,
    DEFAULT_BIT_WIDTH,
    DEFAULT_EXPONENT_BITS,
    DEFAULT_MANTISSA_BITS,
    FixedPointNumber,
    FloatingPointNumber,
    ResultWithFlag
} from "./types";

export interface ShiftAction {
    type: 'shift',
    direction: boolean
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

export type FloatingPointAction = ShiftAction | SetMantissaAction | SetExponentAction | ToggleBitAction;

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

export const shift = (state: FloatingPointNumber, direction: boolean): FloatingPointNumber => {
    return state;
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

    const original = denary;

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

    const mantissaString = denary.toString(2).padEnd(mantissaBits, '0').replace('-0', '1');
    const exponentString = exponentValue.toString(2).padStart(exponentBits, '0').replace('-0', '1');

    const mantissa = binaryFromString(mantissaString);
    const exponent = binaryFromString(exponentString);

    console.log({ original, mantissaValue: denary, exponentValue: exponentValue, mantissa: mantissaString, exponent: exponentString })

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
    const mantissaDec = getDenaryFromTwosComplement(mantissa) / Math.pow(2, mantissa.length - 1);
    const exponentDec = getDenaryFromTwosComplement(exponent);
    return mantissaDec * Math.pow(2, exponentDec);
}

export const reducer = (state: FloatingPointNumber, action: FloatingPointAction): FloatingPointNumber => {

    switch (action.type) {
        case 'setMantissa': return setExponent(state, action.mantissa);
        case 'setExponent': return setExponent(state, action.exponent);
        case 'shift': return shift(state, action.direction);
        case 'toggle': return toggleBitInFloatingPoint(state, action.component, action.digit);
    }

}

export default {
    reducer
}