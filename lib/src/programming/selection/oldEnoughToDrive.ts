import readline from 'readline'
import { simpleLogger } from 'common'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('How old are you? ', (ageStr) => {
    // Any response is a string, it must be converted to an integer before we can evaluate it numerically
    const age = parseInt(ageStr, 10);

    // Selection is used here to determine which branch to go down
    if (age < 17) {
        simpleLogger.info('You are too young to learn to drive')
    } else {
        simpleLogger.info('You are old enough to learn to drive')
    }

    rl.close();
})

rl.on("close", () => {
    simpleLogger.info("Closing ReadLine...");
    process.exit(0);
});