import React from "react";
import Card, { Props as CardProps } from "../Card/Card";
import useGroupUp from "../../lib/useGroupUp";

interface Props {
  cards: CardProps[];
}

const CardCollection: React.FunctionComponent<Props> = ({ cards }) => {
  const { itemGroups: cardGroups } = useGroupUp({ items: cards, groupSize: 3 });

  return (
    <div>
      {cardGroups.map((cardGroup, i) => (
        <div key={i} className="row mb-3">
          {cardGroup.map((card) => (
            <div key={card.title} className="col-sm-4">
              <Card {...card} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CardCollection;
