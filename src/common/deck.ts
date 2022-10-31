import { default as cards } from "../assets/card_list";
import { default as fields } from "../assets/field.json";

export type NumTributes = 0 | 1 | 2 | 3;

const getFieldMultipliers = (field: Field) => {
  return fields[field] as { [key in CardType]: number };
};

export const getCardData = (cardName: CardName, field: Field): Card => {
  const card = { ...cards.find((c) => c.name === cardName) } as Card;
  if (card.category === "Monster") {
    const fieldBuffMap = getFieldMultipliers(field);
    card.atk = Math.floor(card.atk * (fieldBuffMap[card.type] || 1));
    card.def = Math.floor(card.def * (fieldBuffMap[card.type] || 1));
  }
  return card;
};

export const getDeckCapacity = (deck: Deck) => {
  let rawDC = 0;
  let effectiveDC = 0;
  Object.entries(deck).map(([cardName, quant]) => {
    const baseCost = getCardData(cardName as CardName, "Arena").cost;
    rawDC += baseCost * quant;
    if (baseCost !== 999) {
      effectiveDC += baseCost * quant;
    }
  });
  return { effectiveDC, rawDC };
};

export const getNumTributes = ({
  level,
}: MonsterCard | GodCard): NumTributes => {
  return level >= 9 ? 3 : level >= 7 ? 2 : level >= 5 ? 1 : 0;
};

const sortDeck = (a: Card, b: Card) => {
  if (a.category !== "Monster" || b.category !== "Monster") {
    return a.cost - b.cost;
  }
  const atkDefA = Math.max(a.atk, a.def);
  const atkDefB = Math.max(b.atk, b.def);
  return atkDefA - atkDefB || a.atk - b.atk || a.def - b.def;
};

export const getDeck = (deck: Deck, field: Field) => {
  return Object.entries(deck)
    .map(([cardName, qty]: [string, number]) => {
      const card = getCardData(cardName as CardName, field);
      return { qty, ...card };
    })
    .sort(sortDeck);
};
