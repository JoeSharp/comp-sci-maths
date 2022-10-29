import { and } from "../../../../dataRepresentation/binaryNumbers/logicalOperators";
import xor from "../../logic/xor";

export default (a: boolean, b: boolean) => {
  return {
    sum: xor(a, b),
    carry: and(a, b),
  };
};
