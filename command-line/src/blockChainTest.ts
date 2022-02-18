import simpleLogger from "simpleLogger"
import Chain from '@comp-sci-maths/lib/dist/dataStructures/blockchain/Chain'
import PeerNode from '@comp-sci-maths/lib/dist/dataStructures/blockchain/PeerNode';
import { topXNibblesAreZero } from '@comp-sci-maths/lib/dist/dataStructures/blockchain/MerkleTree/hashTest'

const topThreeNibblesAreZero = topXNibblesAreZero(3);

function chainTest(): void {
    const chain = new Chain(topThreeNibblesAreZero);

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

    simpleLogger.info(chain.toString());
}

// chainTest();

function peerTest() {
    const me = new PeerNode((err) => {

        simpleLogger.info("Error? " + err);
        simpleLogger.info("Keys Generated" + JSON.stringify(me));
    });
}

peerTest()