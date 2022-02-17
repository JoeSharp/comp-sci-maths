export type PartGenerator = (
  numberParts: number,
  partRange: number
) => number[];
export type OperationReducer = (a: number, b: number) => number;
export interface ArithemeticOperation {
  name: string;
  symbol: string;
  getParts: PartGenerator;
  reducer: OperationReducer;
}

const getAdditiveParts: PartGenerator = (
  numberParts: number,
  partRange: number
) => {
  let parts: number[] = [];
  while (parts.length < numberParts) {
    let p = Math.floor(Math.random() * partRange) - partRange / 2;
    if (p !== 0) {
      parts.push(p);
    }
  }
  return parts;
};

const getDivisibleParts: PartGenerator = (
  numberParts: number,
  partRange: number
) => {
  let parts: number[] = getAdditiveParts(numberParts, partRange);

  let answer = parts.reduce((a, b) => a * b);
  parts[0] = answer;

  return parts;
};

export const operations: ArithemeticOperation[] = [
  {
    name: "Addition",
    symbol: "+",
    reducer: (a, b) => a + b,
    getParts: getAdditiveParts,
  },
  {
    name: "Subtraction",
    symbol: "-",
    reducer: (a, b) => a - b,
    getParts: getAdditiveParts,
  },
  {
    name: "Multiplication",
    symbol: "\u00d7",
    reducer: (a, b) => a * b,
    getParts: getAdditiveParts,
  },
  {
    name: "Division",
    symbol: "\u00f7",
    reducer: (a, b) => a / b,
    getParts: getDivisibleParts,
  },
];
