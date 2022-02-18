import { Optional } from "../../types";

export const binaryToNumber = (binary: boolean[]): number =>
  binary
    .map((b: boolean): number => (b ? 1 : 0))
    .reduce((acc, curr, i) => acc + curr * Math.pow(2, i));

export const numberToBinary = (value: number, minWidth: number) => {
  const bin: boolean[] = [];

  while (value > 0) {
    bin.push(value % 2 !== 0);
    value = Math.floor(value / 2);
  }

  while (bin.length < minWidth) {
    bin.push(false);
  }

  return bin;
};

export const boolToBin = (v: Optional<boolean>): string => {
  if (v === undefined) return "-";
  if (v === true) return "1";
  if (v === false) return "0";
};
export const binToBool = (v: string) => v === "1";

export const binaryToBoolArray = (input: string): boolean[] =>
  input
    .split("")
    .filter((i) => i !== " ")
    .map(binToBool)
    .reverse();
export const booleanToBinArray = (input: boolean[]): string =>
  input.map(boolToBin).reverse().join("");
