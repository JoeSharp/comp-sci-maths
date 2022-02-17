import { StringReporter, NamedDivisibilityRule } from "types";

/**
 * This function uses the mod operator to check if a number is divisible.
 * It will be used to verify the results of the more 'digit exploration' based techniques
 * in the other functions.
 *
 * @param value The value to check
 * @param divisor The divisor we are checking aginst
 * @returns boolean to indicate if value can be divided with no remainder
 */
export function isDivisibleBy(value: number, divisor: number): boolean {
  return value % divisor === 0;
}

/**
 * Tests if a number is prime by successively attempting to divide it by
 * all the numbers from 2 to the square root of the given number.
 *
 * @param value The value to check
 * @returns boolean to indicate if prime
 */
export function isPrime(value: number) {
  // Calculate the square root, any factors will exist below this value
  // Round up so we include the square root...
  const sqRoot = Math.ceil(Math.sqrt(value));

  // From 2 up to the square root, check for divisibility
  for (let i = 2; i <= sqRoot; i++) {
    if (isDivisibleBy(value, i)) {
      return false;
    }
  }

  return true;
}

/**
 * Given a numerical value, it deconstructs the number into an array of discrete digits.
 *
 * @param value The value to deconstruct
 * @param radix The radix to use in the representation, defaults to 10
 * @returns The list of digits (as numbers)
 */
export function getDigits(value: number, radix: number = 10): number[] {
  if (value < 0) {
    return [];
  }

  const asStr = value.toString(radix);
  const digits: string[] = [];
  for (const c of asStr) {
    digits.push(c);
  }
  return digits.map((c) => parseInt(c, radix));
}

/**
 * Examines a number to determine if it is divisible by 2
 * Uses the algorithm students are expected to be familiar with in KS3
 *
 * @param value The value to examine
 * @param report A callback for textual descriptions of the steps
 */
export function dividesBy2(value: number, report: StringReporter): boolean {
  report(`Is ${value} divisible by 2?`);

  const digits = getDigits(value);
  const lsd = digits[digits.length - 1];

  const isDiv = [8, 6, 4, 2, 0].includes(lsd);
  const isDivMod = isDivisibleBy(value, 2);
  report(
    `Least Significant Digit is ${lsd}, divisible by 2?: ${isDiv}, Agrees with mod? ${isDiv === isDivMod
    }`
  );

  return isDiv;
}

/**
 * Examines a number to determine if it is divisible by 3
 * Uses the algorithm students are expected to be familiar with in KS3
 *
 * @param value The value to examine
 * @param report A callback for textual descriptions of the steps
 */
export function dividesBy3(value: number, report: StringReporter): boolean {
  report(`Is ${value} divisible by 3?`);

  let currentValue = value;
  let digits = getDigits(currentValue);
  while (digits.length > 1 && currentValue > 0) {
    currentValue = digits.reduce((acc, curr) => acc + curr, 0);

    report(`Digits ${digits.join(", ")} add up to ${currentValue}`);

    digits = getDigits(currentValue);
  }

  const isDiv = [9, 6, 3, 0].includes(currentValue);
  const isDivMod = isDivisibleBy(value, 3);
  report(
    `Finished on Value ${currentValue}, divisible by 3?: ${isDiv}, Agrees with mod? ${isDiv === isDivMod
    }`
  );

  return isDiv;
}

/**
 * Examines a number to determine if it is divisible by 5
 * Uses the algorithm students are expected to be familiar with in KS3
 *
 * @param value The value to examine
 * @param report A callback for textual descriptions of the steps
 */
export function dividesBy5(value: number, report: StringReporter): boolean {
  report(`Is ${value} divisible by 5?`);

  const digits = getDigits(value);
  const lsd = digits[digits.length - 1]; // Least Significant Digit

  const isDiv = [5, 0].includes(lsd);
  const isDivMod = isDivisibleBy(value, 5);
  report(
    `Least Significant Digit is ${lsd}, divisible by 5?: ${isDiv}, Agrees with mod? ${isDiv === isDivMod
    }`
  );

  return isDiv;
}

export function dividesBy6(value: number, report: StringReporter): boolean {
  report(`Check if ${value} is divisible by 2`);
  const isDivBy2 = dividesBy2(value, report);
  report(`Check if ${value} is divisible by 3`);
  const isDivBy3 = dividesBy3(value, report);

  const isDivMod = isDivisibleBy(value, 6);
  const isDiv = isDivBy2 && isDivBy3;
  report(
    `${value} is divisible by 6 ${isDivMod} if divisible by 2 ${isDivBy2} and 3 ${isDivBy3} = ${isDiv}`
  );

  return isDiv;
}

/**
 * Examines a number to determine if it is divisible by 7
 * Uses the algorithm students are expected to be familiar with in KS3
 *
 * @param value The value to examine
 * @param report A callback for textual descriptions of the steps
 */
export function dividesBy7(value: number, report: StringReporter): boolean {
  report(`Is ${value} divisible by 7?`);

  let currentValue = value;
  let digits = getDigits(currentValue);
  while (digits.length > 2 && currentValue > 0) {
    const lsd = digits[digits.length - 1];
    const msds = Math.floor(currentValue / 10); // lops off the last digit

    report(
      `${currentValue}, Double ${lsd} is ${lsd * 2}, ${msds} - ${lsd * 2} = ${msds - lsd * 2
      }`
    );
    currentValue = msds - lsd * 2;

    digits = getDigits(currentValue);
  }

  const isDiv = isDivisibleBy(currentValue, 7);
  const isDivMod = isDivisibleBy(value, 7);
  report(
    `Finished on Value ${currentValue}, divisible by 7?: ${isDiv}, Agrees with mod? ${isDiv === isDivMod
    }`
  );

  return isDiv;
}

// Subtract the last digit from the rest. The result must be divisible by 11.
/**
 * Examines a number to determine if it is divisible by 7
 * Uses the algorithm students are expected to be familiar with in KS3
 *
 * @param value The value to examine
 * @param report A callback for textual descriptions of the steps
 */
export function dividesBy11(value: number, report: StringReporter): boolean {
  report(`Is ${value} divisible by 11?`);

  let currentValue = value;
  let digits = getDigits(currentValue);
  while (digits.length > 2 && currentValue > 0) {
    const lsd = digits[digits.length - 1];
    const msds = Math.floor(currentValue / 10); // lops off the last digit

    report(`${currentValue}, ${msds} - ${lsd} = ${msds - lsd}`);
    currentValue = msds - lsd;

    digits = getDigits(currentValue);
  }

  const isDiv = isDivisibleBy(currentValue, 11);
  const isDivMod = isDivisibleBy(value, 11);
  report(
    `Finished on Value ${currentValue}, divisible by 11?: ${isDiv}, Agrees with mod? ${isDiv === isDivMod
    }`
  );

  return isDiv;
}

export const defaultNamedDivisibilityRule: NamedDivisibilityRule = {
  factor: 1,
  explanation: ["Default divisibility by 1"],
  rule: (v, reporter) => {
    reporter("Everything is divisible by 1");
    return true;
  },
};

export const divisibilityRules: NamedDivisibilityRule[] = [
  {
    factor: 2,
    explanation: ["Last digit is even"],
    rule: dividesBy2,
  },
  {
    factor: 3,
    explanation: [
      "Sum all the digits",
      "is result divisible by 3?",
      "Repeat until down to a single digit number",
    ],
    rule: dividesBy3,
  },
  {
    factor: 6,
    explanation: ["Divisible by 2 and 3"],
    rule: dividesBy6,
  },
  {
    factor: 5,
    explanation: ["Last digit is 0 or 5"],
    rule: dividesBy5,
  },
  {
    factor: 7,
    explanation: [
      "Take off least significant digit (lsd)",
      "Calculate remaining number - 2 * lsd",
      "repeat until 2 digit number",
      "if divisible by 7 then original number is divisible by 7",
    ],
    rule: dividesBy7,
  },
  {
    factor: 11,
    explanation: [
      "Take off least significant digit (lsd)",
      "Subtract from what remains",
      "Repeat until 2 digit number",
      "if divisible by 11 then original number is divisible by 11",
    ],
    rule: dividesBy11,
  },
];
