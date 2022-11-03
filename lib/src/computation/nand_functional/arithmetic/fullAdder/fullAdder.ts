import or from "../../logic/or";
import halfAdder, { createHalfAdder, BitAdderOutput } from "../halfAdder";

export default (a: boolean, b: boolean, c: boolean) => {
  const { sum: sumAB, carry: carryAB } = halfAdder(a, b);
  const { sum, carry: carryABC } = halfAdder(sumAB, c);
  const carry = or(carryAB, carryABC);
  return { sum, carry };
};

export const createFullAdder = (
  output: BitAdderOutput = { sum: false, carry: false }
) => {
  return (a: boolean, b: boolean, c: boolean): BitAdderOutput => {
    const { sum: sumAB, carry: carryAB } = halfAdder(a, b);
    let carryABC = false;
    ({ sum: output.sum, carry: carryABC } = halfAdder(sumAB, c));
    output.carry = or(carryAB, carryABC);
    return output;
  };
};
