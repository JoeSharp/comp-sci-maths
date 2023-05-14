import { LoremIpsum } from "lorem-ipsum";
import Block from "./Block/Block";
import { anyHashIsOk } from "./MerkleTree/hashTest";
import Miner from "./Miner/Miner";
import Chain from "./Chain/Chain";

const lorem = new LoremIpsum();

export function createTestBlock(previousBlock?: Block): Block {
  return Array(6)
    .fill(null)
    .reduce(
      (block) => block.addTransaction(lorem.generateWords(5)),
      previousBlock ? previousBlock.createNextBlock() : new Block()
    );
}

export function createTestChain(
  chain: Chain,
  length: number,
  baseBlock?: Block
) {
  // If we aren't given a base block, create a new one, this will be an empty chain
  if (!baseBlock) {
    baseBlock = new Miner(anyHashIsOk, createTestBlock()).mineToCompletion();
    chain.addBlock(baseBlock);
    length -= 1;
  }

  Array(length)
    .fill(null)
    .reduce((prevBlock) => {
      const newBlock = new Miner(
        anyHashIsOk,
        createTestBlock(prevBlock)
      ).mineToCompletion();
      chain.addBlock(newBlock);
      return newBlock;
    }, baseBlock);
}
