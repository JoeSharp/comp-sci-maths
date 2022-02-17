import MerkleTree from "../MerkleTree/MerkleTree";
import { generateSha256 } from "../MerkleTree/generateHash";
import { HashTest } from "../MerkleTree/hashTest";

const INITIAL_HASH: string = 'FEFIFOFUM'

/**
 * Encapsulates a single block in our chain.
 * A block can be made up of multiple transactions.
 */
class Block {
    blockNumber: number;
    nonce: number;
    previousHash: string;
    transactions: string[];
    hash: string;

    constructor(blockNumber: number, previousHash: string = INITIAL_HASH) {
        this.blockNumber = blockNumber;
        this.nonce = 0;
        this.previousHash = previousHash;
        this.transactions = [];
        this.hash = '';
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
     * If we want to mine in a single blocking call (synchronously) then call this function
     * To execute the mining in one process.
     * @param hashTest The function used to test the hash.
     * @returns This block (method chaining.)
     */
    mineToCompletion(hashTest: HashTest): this {
        this.startMine()

        while (!hashTest(this.hash)) {
            this.iterateMine();
        }

        return this;
    }

    /**
     * Once all the transactions have been added, call this to generate it's hash.
     * It will generate a single hash, but leave it to the chain to determine if the hash passes the difficultly test.
     *
     * @returns The block itself (method chaining)
     */
    startMine(): this {
        this.hash = this.generateHash();
        return this;
    }

    /**
     * Calls upon the block to iterate it's nonce.
     * It will then recalculate the hash with this new value allowing the chain to determine if it passes difficulty test.
     * @returns The block (method chaining)
     */
    iterateMine(): this {
        this.nonce += 1;
        this.hash = this.generateHash();
        return this;
    }

    /**
     * Given a hash testing function, puts this blocks has through it.
     * @param hashTest The test function
     * @returns True/False if the hash passes the test.
     */
    testMine(hashTest: HashTest): boolean {
        return hashTest(this.hash);
    }

    /**
     * A private function for setting up the hash calculation.
     * @returns The new hash based on our current contents.
     */
    generateHash(): string {
        return new MerkleTree(generateSha256)
            .addTransaction(this.previousHash)
            .addTransaction(...this.transactions)
            .addTransaction(this.nonce.toString(10))
            .calculateRootHash()
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

    toString(): string {
        return `Block:\t${this.blockNumber}\n\tNonce: \t${this.nonce}\n\tPHash:\t${this.previousHash}\n\tHash:\t${this.hash}\n\tTransactions: (${this.transactions.length})\n\t\t${this.transactions.join('\n\t\t')}`
    }
}

export default Block;