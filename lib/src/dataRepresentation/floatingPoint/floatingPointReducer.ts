export type BinaryDigit = 0 | 1;

export type BinaryNumber = BinaryDigit[];

export interface FloatingPointState {
    mantissa: BinaryNumber;
    exponent: BinaryNumber;
}

export interface ShiftAction {
    type: 'shift',
    direction: BinaryDigit
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

export const toggleBit = (bit: BinaryDigit): BinaryDigit => bit === 0 ? 1 : 0;

export const toggleBitInNumber = (bits: BinaryNumber, digit: number): BinaryNumber => {
    if (digit < 0 || digit >= bits.length) {
        throw new Error(`Cannot toggle bit ${digit} for a binary number of ${bits.length} digits`)
    }

    return bits.map((v, i) => i === digit ? toggleBit(v) : v);
}

export const toggleBitInState = (state: FloatingPointState, component: FloatingPointComponent, digit: number): FloatingPointState => {
    switch (component) {
        case 'exponent':
            return {
                ...state,
                exponent: toggleBitInNumber(state.exponent, digit)
            }
        case 'mantissa':
            return {
                ...state,
                mantissa: toggleBitInNumber(state.mantissa, digit)
            }
    }
}

export const setMantissa = (state: FloatingPointState, mantissa: BinaryNumber): FloatingPointState => {
    return {
        ...state,
        mantissa
    }
}

export const setExponent = (state: FloatingPointState, exponent: BinaryNumber): FloatingPointState => {
    return {
        ...state,
        exponent
    }
}

export const shift = (state: FloatingPointState, direction: BinaryDigit): FloatingPointState => {
    return state;
}

export const binaryString = (number: BinaryNumber) => number.join('');

/**
 * Used to store the result of binary operation, and a flag to indicate if
 * overflow or underflow occurred.
 * Overflow is when a number gets too big to fit into the bits
 * Underflow is when a number gets rounded as digits drop off the right
 */
interface ResultWithFlag {
    result: BinaryNumber,
    flag: boolean
}

/**
 * Multiply a number by 2 by shifting it's bits to the left.
 * 
 * @param binary The number to shift left
 * @returns The binary number shifted, filled with zeroes on the right hand side
 */
export const shiftLeft = (binary: BinaryNumber): ResultWithFlag =>
({
    result: binary.map((_, i) => i === binary.length - 1 ? 0 : binary[i + 1]),
    flag: binary[0] === 1
})

/**
 * Divide a number by 2 by shifting it's bits to the left.
 * 
 * @param binary The number to shift right
 * @returns The binary number shifted, filled with zeroes on the left hand side
 */
export const shiftRight = (binary: BinaryNumber): ResultWithFlag => ({
    result: binary.map((_, i) => i === 0 ? 0 : binary[i - 1]),
    flag: binary[binary.length - 1] === 1
})

/**
 * Create a binary number of a given width.
 * 
 * @param digits The number of binary digits
 * @param defaultValue The value to use for each digit
 * @returns The binary number (array of BinaryDigits)
 */
export const createBinaryNumber = (digits: number, defaultValue: BinaryDigit = 0): BinaryNumber =>
    Array(digits).fill(null).map(() => defaultValue);

/**
 * Create a new blank floating point number.
 * 
 * @param mantissaBits The number of bits for the mantissa
 * @param exponentBits The number of bits for the exponent
 * @returns The full floating point number
 */
export const createFloatingPoint = (mantissaBits: number, exponentBits: number): FloatingPointState => ({
    mantissa: createBinaryNumber(mantissaBits),
    exponent: createBinaryNumber(exponentBits)
})

/**
 * Convert a 2's complement binary number to a decimal number.
 * @param bits The bits of the number, from the MSB (index 0) to LSB (index length - 1)
 * @returns The decimal conversion. From -2^(length-1) to 2^(length-1) - 1
 */
export const getDecimalFrom2sComplement = (bits: BinaryNumber): number =>
    bits
        .filter((_, i) => i > 0)
        .reduce((acc, curr, i) => acc + (curr * Math.pow(2, bits.length - 2 - i)), bits[0] * -Math.pow(2, bits.length - 1))

export const reducer = (state: FloatingPointState, action: FloatingPointAction): FloatingPointState => {

    switch (action.type) {
        case 'setMantissa': return setExponent(state, action.mantissa);
        case 'setExponent': return setExponent(state, action.exponent);
        case 'shift': return shift(state, action.direction);
        case 'toggle': return toggleBitInState(state, action.component, action.digit);
    }

}

export default {
    reducer
}