import MerkleTree from "../MerkleTree/MerkleTree";
import { generateSha256 } from "../MerkleTree/generateHash";
import { v4 as uuid } from "uuid";

export const INITIAL_HASH = "FEFIFOFUM";
export const INITIAL_ID = "00000000-0000-0000-0000-000000000000";

export const NO_HASH = "";
export const FIRST_BLOCK_NUMBER = 0;

/**
 * Encapsulates a single block in our chain.
 * A block can be made up of multiple transactions.
 */
class Block {
  blockNumber: number;
  id: string;
  nonce: number;
  previousId: string;
  previousHash: string;
  transactions: string[];
  hash: string;

  constructor(
    blockNumber: number = FIRST_BLOCK_NUMBER,
    previousHash: string = INITIAL_HASH,
    previousId: string = INITIAL_ID
  ) {
    this.blockNumber = blockNumber;
    this.id = uuid();
    this.nonce = 0;
    this.previousHash = previousHash;
    this.previousId = previousId;
    this.transactions = [];
    this.hash = NO_HASH;
  }

  createNextBlock(): Block {
    if (this.hash === NO_HASH) {
      throw new Error(
        "Cannot create next block before this one has been minted"
      );
    }

    return new Block(this.blockNumber + 1, this.hash, this.id);
  }

  /**
   * Add more transactions to this block before we try and mine the hash.
   *
   * @param transactions The transactions to add
   * @returns This, to allow method chaining
   */
  addTransaction(...transactions: string[]): this {
    this.transactions.push(...transactions);
    return this;
  }

  /**
   * A private function for setting up the hash calculation.
   * @param nonceToTry The nonce to use
   * @returns The new hash based on our current contents.
   */
  generateHash(nonceToTry?: number): string {
    const nonce = nonceToTry ?? this.nonce;

    return new MerkleTree(generateSha256)
      .addElements(this.id)
      .addElements(this.previousId)
      .addElements(this.previousHash)
      .addElements(...this.transactions)
      .addElements(nonce.toString(10))
      .calculateRootHash();
  }

  /**
   * Once a valid nonce has been discovered by a miner, set it here.
   *
   * @param newNonce The nonce to set
   * @param newHash The hash that has been calculated
   * @returns Itself for method chaining.
   */
  setNonce(newNonce: number, newHash: string): Block {
    this.nonce = newNonce;
    this.hash = newHash;
    return this;
  }

  /**
   *
   * @returns A printable string representation
   */
  toString(): string {
    return `Block:\t${this.blockNumber}\n\tNonce: \t${this.nonce}\n\tPHash:\t${
      this.previousHash
    }\n\tHash:\t${this.hash}\n\tTransactions: (${
      this.transactions.length
    })\n\t\t${this.transactions.join("\n\t\t")}`;
  }
}

export default Block;
