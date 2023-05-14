import Block from "./Block";

describe("Block", () => {
  it("Creates a sensible string representation", () => {
    const result = new Block(0).addTransaction("Hello").toString();
    expect(result).toContain("Hello");
  });

  it("Creates list of transactions", () => {
    const block = new Block(0)
      .addTransaction("Hello")
      .addTransaction("World")
      .addTransaction("Mr Sharp")
      .addTransaction("Will Return");

    expect(block.transactions).toHaveLength(4);
  });

  it("Uses the given nonce correctly", () => {
    const block = new Block(0)
      .addTransaction("Hello")
      .addTransaction("World")
      .addTransaction("Mr Sharp")
      .addTransaction("Will Return");

    const hashFor5 = block.generateHash(5);
    const hashWithDefault = block.generateHash();
    block.setNonce(5, hashFor5);
    const regenHash = block.generateHash();

    expect(hashFor5).toBe(regenHash);
    expect(regenHash).not.toBe(hashWithDefault);
  });
});
