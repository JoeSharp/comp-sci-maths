import Block from "../Block";
import verifyBlock from "../Block/verifyBlock";
import { anyHashIsOk, topXNibblesAreZero } from "../MerkleTree/hashTest";
import Miner from "./Miner";

describe("Miner", () => {
  it("can create validatable block with a trivial workload", () => {
    const block = new Block(0)
      .addTransaction("Hello")
      .addTransaction("World")
      .addTransaction("Mr Sharp")
      .addTransaction("Will Return");

    new Miner(anyHashIsOk, block).mineToCompletion();

    expect(block.nonce).toBe(0);
    expect(verifyBlock(block)).toBeTruthy();
  });

  it("can mine with a non trivial workload (2)", () => {
    const topTwoNibblesAreZero = topXNibblesAreZero(2);
    const block = new Block(0)
      .addTransaction("Hello")
      .addTransaction("World")
      .addTransaction("Mr Sharp")
      .addTransaction("Will Return Again");

    new Miner(topTwoNibblesAreZero, block).mineToCompletion();

    expect(block.nonce).toBeGreaterThan(0);
    expect(verifyBlock(block)).toBeTruthy();
  });

  it("can mine with a non trivial workload (3)", () => {
    const topThreeNibblesAreZero = topXNibblesAreZero(3);
    const block = new Block(0)
      .addTransaction("Hello")
      .addTransaction("World")
      .addTransaction("Mr Sharp")
      .addTransaction("Will Return");

    new Miner(topThreeNibblesAreZero, block).mineToCompletion();

    expect(block.nonce).toBeGreaterThan(0);
    expect(verifyBlock(block)).toBeTruthy();
  });

  it("allows iterative mining", () => {
    const topThreeNibblesAreZero = topXNibblesAreZero(3);
    const block = new Block(0)
      .addTransaction("Hello")
      .addTransaction("World")
      .addTransaction("Mr Sharp")
      .addTransaction("Will Return");

    const miner = new Miner(topThreeNibblesAreZero, block).startMine();

    while (!miner.validateHash()) {
      miner.iterateMine();
    }

    expect(block.nonce).toBeGreaterThan(0);
    expect(verifyBlock(block)).toBeTruthy();
  });

  it("correctly detects amendments made to the transactions", () => {
    const topNibbleIsZero = topXNibblesAreZero(1);
    const block = new Block(0)
      .addTransaction("Hello")
      .addTransaction("World")
      .addTransaction("Mr Sharp")
      .addTransaction("Will Return");

    new Miner(topNibbleIsZero, block).mineToCompletion();

    block.transactions[1] = "Foo";
    expect(verifyBlock(block)).toBeFalsy();
  });

  it("correctly rejects incorrect previous hash assertions", () => {
    const topNibbleIsZero = topXNibblesAreZero(1);
    const block = new Block(0)
      .addTransaction("Hello")
      .addTransaction("World")
      .addTransaction("Mr Sharp")
      .addTransaction("Will Return");

    new Miner(topNibbleIsZero, block).mineToCompletion();

    expect(verifyBlock(block, "nonsense")).toBeFalsy();
  });
});
