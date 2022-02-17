import { fisherYatesShuffle, getAllEnumValues } from "common";
import Card, { Suit, Value } from "./Card";
import CardStack from "./CardStack";

/**
 * A stack of cards, pre-populated by all the standard cards.
 */
class CardDeck extends CardStack {

    constructor() {
        super();

        const allCards: Card[] = [];
        getAllEnumValues(Suit).forEach(suit => {
            getAllEnumValues(Value)
                .map(value => new Card(suit, value))
                .forEach(c => allCards.push(c))
        });

        fisherYatesShuffle(allCards);

        allCards.forEach(c => this.place(c));
    }
}

export default CardDeck;