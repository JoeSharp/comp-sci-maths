
export const DEFAULT_MANTISSA_BITS = 8;
export const DEFAULT_EXPONENT_BITS = 4;
export const DEFAULT_BIT_VALUE = false;
export const DEFAULT_BIT_WIDTH = 8;

export type BinaryNumber = boolean[];

export interface FloatingPointNumber {
    mantissa: BinaryNumber;
    exponent: BinaryNumber;
}

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
    `${sign}.${binaryToString(mantissa)} exp ${binaryToString(exponent)}`

/**
 * Create a printable representation of a binary number.
 * 
 * @param number The binary number
 * @returns A string representation
 */
export const binaryToString = (number: BinaryNumber) => number.map(b => b ? '1' : '0').join('');

/**
 * Parse a binary string into a binary number.
 * 
 * @param value The string value
 * @returns The binary number
 */
export const binaryFromString = (value: string): BinaryNumber =>
    value.replace(/\s/g, '').split('')
        .map(x => parseInt(x) === 1);

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
    result: binary.map((_, i) => i === binary.length - 1 ? false : binary[i + 1]),
    flag: binary[0]
})

/**
 * Divide a number by 2 by shifting it's bits to the left.
 * 
 * @param binary The number to shift right
 * @returns The binary number shifted, filled with zeroes on the left hand side
 */
export const shiftRight = (binary: BinaryNumber): ResultWithFlag => ({
    result: binary.map((_, i) => i === 0 ? false : binary[i - 1]),
    flag: binary[binary.length - 1]
})

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
export const getDecimalFromTwosComplement = (bits: BinaryNumber): number =>
    bits
        .filter((_, i) => i > 0)
        .reduce((acc, curr, i) => acc + (curr ? Math.pow(2, bits.length - 2 - i) : 0), bits[0] ? -Math.pow(2, bits.length - 1) : 0)

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
 * Takes the twos complement of the input number.
 * This effectively converts between positive and negative numbers.
 * 
 * @param binary The input binary number
 * @returns The twos complement of the input. Flag indicates if we converted the extreme negative to +ve, for which there isn't room
 */
export const getTwosComplement = (binary: BinaryNumber): ResultWithFlag => {
    const one = createBinaryNumber(binary.length);
    one[binary.length - 1] = true;

    const { result } = binaryAddition(getOnesComplement(binary), one);
    return {
        result,
        // Special case, if the number is the largest negative, then we cannot represent the equivalent positive number
        flag: binary[0] && countOnes(...binary) === 1
    }
}

/**
 * Convert a decimal number into twos complement binary
 * 
 * @param decimal The decimal number to convert
 * @param bits The number of bits in the output number
 * @returns The twos complement binary number
 */
export const getTwosComplementFromDecimal = (decimal: number, bits: number): ResultWithFlag => {
    let result = createBinaryNumber(bits);

    const isNegative = decimal < 0;
    decimal = isNegative ? decimal * -1 : decimal;

    let index = result.length - 1;
    let flag = false;
    while (decimal > 0 && index >= 0) {
        if (decimal % 2 !== 0) {
            result[index] = true;
        }
        decimal = Math.floor(decimal / 2);
        index--;
    }

    if (decimal > 0) flag = true;

    if (isNegative) {
        const twosComplement = getTwosComplement(result);
        result = twosComplement.result;
        // if (twosComplement.flag) flag = true;
    }

    return { result, flag };
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
    const mantissaDec = getDecimalFromTwosComplement(mantissa) / Math.pow(2, mantissa.length - 1);
    const exponentDec = getDecimalFromTwosComplement(exponent);
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