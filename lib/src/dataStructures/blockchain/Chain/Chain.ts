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

  /**
   *
   * @returns True/False to indicate if the chain is still valid.
   */
  verify(): boolean {
    let isValid = true;

    let lastBlock = this.blocks[0];
    let i = 1;

    while (isValid && i < this.blocks.length) {
      const thisBlock = this.blocks[i];
      if (!thisBlock.verify(lastBlock.hash)) {
        isValid = false;
      }

      lastBlock = thisBlock;
      i++;
    }

    return isValid;
  }

  toString(): string {
    return `Blockchain with ${this.blocks.length} blocks:\n${this.blocks
      .map((block) => block.toString())
      .join("\n")}`;
  }
}

export default Chain;
