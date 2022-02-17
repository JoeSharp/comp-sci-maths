import {
  binaryInteger,
  denaryInteger,
  hexadecimalInteger,
  addSpacing,
} from "./PositiveNumberBase";

import { signed8bitBinary } from "./TwosComplement";
import { signed8bitHex } from "./TwosComplementHex";
import { INumberSpacing } from "./types";

interface IntegerTestCase {
  value: number;
  asBinary: string;
  asDenary: string;
  asHexadecimal: string;
}

export const integerTestCases: IntegerTestCase[] = [
  {
    value: 0,
    asBinary: "0000 0000",
    asDenary: "0",
    asHexadecimal: "00",
  },
  {
    value: 1,
    asBinary: "0000 0001",
    asDenary: "1",
    asHexadecimal: "01",
  },
  {
    value: 4,
    asBinary: "0000 0100",
    asDenary: "4",
    asHexadecimal: "04",
  },
  {
    value: 9,
    asBinary: "0000 1001",
    asDenary: "9",
    asHexadecimal: "09",
  },
  {
    value: 12,
    asBinary: "0000 1100",
    asDenary: "12",
    asHexadecimal: "0C",
  },
  {
    value: 14,
    asBinary: "0000 1110",
    asDenary: "14",
    asHexadecimal: "0E",
  },
  {
    value: 23,
    asBinary: "0001 0111",
    asDenary: "23",
    asHexadecimal: "17",
  },
  {
    value: 34,
    asBinary: "0010 0010",
    asDenary: "34",
    asHexadecimal: "22",
  },
  {
    value: 129,
    asBinary: "1000 0001",
    asDenary: "129",
    asHexadecimal: "81",
  },
  {
    value: 167,
    asBinary: "1010 0111",
    asDenary: "167",
    asHexadecimal: "A7",
  },
  {
    value: 230,
    asBinary: "1110 0110",
    asDenary: "230",
    asHexadecimal: "E6",
  },
  {
    value: 255,
    asBinary: "1111 1111",
    asDenary: "255",
    asHexadecimal: "FF",
  },
];

interface NumberToStringTestCase {
  input: number;
  expectedBinary: string;
  expectedHex: string;
}

const signed8bitTestCases: NumberToStringTestCase[] = [
  {
    input: 4,
    expectedBinary: "0000 0100",
    expectedHex: "04",
  },
  {
    input: -4,
    expectedBinary: "1111 1100",
    expectedHex: "FC",
  },
  {
    input: -13,
    expectedBinary: "1111 0011",
    expectedHex: "F3",
  },
  {
    input: -45,
    expectedBinary: "1101 0011",
    expectedHex: "D3",
  },
  {
    input: -110,
    expectedBinary: "1001 0010",
    expectedHex: "92",
  },
  {
    input: -128,
    expectedBinary: "1000 0000",
    expectedHex: "80",
  },
];

interface SpacingTestCase {
  input: string;
  expected: string;
  spacing: INumberSpacing;
}

const spacingTestCases: SpacingTestCase[] = [
  {
    input: "1999",
    expected: "1,999",
    spacing: denaryInteger.spacing,
  },
  {
    input: "372827648",
    expected: "372,827,648",
    spacing: denaryInteger.spacing,
  },
  {
    input: "9884994",
    expected: "9,884,994",
    spacing: denaryInteger.spacing,
  },
  {
    input: "110010",
    expected: "11 0010",
    spacing: binaryInteger.spacing,
  },
  {
    input: "1001010110010",
    expected: "1 0010 1011 0010",
    spacing: binaryInteger.spacing,
  },
];

describe("Number Base", () => {
  spacingTestCases.forEach(({ input, expected, spacing }) => {
    test(`Spacing ${input} to ${expected}`, () => {
      expect(addSpacing(input, spacing)).toBe(expected);
    });
  });

  integerTestCases.forEach(({ value, asBinary, asDenary, asHexadecimal }) => {
    test(`Number Bases - Binary of ${value} should be ${asBinary}`, () => {
      expect(binaryInteger.toString(value)).toEqual(asBinary);
      expect(binaryInteger.fromString(asBinary)).toBe(value);
    });
    test(`Number Bases - Denary of ${value} should be ${asDenary}`, () => {
      expect(denaryInteger.toString(value)).toEqual(asDenary);
      expect(denaryInteger.fromString(asDenary)).toBe(value);
    });
    test(`Number Bases - Hex of ${value} should be 0x${asHexadecimal}`, () => {
      expect(hexadecimalInteger.toString(value)).toEqual(asHexadecimal);
      expect(hexadecimalInteger.fromString(asHexadecimal)).toBe(value);
    });
  });

  signed8bitTestCases.forEach(({ input, expectedBinary, expectedHex }) => {
    test(`Number Bases - 8-bit Signed Binary of ${input} should be ${expectedBinary}`, () => {
      expect(signed8bitBinary.toString(input)).toEqual(expectedBinary);
      expect(signed8bitBinary.fromString(expectedBinary)).toBe(input);
      expect(signed8bitHex.toString(input)).toEqual(expectedHex);
      expect(signed8bitHex.fromString(expectedHex)).toBe(input);
    });
  });
});
