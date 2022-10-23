import React from "react";

import { default as opponents } from "../assets/opponents.json";

type CardName = keyof typeof opponents;

interface CardQuantityMap {
  [card: string]: number;
}

const OpponentList = () => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Opponent</td>
            <td>Cards</td>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default OpponentList;
