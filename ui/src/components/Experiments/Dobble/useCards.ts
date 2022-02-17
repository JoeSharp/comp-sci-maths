import React from "react";
import { Card } from "./types";

interface Props {
  items: string[];
}

interface UseCards {
  cards: Card[];
  itemsRequired: number;
}

const useCards = ({ items }: Props): UseCards => {
  return React.useMemo(() => {
    let cards: Card[] = [];
    let itemsRequired = 0;

    if (items.length < 3) {
      itemsRequired = 3 - items.length;
    } else {
      cards.push({ cardItems: [items[0], items[1]] });
      cards.push({ cardItems: [items[0], items[2]] });
      cards.push({ cardItems: [items[1], items[2]] });
      let index = 3;

      while (items.length - index >= cards.length) {
        let newCard: Card = { cardItems: [] };
        for (let x = index; x < index + cards.length; x++) {
          newCard.cardItems.push(items[x]);
        }
        for (let x = 0; x < cards.length; x++) {
          cards[x].cardItems.push(newCard.cardItems[x]);
          index += 1;
        }
        cards.push(newCard);
      }

      if (index < items.length) {
        itemsRequired = cards.length - (items.length - index);
      }
    }

    return {
      cards,
      itemsRequired,
    };
  }, [items]);
};

export default useCards;
