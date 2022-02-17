import React from "react";

import { Card } from "./types";
import useCards from "./useCards";

interface Props {
  items: string[];
}

const Cards: React.FunctionComponent<Props> = ({ items }) => {
  const { cards, itemsRequired } = useCards({ items });

  return (
    <div>
      {itemsRequired > 0 ? (
        <div className="alert alert-danger" role="alert">
          Please add {itemsRequired} more items
        </div>
      ) : null}
      <ul>
        {cards.map(({ cardItems }: Card, i) => (
          <li key={i}>{cardItems.join(", ")}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cards;
