import or from "../../logic/or";
import halfAdder from "../halfAdder";

export default (a: boolean, b: boolean, c: boolean) => {
  const { sum: sumAB, carry: carryAB } = halfAdder(a, b);
  const { sum, carry: carryABC } = halfAdder(sumAB, c);
  const carry = or(carryAB, carryABC);
  return { sum, carry };
};
