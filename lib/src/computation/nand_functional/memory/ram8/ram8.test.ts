import { ZERO_WORD } from "../../../nand/types";
import {
  binaryToBoolArray as bin,
  booleanToBinArray as arr,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import { WORD_LENGTH } from "../../common";

import ram8 from "./ram8";

describe("Ram8 - Functional", () => {
  it("Should initialise correctly", () => {
    const { out, contents } = ram8(bin("0000000000000000"), bin("000"), false);

    expect(arr(out)).toBe("0000000000000000");
    expect(contents.length).toBe(8);
    contents.forEach((register) => expect(register.length).toBe(WORD_LENGTH));
  });

  it("Should load data into correct location", () => {
    // Initialise the RAM
    const { contents: initialContents } = ram8(
      bin("0000000000000000"),
      bin("000"),
      false
    );

    // Put it through a series of write operations
    const finalContents = [
      { input: "0110000000000001", address: "001", load: true },
      { input: "0000000110100000", address: "010", load: true },
      { input: "0110100110100000", address: "100", load: false },
      { input: "0110100110100000", address: "101", load: true },
    ].reduce(
      (acc, { input, address, load }) =>
        ram8(bin(input), bin(address), load, acc).contents,
      initialContents
    );

    // Check that using the address to read data functions correctly
    const { out: out0 } = ram8(ZERO_WORD, bin("000"), false, finalContents);
    const { out: out1 } = ram8(ZERO_WORD, bin("001"), false, finalContents);
    const { out: out2 } = ram8(ZERO_WORD, bin("010"), false, finalContents);
    const { out: out4 } = ram8(ZERO_WORD, bin("100"), false, finalContents);
    const { out: out5 } = ram8(ZERO_WORD, bin("101"), false, finalContents);

    expect(arr(out0)).toBe("0000000000000000");
    expect(arr(out1)).toBe("0110000000000001");
    expect(arr(out2)).toBe("0000000110100000");
    expect(arr(out4)).toBe("0000000000000000");
    expect(arr(out5)).toBe("0110100110100000");
  });
});
