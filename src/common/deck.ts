import { default as cards } from "../assets/card_list";
import { default as fields } from "../assets/field.json";
import { getCardThreatMap } from "./threat";

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

export const getAverageCardCost = (deck: Deck) => {
  const { effectiveDC, rawDC } = getDeckCapacity(deck);
  const numCards = Object.values(deck).reduce((sum, qty) => sum + qty, 0);
  return {
    effectiveAvg: Math.round(effectiveDC / numCards),
    rawAvg: Math.round(rawDC / numCards),
  };
};

export const getAverageAnteCost = (cardNames: CardName[]) => {
  const tempDeck = cardNames.reduce(
    (deck, cardName: CardName) => ({ ...deck, [cardName]: 1 }),
    {} as Deck
  );
  return getAverageCardCost(tempDeck);
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

export const getDeck = (deck: Deck, field: Field): DeckCard[] => {
  const cardThreatMap = getCardThreatMap(deck, field);
  return Object.entries(deck)
    .map(([cardName, qty]: [string, number]) => {
      const card = getCardData(cardName as CardName, field);
      const threat = cardThreatMap[cardName as CardName]!;
      return { qty, threat, ...card };
    })
    .sort(sortDeck);
};
