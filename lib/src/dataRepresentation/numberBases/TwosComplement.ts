import { INumberBase, INumberSpacing } from "./types";

import PositiveNumberBase, {
  binaryInteger,
  addSpacing,
} from "./PositiveNumberBase";

export default class TwosComplement implements INumberBase {
  name: string;
  width: number;
  base: number;
  binaryLessOne: PositiveNumberBase;
  spacing: INumberSpacing;
  min: number;
  max: number;

  constructor(name: string, width: number) {
    this.name = name;
    this.width = width;
    this.base = 2;
    this.spacing = binaryInteger.spacing;
    this.binaryLessOne = binaryInteger.withWidth(width - 1);

    const logOfWidth: number = Math.log2(width);
    if (!Number.isInteger(logOfWidth))
      throw new Error(
        `Width must be a power of 2, but is ${width} with log2 of ${logOfWidth}`
      );

    this.max = this.binaryLessOne.max - 1;
    this.min = -this.binaryLessOne.max;
  }

  toString(value: number): string {
    return addSpacing(this.toDigits(value).join(""), this.spacing);
  }

  toDigits(value: number): string[] {
    if (value >= 0) {
      return ["0", ...this.binaryLessOne.toDigits(value)];
    } else {
      const diff = Math.abs(this.min) - Math.abs(value);
      const diffBin = this.binaryLessOne.toDigits(diff);
      return ["1", ...diffBin];
    }
  }

  fromDigits(digits: string[]): number {
    return this.fromString(digits.join(""));
  }

  fromString(asStringRaw: string): number {
    const asString = asStringRaw.replace(this.spacing.character, "");
    if (asString[0] === "0") {
      return this.binaryLessOne.fromString(asStringRaw);
    } else {
      const diff = this.binaryLessOne.fromString(asStringRaw.slice(1));
      return -(Math.abs(this.min) - diff);
    }
  }

  withWidth(width: number): INumberBase {
    return new TwosComplement(this.name, width);
  }
}

export const signed8bitBinary = new TwosComplement("8-bit Twos Complement", 8);
export const signed16bitBinary = new TwosComplement(
  "16-bit Twos Complement",
  16
);
