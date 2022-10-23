import React from "react";

import { default as opponents } from "../assets/opponents.json";
import { cards } from "../assets/card_list.json";

type CardName = keyof typeof opponents;

interface CardQuantityMap {
  [card: string]: number;
}

const OpponentList = () => {
  const getBaseCost = (cardName: string): number => {
    const card = cards.find((c) => c.name === cardName);
    if (!card) {
      console.log(`Card data for ${cardName} not found!`);
      return -1;
    }
    return card.cost;
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Opponent</td>
            <td>Cards</td>
            <td>DC</td>
          </tr>
        </thead>
        <tbody>
          {Object.keys(opponents).map((name) => {
            const cardMap: CardQuantityMap = opponents[name as CardName];
            return (
              <tr key={name}>
                <td>{name}</td>
                <td>
                  {Object.values(cardMap).reduce((total, x) => total + x, 0)}
                </td>
                <td>
                  {Object.keys(cardMap).reduce(
                    (total, cardName) =>
                      total + getBaseCost(cardName) * cardMap[cardName],
                    0
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default OpponentList;
