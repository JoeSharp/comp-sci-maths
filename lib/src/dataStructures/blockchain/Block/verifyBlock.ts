import Block, { INITIAL_HASH } from "./Block";

/**
 * Verify that a block has valid values.
 *
 * @param block The block to verify
 * @param previousHashExpected The previous hash, from a previous block
 * @returns true if it's valid
 */
function verifyBlock(
  block: Block,
  previousHashExpected: string = INITIAL_HASH
): boolean {
  // Is the previous hash as expected?
  if (block.previousHash !== previousHashExpected) {
    return false;
  }

  // Does the hash we carry still match the one we calculated before?
  const hashCheck = block.generateHash();
  if (hashCheck !== block.hash) {
    return false;
  }

  // Nothing went wrong, assume all is good
  return true;
}

export default verifyBlock;
