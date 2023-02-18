import { HashTest } from "../MerkleTree/hashTest";
import Block from "../Block";

class Chain<T> {
  blocks: Block<T>[];
  hashTest: HashTest;
  nextBlock: Block<T>;

  constructor(hashTest: HashTest) {
    this.blocks = [];
    this.hashTest = hashTest;
    this.nextBlock = new Block(0);
  }

  /**
   * Accumulate another transaction in the current 'next block'.
   *
   * @param transaction The transaction to add
   * @returns This chain (allow method chaining)
   */
  addTransaction(transaction: T): this {
    this.nextBlock.addTransaction(transaction);
    return this;
  }

  /**
   * If we want to mine the next block to completion in one blocking step, we can do that with this funciton.
   * Completes the 'next block', mines it, adds it to the chain and creates a new 'next block'.
   *
   * @returns This chain (method chaining)
   */
  mineNextBlockToCompletion(): this {
    this.startMiningNextBlock();

    while (!this.testMiningOfNextBlock()) {
      this.iterateMiningOfNextBlock();
    }

    return this;
  }

  /**
   * Begins the process of mining the next block.
   *
   * @returns This chain (method chaining)
   */
  startMiningNextBlock(): this {
    this.nextBlock.startMine();
    return this;
  }

  iterateMiningOfNextBlock(): this {
    this.nextBlock.iterateMine();
    return this;
  }

  testMiningOfNextBlock(): boolean {
    const passed = this.nextBlock.testMine(this.hashTest);
    if (passed) {
      this.blocks.push(this.nextBlock);
      this.nextBlock = new Block(
        this.blocks.length,
        this.blocks[this.blocks.length - 1].hash
      );
    }
    return passed;
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
