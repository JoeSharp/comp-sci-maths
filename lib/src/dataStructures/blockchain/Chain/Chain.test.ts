import { anyHashIsOk } from "../MerkleTree/hashTest";
import Chain from "./Chain"


describe("Chain", () => {
    test("Simple Chain", () => {
        const chain = new Chain(anyHashIsOk);

        chain
            .addTransaction('Monday')
            .addTransaction('Tuesday')
            .addTransaction('Wednesday')
            .addTransaction('Thursday')
            .addTransaction('Friday')
            .addTransaction('Saturday')
            .addTransaction('Sunday')
            .mineNextBlockToCompletion()
            .addTransaction('Red')
            .addTransaction('Orange')
            .addTransaction('Yellow')
            .addTransaction('Green')
            .addTransaction('Blue')
            .addTransaction('Indigo')
            .addTransaction('Violet')
            .mineNextBlockToCompletion()
            .addTransaction('Square')
            .addTransaction('Circle')
            .addTransaction('Triangle')
            .addTransaction('Cross')
            .mineNextBlockToCompletion()

        expect(chain.blocks.length).toBe(3);

        // Check that verify is working
        const shouldBeValid = chain.verify();
        expect(shouldBeValid).toBeTruthy();

        // Make fraudulent amendments and check that verify picks them up
        chain.blocks[1].transactions[0] = 'Foo';
        const shouldBeInvalid = chain.verify();
        expect(shouldBeInvalid).toBeFalsy();
    })

    test("Iterative Chain Mining", () => {
        const chain1 = new Chain(anyHashIsOk);
        const chain2 = new Chain(anyHashIsOk);

        [chain1, chain2].forEach(chain => {
            chain.addTransaction('Monday')
                .addTransaction('Tuesday')
                .addTransaction('Wednesday')
                .addTransaction('Thursday')
                .addTransaction('Friday')
                .addTransaction('Saturday')
                .addTransaction('Sunday')
                .startMiningNextBlock()
        })

        let eitherValid = false;

        while (!eitherValid) {
            [chain1, chain2].forEach(chain => chain.iterateMiningOfNextBlock());
            eitherValid = [chain1, chain2].find(chain => chain.testMiningOfNextBlock()) !== undefined
        }

        // If this test finishes, it has effectively succeeded
    })
})