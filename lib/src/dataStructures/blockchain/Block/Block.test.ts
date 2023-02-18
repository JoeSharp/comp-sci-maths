import { anyHashIsOk, topXNibblesAreZero } from "../MerkleTree/hashTest";
import Block from "./Block";

describe("Block", () => {
  test("Create Simple", () => {
    const block = new Block<string>(0)
      .addTransaction("Hello")
      .addTransaction("World")
      .addTransaction("Mr Sharp")
      .addTransaction("Will Return")
      .mineToCompletion(anyHashIsOk);

    expect(block.nonce).toBe(0);
    expect(block.verify()).toBeTruthy();
  });

  test("Create With Real Work", () => {
    const topTwoNibblesAreZero = topXNibblesAreZero(2);
    const block = new Block<string>(0)
      .addTransaction("Hello")
      .addTransaction("World")
      .addTransaction("Mr Sharp")
      .addTransaction("Will Return Again")
      .mineToCompletion(topTwoNibblesAreZero);

    expect(block.nonce).toBeGreaterThan(0);
    expect(block.verify()).toBeTruthy();
  });

  test("Create With Hard Work", () => {
    const topThreeNibblesAreZero = topXNibblesAreZero(3);
    const block = new Block<string>(0)
      .addTransaction("Hello")
      .addTransaction("World")
      .addTransaction("Mr Sharp")
      .addTransaction("Will Return")
      .mineToCompletion(topThreeNibblesAreZero);

    expect(block.nonce).toBeGreaterThan(0);
    expect(block.verify()).toBeTruthy();
  });

  test("Iterative Mining", () => {
    const topThreeNibblesAreZero = topXNibblesAreZero(3);
    const block = new Block<string>(0)
      .addTransaction("Hello")
      .addTransaction("World")
      .addTransaction("Mr Sharp")
      .addTransaction("Will Return")
      .startMine();

    while (!block.testMine(topThreeNibblesAreZero)) {
      block.iterateMine();
    }

    expect(block.nonce).toBeGreaterThan(0);
    expect(block.verify()).toBeTruthy();
  });
  test("Create and Make Changes", () => {
    const topNibbleIsZero = topXNibblesAreZero(1);
    const block = new Block<string>(0)
      .addTransaction("Hello")
      .addTransaction("World")
      .addTransaction("Mr Sharp")
      .addTransaction("Will Return")
      .mineToCompletion(topNibbleIsZero);

    block.transactions[1] = "Foo";
    expect(block.verify()).toBeFalsy();
  });
});
