import { INumberBase, INumberSpacing } from "./types";

export const addSpacing = (value: string, spacing: INumberSpacing) => {
  return [...value]
    .map((s, i) =>
      i > 0 && (value.length - i) % spacing.digits === 0
        ? `${spacing.character}${s}`
        : s
    )
    .join("");
};

export default class PositiveNumberBase implements INumberBase {
  name: string;
  base: number;
  symbols: string[];
  emojis: string[];
  width: number;
  max: number;
  min: number;
  spacing: INumberSpacing;

  constructor(
    name: string,
    symbols: string[],
    emojis: string[],
    spacing: INumberSpacing,
    width: number = 0
  ) {
    this.name = name;
    this.symbols = symbols;
    this.base = this.symbols.length;
    this.emojis = emojis;
    this.spacing = spacing;
    this.width = width;
    this.max = Math.pow(2, this.width);
    this.min = 0;
  }

  toString(value: number) {
    return addSpacing(this.toDigits(value).join(""), this.spacing);
  }

  toDigits(value: number): string[] {
    const digits: string[] = [];

    // Successive division, using remainder to figure out next digit
    // Works out from LSD to MSD
    let divValue = value;
    while (divValue > 0) {
      const remainder = divValue % this.base;
      digits.unshift(this.symbols[remainder]);
      divValue = Math.floor(divValue / this.base);
    }

    // Add any required padding
    while (digits.length < this.width) {
      digits.unshift(this.symbols[0]);
    }

    return digits;
  }

  fromDigits(digits: string[]): number {
    return this.fromString(digits.join(""));
  }

  fromString(asStringWithSpacing: string): number {
    const asString = asStringWithSpacing.replace(this.spacing.character, "");

    let value = 0;

    let placeValue = 1;
    Array.from(asString)
      .reverse()
      .forEach((digit) => {
        const indexOf = this.symbols.indexOf(digit);
        value += indexOf * placeValue;
        placeValue *= this.base;
      });

    return value;
  }

  withWidth(width: number) {
    return new PositiveNumberBase(
      this.name,
      this.symbols,
      this.emojis,
      this.spacing,
      width
    );
  }
}

export const binaryInteger: PositiveNumberBase = new PositiveNumberBase(
  "Binary",
  ["0", "1"],
  ["0️⃣", "1️⃣"],
  {
    character: " ",
    digits: 4,
  },
  8
);
export const denaryInteger: PositiveNumberBase = new PositiveNumberBase(
  "Denary",
  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"],
  {
    character: ",",
    digits: 3,
  },
  1
);
export const hexadecimalInteger: PositiveNumberBase = new PositiveNumberBase(
  "Hexadecimal",
  [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ],
  [
    "0️⃣",
    "1️⃣",
    "2️⃣",
    "3️⃣",
    "4️⃣",
    "5️⃣",
    "6️⃣",
    "7️⃣",
    "8️⃣",
    "9️⃣",
    "🇦",
    "🇧",
    "🇨",
    "🇩",
    "🇪",
    "🇫",
  ],
  {
    character: " ",
    digits: 2,
  },
  2
);
