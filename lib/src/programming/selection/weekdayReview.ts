import readline from 'readline'
import { simpleLogger } from 'common'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a day of the week ', (dayOfWeek) => {
    // Note that I am converting to lower case to do the comparisons
    // This allows the program to be more forgiving
    switch (dayOfWeek.toLowerCase()) {
        case 'monday':
            simpleLogger.info('Fresh for another week of school!')
            break;
        case 'tuesday':
            simpleLogger.info('So much homework already')
            break;
        case 'wednesday':
            simpleLogger.info('Get over the hump day')
            break;
        case 'thursday':
            simpleLogger.info('I can practically smell the weekend')
            break;
        case 'friday':
            simpleLogger.info('Somehow Friday is better than the weekend...')
            break;
        case 'saturday':
            simpleLogger.info('The best TV day? maybe in the 90s it was...')
            break;
        case 'sunday':
            simpleLogger.info('Day of rest...unless you still have homework to hand on Monday')
            break;
    }


    rl.close();
})

rl.on("close", () => {
    simpleLogger.info("Closing ReadLine...");
    process.exit(0);
});