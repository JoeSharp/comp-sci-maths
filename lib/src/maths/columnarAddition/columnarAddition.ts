/**
 * The values will store Least Significant Digit in Index 0
 */
export type Digits = number[];

/**
 * Any number of inputs can be summed
 * The number of digits in the result should match the number in the carries.
 */
export interface ColumnarAdditionState {
  inputs: Digits[];
  result: Digits;
  carries: Digits;
}

/**
 * Break out a number into digits
 *
 * @param value the number to convert
 * @returns A structure that contains the digits
 */
export const expandDigits = (base: number, value: number): Digits => {
  const digits: Digits = [];

  while (value > 0) {
    digits.push(value % base);
    value = Math.floor(value / base);
  }

  return digits;
};

export const expandDenaryDigits = (value: number) => expandDigits(10, value);
export const expandOctalDigits = (value: number) => expandDigits(8, value);
export const expandBinaryDigits = (value: number) => expandDigits(2, value);

export const createWorkedAddition = (
  base: number,
  ...rawInputs: number[]
): ColumnarAdditionState => {
  let index = 0;
  const result: Digits = [];
  const carries: Digits = [];
  let carry = 0;
  const inputs = rawInputs.map((i) => expandDigits(base, i));

  while (true) {
    const digitsToAdd = inputs
      .filter((input) => input.length > index)
      .map((input) => input[index]);
    index++;

    // Have we exhausted the digits?
    if (digitsToAdd.length === 0) break;

    // Calculate the total for this column
    const totalForDigit = digitsToAdd.reduce((acc, curr) => acc + curr, carry);

    // Split into the result and the carry
    carry = Math.floor(totalForDigit / base);
    carries.push(carry);
    result.push(totalForDigit % base);
  }

  // If there is a non-zero carry at the end, push it onto the result
  if (carries.length > 0 && carries[carries.length - 1]) {
    result.push(carries[carries.length - 1]);
    carries.push(0);
  }

  return {
    inputs,
    result,
    carries,
  };
};

export const createDenaryWorkedAddition = (...inputs: number[]) =>
  createWorkedAddition(10, ...inputs);
export const createOctalWorkedAddition = (...inputs: number[]) =>
  createWorkedAddition(8, ...inputs);
export const createBinaryWorkedAddition = (...inputs: number[]) =>
  createWorkedAddition(2, ...inputs);
