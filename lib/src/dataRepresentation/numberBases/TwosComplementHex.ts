import { INumberBase, INumberSpacing } from "./types";

import {
  addSpacing,
  hexadecimalInteger,
  binaryInteger,
} from "./PositiveNumberBase";
import TwosComplement, {
  signed8bitBinary,
  signed16bitBinary,
} from "./TwosComplement";

const hexSingleDigit = hexadecimalInteger.withWidth(1);

export default class TwosComplementHex implements INumberBase {
  name: string;
  width: number;
  base: number;
  twosComplementBinary: TwosComplement;
  spacing: INumberSpacing;
  min: number;
  max: number;

  constructor(name: string, twosComplementBinary: TwosComplement) {
    this.name = name;
    this.width = twosComplementBinary.width / 4;
    this.base = 16;
    this.spacing = hexadecimalInteger.spacing;
    this.twosComplementBinary = twosComplementBinary;

    this.max = this.twosComplementBinary.max;
    this.min = this.twosComplementBinary.min;
  }

  toString(value: number): string {
    return addSpacing(this.toDigits(value).join(""), this.spacing);
  }

  toDigits(value: number): string[] {
    const binDigits = this.twosComplementBinary.toDigits(value);
    const asBinInteger = binaryInteger.fromDigits(binDigits);
    let remaining = asBinInteger;
    const asHex = Array(this.width)
      .fill(null)
      .map(() => {
        const remainder = remaining % 16;
        remaining = Math.floor(remaining / 16);
        return hexSingleDigit.toDigits(remainder)[0];
      })
      .reverse();

    return asHex;
  }

  fromDigits(digits: string[]): number {
    let value = 0;
    digits
      .map((d) => hexSingleDigit.fromDigits([d]))
      .forEach((d) => {
        value = 16 * value + d;
      });
    const asBinIntegerDigits = binaryInteger.toString(value);
    return this.twosComplementBinary.fromString(asBinIntegerDigits);
  }

  fromString(asStringRaw: string): number {
    const asString = asStringRaw.replace(this.spacing.character, "");
    return this.fromDigits([...asString]);
  }

  withWidth(width: number): INumberBase {
    switch (width) {
      case 4:
        return new TwosComplementHex(this.name, signed8bitBinary);
      case 8:
        return new TwosComplementHex(this.name, signed16bitBinary);
    }

    throw new Error(`Unsupported Width ${width} for Twos Complement Hex`);
  }
}

export const signed8bitHex = new TwosComplementHex(
  "8-bit Twos Complement (Hex)",
  signed8bitBinary
);
export const signed16bitHex = new TwosComplementHex(
  "16-bit Twos Complement (Hex)",
  signed16bitBinary
);
