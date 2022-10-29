import { ZERO_WORD } from "../../../nand/types";
import {
  binaryToBoolArray as bin,
  booleanToBinArray as arr,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import { WORD_LENGTH } from "../../common";
import ram512 from "./ram512";

describe("ram512 - Functional", () => {
  it("Should initialise correctly", () => {
    const { out, contents } = ram512(
      bin("0000000000000000"),
      bin("000000"),
      false
    );

    expect(arr(out)).toBe("0000000000000000");
    expect(contents.length).toBe(512);
    contents.forEach((register) => expect(register.length).toBe(WORD_LENGTH));
  });

  it("Should load data into correct location", () => {
    // Initialise the RAM
    const { contents: initialContents } = ram512(
      bin("0000000000000000"),
      bin("000"),
      false
    );

    // Put it through a series of write operations
    const finalContents = [
      { input: "0110000000000001", address: "00000001", load: true },
      { input: "0000000110100000", address: "00000010", load: true },
      { input: "0110100110100000", address: "00000100", load: false },
      { input: "0110100110100000", address: "00000101", load: true },
      { input: "0110011100000001", address: "00100001", load: true },
      { input: "0000000110101100", address: "00010010", load: true },
      { input: "0110100110100100", address: "00110100", load: false },
      { input: "0110100110110000", address: "00010101", load: true },
    ].reduce(
      (acc, { input, address, load }) =>
        ram512(bin(input), bin(address), load, acc).contents,
      initialContents
    );

    // Check that using the address to read data functions correctly
    const { out: out0 } = ram512(
      ZERO_WORD,
      bin("00000000"),
      false,
      finalContents
    );
    const { out: out1 } = ram512(
      ZERO_WORD,
      bin("00000001"),
      false,
      finalContents
    );
    const { out: out2 } = ram512(
      ZERO_WORD,
      bin("00000010"),
      false,
      finalContents
    );
    const { out: out4 } = ram512(
      ZERO_WORD,
      bin("00000100"),
      false,
      finalContents
    );
    const { out: out5 } = ram512(
      ZERO_WORD,
      bin("00000101"),
      false,
      finalContents
    );
    const { out: out33 } = ram512(
      ZERO_WORD,
      bin("00100001"),
      false,
      finalContents
    );
    const { out: out18 } = ram512(
      ZERO_WORD,
      bin("00010010"),
      false,
      finalContents
    );
    const { out: out52 } = ram512(
      ZERO_WORD,
      bin("00110100"),
      false,
      finalContents
    );
    const { out: out21 } = ram512(
      ZERO_WORD,
      bin("00010101"),
      false,
      finalContents
    );

    expect(arr(out0)).toBe("0000000000000000");
    expect(arr(out1)).toBe("0110000000000001");
    expect(arr(out2)).toBe("0000000110100000");
    expect(arr(out4)).toBe("0000000000000000");
    expect(arr(out5)).toBe("0110100110100000");

    expect(arr(out33)).toBe("0110011100000001");
    expect(arr(out18)).toBe("0000000110101100");
    expect(arr(out52)).toBe("0000000000000000");
    expect(arr(out21)).toBe("0110100110110000");
  });
});
