import React from "react";
import {
  denaryInteger as denaryRaw,
  binaryInteger as binaryRaw,
  hexadecimalInteger as hexadecimalRaw,
} from "@comp-sci-maths/lib";

const denary = denaryRaw.withWidth(1);
const binary = binaryRaw.withWidth(4);
const hexadecimal = hexadecimalRaw.withWidth(1);

const numberBases = [denary, binary, hexadecimal];

export interface UseConversionTable {
  headings: string[];
  values: {
    denaryValue: string;
    binaryValue: string;
    hexadecimalValue: string;
  }[];
}

const useConversionTable = (): UseConversionTable =>
  React.useMemo(() => {
    const values = [];

    for (let value = 0; value < 16; value++) {
      let denaryValue = denary.toString(value);
      let binaryValue = binary.toString(value);
      let hexadecimalValue = hexadecimal.toString(value);
      values.push({ denaryValue, binaryValue, hexadecimalValue });
    }

    return {
      headings: numberBases.map((n) => n.name),
      values,
    };
  }, []);
export default useConversionTable;