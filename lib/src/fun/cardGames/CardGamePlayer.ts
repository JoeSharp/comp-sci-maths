import Card from "./Card";

abstract class CardGamePlayer {
    name: string;
    cards: Card[];
    otherPlayers: CardGamePlayer[];

    constructor(name: string) {
        this.name = name;
        this.cards = [];
        this.otherPlayers = [];
    }

    introduceOtherPlayer(player: CardGamePlayer) {
        this.otherPlayers.push(player);
    }

    giveCard(card: Card) {
        this.cards.push(card);
    }

    abstract gameStarts(): void;
}

export default CardGamePlayer;