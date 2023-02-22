import verifyBlock from "../Block/verifyBlock";
import Chain from "./Chain";

/**
 * Verify that a chain is valid
 * @returns True/False to indicate if the chain is still valid.
 */
function verifyChain<T>(chain: Chain<T>): boolean {
  let isValid = true;

  let lastBlock = chain.blocks[0];
  let i = 1;

  while (isValid && i < chain.blocks.length) {
    const thisBlock = chain.blocks[i];
    if (!verifyBlock(thisBlock, lastBlock.hash)) {
      isValid = false;
    }

    lastBlock = thisBlock;
    i++;
  }

  return isValid;
}

export default verifyChain;
