import Block from "../Block";

interface IndexedBlock {
  nextBlockIds: Set<string>;
  block: Block;
}

const DEFAULT_LONG_CHAIN_PULL = 3;

/**
 * The data structure of a block chain.
 * It's a branching structure, such that different miners may append blocks to same endpoint, so
 * this structure needs to keep track of the various paths and as one branch becomes longer, choose it and prune
 * the dead ones. It's only once transactions are behind the 'last consolidated' block ID that they are really
 * committed to the ledger.
 */
class Chain {
  // The genesis block ID
  firstBlockId: string;

  // As decisions are made about which branches to pursue, the chain will be considered 'consolidated' at a point in time.
  // All previous alternative branches are then pruned.
  consolidatedBlockId: string;

  // Blocks are keyed by their own ID
  blocks: Map<string, IndexedBlock>;

  // The longest current chain should 'pull' the consolidation point forward.
  longChainPull: number;

  constructor(longChainPull: number = DEFAULT_LONG_CHAIN_PULL) {
    this.blocks = new Map();
    this.firstBlockId = "";
    this.consolidatedBlockId = "";
    this.longChainPull = longChainPull;
  }

  /**
   * Retrieve a list of possible linear chains from our branching structure.
   * @returns The list of chains currently under construction, starting from the consolidated block.
   */
  getChains(): string[][] {
    return this._recurseChains(this.consolidatedBlockId, [
      this.consolidatedBlockId,
    ]);
  }

  /**
   * Identify the longest chain, used to decide what block to build on.
   *
   * @returns The longest chain of ID's from the last consolidation point.
   */
  getLongestChain() {
    return this.getChains()
      .sort((a, b) => b.length - a.length)
      .find(() => true);
  }

  _recurseChains(currentId: string, chainSoFar: string[]): string[][] {
    const index = this.blocks.get(currentId);
    if (!index) {
      throw new Error(
        "Could not find internal block representation for given next id"
      );
    }

    if (index.nextBlockIds.size === 0) {
      return [chainSoFar];
    }
    return [...index.nextBlockIds].flatMap((nextId) =>
      this._recurseChains(nextId, [...chainSoFar, nextId])
    );
  }

  /**
   * Examines the internal state of the branching.
   * If one branch has got far enough ahead of the others,
   * then it consolidates the chain at the end of that branch and all other branches are pruned.
   */
  consolidateChains() {
    const longestChain = this.getLongestChain();

    // If the longest chain is not long enough to cause a pull, return now
    if (longestChain.length <= this.longChainPull) {
      return;
    }

    // Pick the elements of the chain behind the 'pull' point and prune any alternative paths
    const chainToConsolidate = longestChain.slice(0, -this.longChainPull);

    // Clean out the 'next block ids' for all the points behind our consolidation point
    chainToConsolidate
      .map((blockId) => this.blocks.get(blockId))
      .forEach(({ nextBlockIds }, index) => {
        const nextIdToKeep = longestChain[index + 1];
        [...nextBlockIds]
          .filter((blockId) => blockId !== nextIdToKeep)
          .forEach((blockId) => this.blocks.delete(blockId));
        nextBlockIds.clear();
        nextBlockIds.add(nextIdToKeep);
      });

    // Move our consolidation point
    this.consolidatedBlockId =
      chainToConsolidate[chainToConsolidate.length - 1];
  }

  /**
   * Push a new block onto the chain
   * @param block The block to add to the chain
   */
  addBlock(block: Block): Chain {
    if (this.blocks.size === 0) {
      this.firstBlockId = block.id;
      this.consolidatedBlockId = block.id;
    } else {
      const previousBlock = this.blocks.get(block.previousId);
      if (!previousBlock) {
        throw new Error("Cannot find previous block");
      }

      const existingWithId = this.blocks.get(block.id);
      if (!!existingWithId) {
        throw new Error("Block already exists with this ID");
      }

      previousBlock.nextBlockIds.add(block.id);
    }

    this.blocks.set(block.id, { nextBlockIds: new Set(), block });

    return this;
  }

  toString(): string {
    return `Blockchain with ${this.blocks.size} blocks:\n${[
      ...this.blocks.entries(),
    ]
      .map(([id, { block }]) => `${id}:${block.toString()}`)
      .join("\n")}`;
  }
}

export default Chain;
