import Block from "../Block";
import { anyHashIsOk, topXNibblesAreZero } from "../MerkleTree/hashTest";
import Miner from "./Miner";

describe("Miner", () => {
  it("can create validatable block with a trivial workload", () => {
    const block = new Block<string>(0)
      .addTransaction("Hello")
      .addTransaction("World")
      .addTransaction("Mr Sharp")
      .addTransaction("Will Return");

    new Miner<string>(anyHashIsOk, block).mineToCompletion();

    expect(block.nonce).toBe(0);
    expect(block.verify()).toBeTruthy();
  });

  it("can mine with a non trivial workload (2)", () => {
    const topTwoNibblesAreZero = topXNibblesAreZero(2);
    const block = new Block<string>(0)
      .addTransaction("Hello")
      .addTransaction("World")
      .addTransaction("Mr Sharp")
      .addTransaction("Will Return Again");

    new Miner<string>(topTwoNibblesAreZero, block).mineToCompletion();

    expect(block.nonce).toBeGreaterThan(0);
    expect(block.verify()).toBeTruthy();
  });

  it("can mine with a non trivial workload (3)", () => {
    const topThreeNibblesAreZero = topXNibblesAreZero(3);
    const block = new Block<string>(0)
      .addTransaction("Hello")
      .addTransaction("World")
      .addTransaction("Mr Sharp")
      .addTransaction("Will Return");

    new Miner<string>(topThreeNibblesAreZero, block).mineToCompletion();

    expect(block.nonce).toBeGreaterThan(0);
    expect(block.verify()).toBeTruthy();
  });

  it("allows iterative mining", () => {
    const topThreeNibblesAreZero = topXNibblesAreZero(3);
    const block = new Block<string>(0)
      .addTransaction("Hello")
      .addTransaction("World")
      .addTransaction("Mr Sharp")
      .addTransaction("Will Return");

    const miner = new Miner<string>(topThreeNibblesAreZero, block).startMine();

    while (!miner.validateHash()) {
      miner.iterateMine();
    }

    expect(block.nonce).toBeGreaterThan(0);
    expect(block.verify()).toBeTruthy();
  });

  it("correctly detects amendments made to the transactions", () => {
    const topNibbleIsZero = topXNibblesAreZero(1);
    const block = new Block<string>(0)
      .addTransaction("Hello")
      .addTransaction("World")
      .addTransaction("Mr Sharp")
      .addTransaction("Will Return");

    new Miner<string>(topNibbleIsZero, block).mineToCompletion();

    block.transactions[1] = "Foo";
    expect(block.verify()).toBeFalsy();
  });
});
