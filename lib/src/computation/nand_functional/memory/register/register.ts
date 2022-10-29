import bit from "../bit";

export default (input: boolean[], load: boolean, previousOutput?: boolean[]) =>
  input.map((value, i) =>
    bit(value, load, previousOutput && previousOutput[i])
  );
