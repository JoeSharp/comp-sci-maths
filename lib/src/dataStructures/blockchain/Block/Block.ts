import MerkleTree from "../MerkleTree/MerkleTree";
import { generateSha256 } from "../MerkleTree/generateHash";

const INITIAL_HASH: string = "FEFIFOFUM";

/**
 * Encapsulates a single block in our chain.
 * A block can be made up of multiple transactions.
 */
class Block<T> {
  blockNumber: number;
  nonce: number;
  previousHash: string;
  transactions: T[];
  hash: string;

  constructor(blockNumber: number, previousHash: string = INITIAL_HASH) {
    this.blockNumber = blockNumber;
    this.nonce = 0;
    this.previousHash = previousHash;
    this.transactions = [];
    this.hash = "";
  }

  /**
   * Add more transactions to this block before we try and mine the hash.
   *
   * @param transactions The transactions to add
   * @returns This, to allow method chaining
   */
  addTransaction(...transactions: T[]): this {
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
      .addTransaction(this.previousHash)
      .addTransaction(...this.transactions)
      .addTransaction(nonce.toString(10))
      .calculateRootHash();
  }

  /**
   * Once a valid nonce has been discovered by a miner, set it here.
   *
   * @param newNonce The nonce to set
   * @param newHash The hash that has been calculated
   * @returns Itself for method chaining.
   */
  setNonce(newNonce: number, newHash: string): Block<T> {
    this.nonce = newNonce;
    this.hash = newHash;
    return this;
  }

  verify(previousHashExpected: string = INITIAL_HASH): boolean {
    // Is the previous hash as expected?
    if (this.previousHash !== previousHashExpected) {
      return false;
    }

    // Does the hash we carry still match the one we calculated before?
    const hashCheck = this.generateHash();
    if (hashCheck !== this.hash) {
      return false;
    }

    // Nothing went wrong, assume all is good
    return true;
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
