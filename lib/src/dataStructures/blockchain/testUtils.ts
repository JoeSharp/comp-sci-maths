import { LoremIpsum } from "lorem-ipsum";
import Block from "./Block/Block";

const lorem = new LoremIpsum();

export function createTestBlock(previousBlock?: Block): Block {
  return Array.of({ length: 6 }).reduce(
    (block) => block.addTransaction(lorem.generateWords(5)),
    previousBlock ? previousBlock.createNextBlock() : new Block()
  );
}
