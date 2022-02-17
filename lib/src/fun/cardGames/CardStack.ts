import Stack from "dataStructures/stack/Stack";
import Card from "./Card";

class CardStack {
    cards: Stack<Card>;

    constructor() {
        this.cards = new Stack();
    }

    size() {
        return this.cards.size();
    }

    deal(): Card {
        return this.cards.pop();
    }

    dealMany(count: number = 1): Card[] {
        return Array(count).fill(null).map(() => this.deal());
    }

    contains(card: Card) {
        return !!this.cards.getItems().find(c => c.equals(card))
    }

    place(card: Card) {
        if (this.contains(card)) {
            throw new Error(`This deck already contains ${card.toString()}`)
        }
        this.cards.push(card);
    }

    placeMany(cards: Card[]) {
        cards.forEach(c => this.place(c));
    }

    toString() {
        return this.cards.toString(c => c.toString());
    }
}

export default CardStack;