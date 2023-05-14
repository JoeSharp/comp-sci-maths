import Block from "../Block/Block";
import { anyHashIsOk } from "../MerkleTree/hashTest";
import Miner from "../Miner";
import { createTestBlock } from "../testUtils";
import Chain from "./Chain";
import verifyChain from "./verifyChain";

describe("Chain", () => {
  test("To string generates sensible value", () => {
    const chain = new Chain();

    const result = chain
      .addBlock(
        new Miner(
          anyHashIsOk,
          new Block().addTransaction("YouFoundMe")
        ).mineToCompletion()
      )
      .toString();

    expect(result).toContain("YouFoundMe");
  });

  test("Same block twice throws error", () => {
    const blockA = new Miner(anyHashIsOk, createTestBlock()).mineToCompletion();

    const chain = new Chain().addBlock(blockA);
    expect(() => chain.addBlock(blockA)).toThrowError();
  });

  test("Simple Chain", () => {
    const block0 = new Miner(anyHashIsOk, createTestBlock()).mineToCompletion();

    const block1 = new Miner(
      anyHashIsOk,
      createTestBlock(block0)
    ).mineToCompletion();

    const block2 = new Miner(
      anyHashIsOk,
      createTestBlock(block0)
    ).mineToCompletion();

    const chain = [block0, block1, block2].reduce(
      (chain, block) => chain.addBlock(block),
      new Chain()
    );

    expect(chain.blocks.size).toBe(3);

    // Check that verify is working
    expect(() => verifyChain(chain)).not.toThrowError();

    // Make fraudulent amendments and check that verify picks them up
    const block1Written = chain.blocks.get(block1.id);
    expect(block1Written).toBeDefined();
    block1Written!.block.transactions[0] = "Foo";
    expect(() => verifyChain(chain)).toThrowError();
  });

  test("Forked Chain returns correct list of chains", () => {
    const blockA = new Miner(anyHashIsOk, createTestBlock()).mineToCompletion();

    const blockAA = new Miner(
      anyHashIsOk,
      createTestBlock(blockA)
    ).mineToCompletion();

    const blockAAA = new Miner(
      anyHashIsOk,
      createTestBlock(blockAA)
    ).mineToCompletion();

    const blockAB = new Miner(
      anyHashIsOk,
      createTestBlock(blockA)
    ).mineToCompletion();

    const blockABA = new Miner(
      anyHashIsOk,
      createTestBlock(blockAB)
    ).mineToCompletion();

    const blockABAA = new Miner(
      anyHashIsOk,
      createTestBlock(blockABA)
    ).mineToCompletion();
    const blockABAAA = new Miner(
      anyHashIsOk,
      createTestBlock(blockABAA)
    ).mineToCompletion();

    const blockABAB = new Miner(
      anyHashIsOk,
      createTestBlock(blockABA)
    ).mineToCompletion();

    const chain = [
      blockA,
      blockAA,
      blockAAA,
      blockAB,
      blockABA,
      blockABAA,
      blockABAAA,
      blockABAB,
    ].reduce((chain, block) => chain.addBlock(block), new Chain());

    const allChains: string[][] = chain.getChains();
    const longestChain = chain.getLongestChain();
    expect(longestChain).toBeDefined();

    expect(allChains).toHaveLength(3);
    const allChainsAsStr = allChains.map((ids) => ids.join(","));
    const longestChainAsStr = longestChain?.join(",");

    const expectedChain1 = [blockA, blockAA, blockAAA]
      .map((b) => b.id)
      .join(",");
    const expectedChain2 = [blockA, blockAB, blockABA, blockABAA, blockABAAA]
      .map((b) => b.id)
      .join(",");
    const expectedChain3 = [blockA, blockAB, blockABA, blockABAB]
      .map((b) => b.id)
      .join(",");

    expect(allChainsAsStr).toContain(expectedChain1);
    expect(allChainsAsStr).toContain(expectedChain2);
    expect(allChainsAsStr).toContain(expectedChain3);
    expect(longestChainAsStr).toBe(expectedChain2);
  });
});
