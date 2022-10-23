import React from "react";

import { cards } from "../assets/card_list.json";

const CardList = () => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Card</td>
            <td>Cost</td>
            <td>Category</td>
            <td>Level</td>
            <td>ATK</td>
            <td>DEF</td>
            <td>Alignment</td>
            <td>Type</td>
            <td>Effect</td>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => {
            return (
              <tr key={card.id}>
                <td>{card.id}</td>
                <td>{card.name}</td>
                <td>{card.cost}</td>
                <td>{card.category}</td>
                <td>{card.level}</td>
                <td>{card.atk}</td>
                <td>{card.def}</td>
                <td>{card.alignment}</td>
                <td>{card.type}</td>
                <td>{card.effect && "Yes"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default CardList;
