import { BusFactory, DEFAULT_BUS_FACTORY } from "../../../nand/types";
import createToggledStorage from "../toggledStorage";
import bit from "../bit";

export default (input: boolean[], load: boolean, previousOutput?: boolean[]) =>
  input.map((value, i) =>
    bit(value, load, previousOutput && previousOutput[i])
  );

export const createRegister = (
  outputFactory: BusFactory = DEFAULT_BUS_FACTORY
) => {
  // Create our persistent storage
  const toggleOutput = createToggledStorage(outputFactory);

  // Return a function that accepts the input, and generates new output based on 'input' and 'previous output'
  return (input: boolean[], load: boolean) => {
    const { now, prev } = toggleOutput();

    input.forEach((value, i) => (now[i] = bit(value, load, prev[i])));
    return now;
  };
};
