import Queue from "dataStructures/queue/Queue";
import CardDeck from "./CardDeck";
import CardGamePlayer from "./CardGamePlayer";

const INITIAL_CARD_DEAL = 7;

abstract class CardGame<P extends CardGamePlayer> {
    deckOfCards: CardDeck;
    players: Queue<P>;
    gameStarted: boolean;

    constructor() {
        this.deckOfCards = new CardDeck();
        this.gameStarted = false;
    }

    withPlayer(player: P): this {
        if (this.gameStarted) {
            throw new Error('Cannot add players once game started')
        }

        for (let i = 0; i < INITIAL_CARD_DEAL; i++) {
            player.giveCard(this.deckOfCards.deal());
        }
        this.players.push(player);

        return this;
    }

    start() {
        const playersList = this.players.getItems();

        // Introduce all players to each other
        playersList.forEach((player, i) => {
            playersList.forEach((otherPlayer, j) => {
                if (i !== j) {
                    player.introduceOtherPlayer(otherPlayer);
                }
            });
        })
        playersList.forEach(p => p.gameStarts());

        this.gameStarted = true;
    }

    takeTurn() {
        // Who's go is it next?
        const player = this.players.pop();

        this.takePlayerTurn(player);

        // That player goes to back of the queue to play
        this.players.push(player);
    }

    abstract takePlayerTurn(player: P): void;
}

export default CardGame;