import Block from "../Block";

class Chain<T> {
  blocks: Block<T>[];

  constructor() {
    this.blocks = [];
  }

  /**
   * Push a new block onto the chain
   * @param block The block to add to the chain
   */
  addBlock(block: Block<T>): Chain<T> {
    this.blocks.push(block);
    return this;
  }

  /**
   *
   * @returns A blank block with the correct index and previous hash setup
   */
  createNextBlock(): Block<T> {
    return new Block(
      this.blocks.length,
      this.blocks.length > 0
        ? this.blocks[this.blocks.length - 1].hash
        : undefined
    );
  }

  toString(): string {
    return `Blockchain with ${this.blocks.length} blocks:\n${this.blocks
      .map((block) => block.toString())
      .join("\n")}`;
  }
}

export default Chain;
