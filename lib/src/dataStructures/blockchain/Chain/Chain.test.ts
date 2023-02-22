import { anyHashIsOk } from "../MerkleTree/hashTest";
import Miner from "../Miner";
import Chain from "./Chain";
import verifyChain from "./verifyChain";

describe("Chain", () => {
  test("Simple Chain", () => {
    const chain = new Chain<string>();

    chain
      .addBlock(
        new Miner(
          anyHashIsOk,
          chain
            .createNextBlock()
            .addTransaction("Monday")
            .addTransaction("Tuesday")
            .addTransaction("Wednesday")
            .addTransaction("Thursday")
            .addTransaction("Friday")
            .addTransaction("Saturday")
            .addTransaction("Sunday")
        ).mineToCompletion()
      )
      .addBlock(
        new Miner(
          anyHashIsOk,
          chain
            .createNextBlock()
            .addTransaction("Red")
            .addTransaction("Orange")
            .addTransaction("Yellow")
            .addTransaction("Green")
            .addTransaction("Blue")
            .addTransaction("Indigo")
            .addTransaction("Violet")
        ).mineToCompletion()
      )
      .addBlock(
        new Miner(
          anyHashIsOk,
          chain
            .createNextBlock()
            .addTransaction("Square")
            .addTransaction("Circle")
            .addTransaction("Triangle")
            .addTransaction("Cross")
        ).mineToCompletion()
      );

    expect(chain.blocks.length).toBe(3);

    // Check that verify is working
    const shouldBeValid = verifyChain(chain);
    expect(shouldBeValid).toBeTruthy();

    // Make fraudulent amendments and check that verify picks them up
    chain.blocks[1].transactions[0] = "Foo";
    const shouldBeInvalid = verifyChain(chain);
    expect(shouldBeInvalid).toBeFalsy();
  });
});
