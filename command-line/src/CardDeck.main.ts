import simplePrompt from 'simplePrompt';
import simpleLogger from 'simpleLogger';
import { MainFunction } from "types";
import CardDeck from "comp-sci-maths-lib/dist/fun/cardGames/CardDeck";
import CardStack from "comp-sci-maths-lib/dist/fun/cardGames/CardStack";

interface MenuItem {
    title: string;
    operation: () => void;
}

const main: MainFunction = () => {
    const deck = new CardDeck();
    const hand = new CardStack();

    while (true) {
        const options: MenuItem[] = [
            {
                title: 'Deal From Deck',
                operation: () => {
                    const card = deck.deal();
                    hand.place(card);
                    simpleLogger.info(`Putting ${card.toString()} from deck to your hand`)
                }
            },
            {
                title: 'Place from Stack',
                operation: () => {
                    const card = hand.deal();
                    deck.place(card);
                    simpleLogger.info(`Putting ${card.toString()} from your hand to the deck`)
                }
            }
        ]

        simpleLogger.info("Card Deck");
        options.forEach(({ title }, i) => {
            simpleLogger.info(`${i}: ${title}`)
        });

        const selection = parseInt(simplePrompt(`Enter your selection (0 to ${options.length - 1})`), 10);
        if (selection < options.length) {
            try {
                options[selection].operation();
            } catch (e) {
                simpleLogger.warn(e);
            }
        } else {
            simpleLogger.warn('Invalid Selection');
            break;
        }
    }
}

export default main;