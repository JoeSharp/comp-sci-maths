import Block from "../Block";
import { HashTest } from "../MerkleTree/hashTest";

/**
 * An instance of this is created to mine a given block.
 */
class Miner {
  hashTest: HashTest;
  block: Block;
  hash: string;
  nonce: number;

  constructor(hashTest: HashTest, block: Block) {
    this.hashTest = hashTest;
    this.block = block;
    this.hash = "";
    this.nonce = 0;
  }

  /**
   * If we want to mine in a single blocking call (synchronously) then call this function
   * To execute the mining in one process.
   * @param hashTest The function used to test the hash.
   * @returns This block (method chaining.)
   */
  mineToCompletion(): Block {
    this.startMine();

    while (!this.hashTest(this.hash)) {
      this.iterateMine();
    }

    return this.block;
  }

  /**
   * Once all the transactions have been added, call this to generate it's hash.
   * It will generate a single hash, but leave it to the chain to determine if the hash passes the difficultly test.
   *
   * @returns The block itself (method chaining)
   */
  startMine(): Miner {
    this.hash = this.block.generateHash(this.nonce);
    this.validateHash(); // We might get luck on the first nonce
    return this;
  }

  /**
   * Call upon the miner to check the hash it has found.
   * @returns true/false to indicate if the current value of nonce passes the given test.
   */
  validateHash(): boolean {
    const valid = this.hashTest(this.hash);
    if (valid) {
      // give the block the required information.
      this.block.setNonce(this.nonce, this.hash);
    }
    return valid;
  }

  /**
   * Calls upon the block to iterate it's nonce.
   * It will then recalculate the hash with this new value allowing the chain to determine if it passes difficulty test.
   * @returns True if the mining has found a satisfactory answer
   */
  iterateMine(): boolean {
    this.nonce += 1;
    this.hash = this.block.generateHash(this.nonce);
    return this.validateHash();
  }
}

export default Miner;
