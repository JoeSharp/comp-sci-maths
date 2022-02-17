export enum Suit {
    Heart = 'Heart',
    Diamond = "Diamond",
    Club = 'Club',
    Spade = 'Spade'
}

export enum Value {
    Ace = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Nine = 9,
    Ten = 10,
    Jack = 11,
    Queen = 12,
    King = 13
}

class Card {
    suit: Suit;
    value: Value;
    shown: boolean;

    constructor(suit: Suit, value: Value, shown: boolean = false) {
        this.suit = suit;
        this.value = value;
        this.shown = shown;
    }

    equals(other: Card) {
        if (this.suit !== other.suit) return false;
        if (this.value !== other.value) return false;
        return true;
    }

    toString() {
        return `${this.value} of ${this.suit}s (${this.shown ? 'shown' : 'hidden'})`;
    }

    show() {
        this.shown = true;
    }

    hide() {
        this.shown = false;
    }
}

export default Card;