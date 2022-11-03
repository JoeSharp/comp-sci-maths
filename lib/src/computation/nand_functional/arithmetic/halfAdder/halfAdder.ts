import { and } from "../../../../dataRepresentation/binaryNumbers/logicalOperators";
import xor from "../../logic/xor";

export interface BitAdderOutput {
  sum: boolean;
  carry: boolean;
}

export default (a: boolean, b: boolean): BitAdderOutput => {
  return {
    sum: xor(a, b),
    carry: and(a, b),
  };
};

export const createHalfAdder =
  (output: BitAdderOutput = { sum: false, carry: false }) =>
  (a: boolean, b: boolean): BitAdderOutput => {
    output.sum = xor(a, b);
    output.carry = and(a, b);
    return output;
  };
