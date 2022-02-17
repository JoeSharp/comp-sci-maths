import Card, { Suit, Value } from "./Card";
import CardDeck from "./CardDeck"

describe("Card Deck", () => {
    test("Dealing Cards", () => {
        const deck = new CardDeck();

        expect(deck.cards.size()).toBe(52);

        // Check that dealing on reduces the original deck
        deck.deal();
        expect(deck.cards.size()).toBe(51);

        // Deal another 5
        const dealt = deck.dealMany(5);
        expect(dealt.length).toBe(5);
        expect(deck.cards.size()).toBe(46);

        // Deal the rest
        for (let i = 0; i < 46; i++) {
            deck.deal();
        }
        expect(deck.cards.size()).toBe(0);

        // Any further attempt to deal should result in an error
        expect(() => deck.deal()).toThrowError();
    });

    test("Placing Duplicates", () => {
        const deck = new CardDeck();

        expect(() => deck.place(new Card(Suit.Heart, Value.Ace))).toThrowError();
        expect(() => deck.place(new Card(Suit.Spade, Value.Seven))).toThrowError();

        const card1 = deck.deal();
        deck.place(card1);

        expect(() => deck.place(card1)).toThrowError();
    })
})