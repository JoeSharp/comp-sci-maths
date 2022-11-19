import { ZERO_WORD } from "../../../nand/types";
import {
  binaryToBoolArray as bin,
  booleanToBinArray as arr,
} from "../../../../dataRepresentation/numberBases/simpleBinary";
import { WORD_LENGTH } from "../../common";

import ram8, { createRam8 } from "./ram8";

describe.skip("Ram8 - Clocked", () => {
  it("Clocked", () => {
    const myRam8 = createRam8();

    myRam8.ram8(bin("0000000000000000"), bin("000"), false);

    expect(arr(myRam8.state.output)).toBe("0000000000000000");
    expect(myRam8.state.contents.length).toBe(8);
    myRam8.state.contents.forEach((register) =>
      expect(register.length).toBe(WORD_LENGTH)
    );
  });

  it("Write a Single Word", () => {
    const myRam8 = createRam8();

    myRam8.ram8(bin("0101000000000011"), bin("010"), true);

    expect(arr(myRam8.state.contents[2].map(({ output }) => output))).toBe(
      "0101000000000011"
    );
  });

  it("Should load data into correct location", () => {
    // Initialise the RAM
    const myRam8 = createRam8();
    myRam8.ram8(bin("0000000000000000"), bin("000"), false);

    // Put it through a series of write operations
    [
      { input: "0110000000000001", address: "001", load: true },
      { input: "0000000110100000", address: "010", load: true },
      { input: "0110100110100000", address: "100", load: false },
      { input: "0110100110100000", address: "101", load: true },
    ].forEach(({ input, address, load }) => {
      myRam8.ram8(bin(input), bin(address), load);
      myRam8.clock();
    });

    // Check that using the address to read data functions correctly
    myRam8.ram8(ZERO_WORD, bin("000"), false);
    myRam8.clock();
    const out0 = [...myRam8.state.output];
    myRam8.ram8(ZERO_WORD, bin("001"), false);
    myRam8.clock();
    const out1 = [...myRam8.state.output];
    myRam8.ram8(ZERO_WORD, bin("010"), false);
    myRam8.clock();
    const out2 = [...myRam8.state.output];
    myRam8.ram8(ZERO_WORD, bin("100"), false);
    myRam8.clock();
    const out4 = [...myRam8.state.output];
    myRam8.ram8(ZERO_WORD, bin("101"), false);
    myRam8.clock();
    const out5 = [...myRam8.state.output];

    expect(arr(out0)).toBe("0000000000000000");
    expect(arr(out1)).toBe("0110000000000001");
    expect(arr(out2)).toBe("0000000110100000");
    expect(arr(out4)).toBe("0000000000000000");
    expect(arr(out5)).toBe("0110100110100000");
  });
});

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
