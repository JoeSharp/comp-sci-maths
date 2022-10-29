import { ZERO_WORD } from "../../../nand/types";
import {
  binaryToBoolArray as bin,
  booleanToBinArray as arr,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import { WORD_LENGTH } from "../../common";
import ram4k from "./ram4K";

describe("ram4k - Functional", () => {
  it("Should initialise correctly", () => {
    const { out, contents } = ram4k(
      bin("0000000000000000"),
      bin("000000"),
      false
    );

    expect(arr(out)).toBe("0000000000000000");
    expect(contents.length).toBe(4096);
    contents.forEach((register) => expect(register.length).toBe(WORD_LENGTH));
  });

  it("Should load data into correct location", () => {
    // Initialise the RAM
    const { contents: initialContents } = ram4k(
      bin("0000000000000000"),
      bin("000"),
      false
    );

    // Put it through a series of write operations
    const finalContents = [
      { input: "0110000000000001", address: "000000000001", load: true },
      { input: "0000000110100000", address: "000000000010", load: true },
      { input: "0110100110100000", address: "000000000100", load: false },
      { input: "0110100110100000", address: "000000000101", load: true },
      { input: "0110011100000001", address: "000000100001", load: true },
      { input: "0000000110101100", address: "000000010010", load: true },
      { input: "0110100110100100", address: "000000110100", load: false },
      { input: "0110100110110000", address: "000000010101", load: true },
    ].reduce(
      (acc, { input, address, load }) =>
        ram4k(bin(input), bin(address), load, acc).contents,
      initialContents
    );

    // Check that using the address to read data functions correctly
    const { out: out0 } = ram4k(
      ZERO_WORD,
      bin("000000000000"),
      false,
      finalContents
    );
    const { out: out1 } = ram4k(
      ZERO_WORD,
      bin("000000000001"),
      false,
      finalContents
    );
    const { out: out2 } = ram4k(
      ZERO_WORD,
      bin("000000000010"),
      false,
      finalContents
    );
    const { out: out4 } = ram4k(
      ZERO_WORD,
      bin("000000000100"),
      false,
      finalContents
    );
    const { out: out5 } = ram4k(
      ZERO_WORD,
      bin("000000000101"),
      false,
      finalContents
    );
    const { out: out33 } = ram4k(
      ZERO_WORD,
      bin("000000100001"),
      false,
      finalContents
    );
    const { out: out18 } = ram4k(
      ZERO_WORD,
      bin("000000010010"),
      false,
      finalContents
    );
    const { out: out52 } = ram4k(
      ZERO_WORD,
      bin("000000110100"),
      false,
      finalContents
    );
    const { out: out21 } = ram4k(
      ZERO_WORD,
      bin("000000010101"),
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
