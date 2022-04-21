
export const DEFAULT_MANTISSA_BITS = 8;
export const DEFAULT_EXPONENT_BITS = 4;

export type BinaryDigit = 0 | 1;

export type BinaryNumber = BinaryDigit[];

export interface FloatingPointNumber {
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

/**
 * Given a bit, toggles it to the other state.
 * @param bit The input bit
 * @returns The toggled output bit
 */
export const toggleBit = (bit: BinaryDigit): BinaryDigit => bit === 0 ? 1 : 0;

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

    return bits.map((v, i) => i === digit ? toggleBit(v) : v);
}

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

export const shift = (state: FloatingPointNumber, direction: BinaryDigit): FloatingPointNumber => {
    return state;
}

/**
 * Create a printable representation of a floating point number.
 * 
 * @param fp Floating point number
 * @returns The string representation
 */
export const floatingPointToString = ({ mantissa: [sign, ...mantissa], exponent }: FloatingPointNumber): string =>
    `${sign}.${binaryToString(mantissa)} exp ${binaryToString(exponent)}`

/**
 * Create a printable representation of a binary number.
 * 
 * @param number The binary number
 * @returns A string representation
 */
export const binaryToString = (number: BinaryNumber) => number.join('');

/**
 * Parse a binary string into a binary number.
 * 
 * @param value The string value
 * @returns The binary number
 */
export const binaryFromString = (value: string): BinaryNumber =>
    value.split('')
        .map(x => parseInt(x) as BinaryDigit);

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
export const createFloatingPoint = (
    mantissaBits: number = DEFAULT_MANTISSA_BITS,
    exponentBits: number = DEFAULT_EXPONENT_BITS
): FloatingPointNumber => ({
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

/**
 * Inverts all the bits in a binary number.
 * 
 * @param binary The binary number to take the 1's complement
 * @returns The 1s complement of the input number.
 */
export const get1sComplement = (binary: BinaryNumber): BinaryNumber => {
    return binary.map(x => toggleBit(x));
}

/**
 * Convert a decimal number into 2s complement binary
 * 
 * @param decimal The decimal number to convert
 * @param bits The number of bits in the output number
 * @returns The twos complement binary number
 */
export const get2sComplementFromDecimal = (decimal: number, bits: number): BinaryNumber => {
    const result = createBinaryNumber(bits);

    return result;
}

/**
 * Convert a decimal number into it's normalised floating point representation.
 * TODO - Does not work yet.
 * @param decimal The number to turn into a floating point
 * @param mantissaBits Number of bits to allocate to the mantissa
 * @param exponentBits Number of bits to allocate to the exponent
 * @returns The floating point representation.
 */
export const getFloatingPointFromDecimal = (
    decimal: number,
    mantissaBits: number = DEFAULT_MANTISSA_BITS,
    exponentBits: number = DEFAULT_EXPONENT_BITS
): FloatingPointNumber => {
    if (decimal === 0) return createFloatingPoint(mantissaBits, exponentBits);

    const original = decimal;

    let exponentValue = 0;
    while (Math.abs(decimal) > 1 || Math.abs(decimal) < 0.1) {
        if (Math.abs(decimal) > 1) {
            decimal /= 2;
            exponentValue++;
        } else {
            decimal *= 2;
            exponentValue--;
        }
    }

    const mantissa = decimal.toString(2).padEnd(mantissaBits, '0');
    const exponent = exponentValue.toString(2).padStart(exponentBits, '0');

    console.log({ original, decimal, exponentValue, mantissa, exponent });

    return {
        mantissa: binaryFromString(mantissa),
        exponent: binaryFromString(exponent)
    };
}

/**
 * Convert a floating point number to a decimal number.
 * 
 * @param fp The floating point number
 * @returns The decimal number that this binary represents.
 */
export const getDecimalFromFloatingPoint = ({ mantissa, exponent }: FloatingPointNumber): number => {
    const mantissaDec = getDecimalFrom2sComplement(mantissa) / Math.pow(2, mantissa.length - 1);
    const exponentDec = getDecimalFrom2sComplement(exponent);
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