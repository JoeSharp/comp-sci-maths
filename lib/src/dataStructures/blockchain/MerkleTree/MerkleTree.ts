import { HashFunction } from "./generateHash";

interface IdentifiedHash {
  id: string;
  hash: string;
}

/**
 * Encapsulates the process of creating a Merkle Tree.
 * This is a method of calculating a root has for a list of data items.
 * It's a more sophisticated method than simply concatenating all the items.
 * It has some interesting properties...which I do not yet understand.
 */
class MerkleTree<T> {
  hashFunction: HashFunction;
  rawTransactions: T[];
  hashTree: IdentifiedHash[];

  constructor(hashFunction: HashFunction) {
    this.hashFunction = hashFunction;
    this.rawTransactions = [];
    this.hashTree = [];
  }

  /**
   * Build up the leaf nodes of the tree.
   * @param transaction The transaction to add to our list
   * @returns This tree, allow method chaining.
   */
  addTransaction(...transactions: T[]): this {
    this.rawTransactions.push(...transactions);
    return this;
  }

  /**
   * Calculates the Merkle Root Hash for the transactions accumulated so far.
   *
   * @returns The root hash for this tree.
   */
  calculateRootHash(): string {
    if (this.rawTransactions.length === 0) {
      throw new Error("Cannot create Merkle Tree without transactions");
    }

    let hashList: IdentifiedHash[] = this.rawTransactions.map((t, i) => ({
      id: i.toString(10),
      hash: this.hashFunction(JSON.stringify(t)),
    }));

    while (hashList.length > 1) {
      hashList.forEach((t) => this.hashTree.push(t));
      const newList: IdentifiedHash[] = [];

      for (let i = 0; i < hashList.length; i += 2) {
        const first = hashList[i];
        // If we have an odd number, we just double up the last one...
        const second = i + 1 === hashList.length ? first : hashList[i + 1];
        newList.push({
          id: `${first.id}-${second.id}`,
          hash: this.hashFunction(`${first.hash}${second.hash}`),
        });
      }

      hashList = newList;
    }

    // Push the root onto our identified hash tree
    this.hashTree.push(hashList[0]);

    return hashList[0].hash;
  }
}

export default MerkleTree;
