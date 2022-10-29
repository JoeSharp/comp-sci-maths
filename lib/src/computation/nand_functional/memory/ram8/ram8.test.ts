import { ZERO_WORD } from "../../../nand/types";
import {
  binaryToBoolArray as b,
  booleanToBinArray as a,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import { WORD_LENGTH } from "../../common";

import ram8 from "./ram8";

describe("Ram8 - Functional", () => {
  it("Should initialise correctly", () => {
    const { out, contents } = ram8(b("0000000000000000"), b("000"), false);

    expect(a(out)).toBe("0000000000000000");
    expect(contents.length).toBe(8);
    contents.forEach((register) => expect(register.length).toBe(WORD_LENGTH));
  });

  it("Should load data into correct location", () => {
    // Initialise the RAM
    const { contents: initialContents } = ram8(
      b("0000000000000000"),
      b("000"),
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
        ram8(b(input), b(address), load, acc).contents,
      initialContents
    );

    // Check the final contents are correctly set
    expect(a(finalContents[0])).toBe("0000000000000000");
    expect(a(finalContents[1])).toBe("0110000000000001");
    expect(a(finalContents[2])).toBe("0000000110100000");
    expect(a(finalContents[4])).toBe("0000000000000000");
    expect(a(finalContents[5])).toBe("0110100110100000");

    // Check that using the address to read data functions correctly
    const { out: out0 } = ram8(ZERO_WORD, b("000"), false, finalContents);
    const { out: out1 } = ram8(ZERO_WORD, b("001"), false, finalContents);
    const { out: out2 } = ram8(ZERO_WORD, b("010"), false, finalContents);
    const { out: out4 } = ram8(ZERO_WORD, b("100"), false, finalContents);
    const { out: out5 } = ram8(ZERO_WORD, b("101"), false, finalContents);

    expect(a(out0)).toBe("0000000000000000");
    expect(a(out1)).toBe("0110000000000001");
    expect(a(out2)).toBe("0000000110100000");
    expect(a(out4)).toBe("0000000000000000");
    expect(a(out5)).toBe("0110100110100000");
  });
});
