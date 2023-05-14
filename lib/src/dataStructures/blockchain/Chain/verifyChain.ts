import { INITIAL_HASH } from "../Block/Block";
import verifyBlock from "../Block/verifyBlock";
import Chain from "./Chain";

/**
 * Recursive function for validating the block chain
 * It starts at the first transaction, and traces forwards to check
 * the hashes still match.
 * @param chain The complete chain
 * @param id The ID we are verifying 'from'
 * @param previousBlockHash The hash of the previous block
 * @returns True/False to indicate valid
 */
function verifyChainFrom(chain: Chain, id: string, previousBlockHash: string) {
  const indexedBlock = chain.blocks.get(id);

  if (!indexedBlock) {
    throw new Error(
      `Could not find block with ID of ${id}, despite traversal leading me to look for one`
    );
  }

  const { block, nextBlockIds } = indexedBlock;

  // If this block fails to verify, return false
  if (!verifyBlock(block, previousBlockHash)) {
    throw new Error(
      `Block with ID ${block.id} failed to verify against previous hash ${previousBlockHash}`
    );
  }

  // Verify chain from this one forward, if any fail...
  [...nextBlockIds].forEach((nextId) =>
    verifyChainFrom(chain, nextId, block.hash)
  );
}

/**
 * Verify that a chain is valid
 * @returns True/False to indicate if the chain is still valid.
 */
function verifyChain(chain: Chain) {
  verifyChainFrom(chain, chain.firstBlockId, INITIAL_HASH);
}

export default verifyChain;
