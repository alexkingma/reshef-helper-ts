import { getCardData, getNumTributes, NumTributes } from "./deck";

type DeckTributeAtkDefMap = {
  [key in NumTributes]: { min: number; max: number };
};

const DEF_MULTIPLIER = 0.8; // DEF is less threatening than ATK

const getTributeThreatMultiplier = (card: MonsterCard | GodCard) => {
  const TRIBUTE_THREAT_MULTIPLIER_MAP = {
    // 0-tribute monsters are more threat-relevant than 1/2/3-tribute monsters
    0: 1,
    1: 0.8,
    2: 0.6,
    3: 0.5,
  };
  const numTributes = getNumTributes(card);
  return TRIBUTE_THREAT_MULTIPLIER_MAP[numTributes];
};

export const getAlignmentThreatMap = (deck: Deck, field: Field) => {
  const threatMap = {
    Fiend: 0,
    Earth: 0,
    Forest: 0,
    Water: 0,
    Dark: 0,
    Light: 0,
    Wind: 0,
    Fire: 0,
    Dreams: 0,
    Divine: 0,
    Thunder: 0,
  };

  // compare against a deck's range of monsters to determine relative threat level
  const tributeAtkDefRange = getDeckTributeAtkDefMap(deck, field);
  Object.entries(deck).map(([cardName, qty]) => {
    const card = getCardData(cardName as CardName, field);
    if (card.category !== "Monster") return;
    const { max, min } = tributeAtkDefRange[getNumTributes(card)];
    threatMap[card.alignment] += getCardThreat(card, min, max) * qty;
  });

  // normalise threat scores as a percentage of deck total threat
  const totalThreat = Object.values(threatMap).reduce(
    (total, x) => total + x,
    0
  );
  Object.entries(threatMap).map(([alignment, threat]) => {
    if (!threatMap[alignment as keyof typeof threatMap]) {
      delete threatMap[alignment as keyof typeof threatMap];
      return;
    }
    threatMap[alignment as keyof typeof threatMap] = Math.round(
      (threat / totalThreat) * 100
    );
  });

  // sort alignments by threat level
  return Object.entries(threatMap)
    .sort(([, a], [, b]) => b - a)
    .reduce(
      (map, [alignment, threat]) => ({ ...map, [alignment]: threat }),
      {}
    );
};

// compare against a deck's range of monsters to determine relative threat level
const getCardThreat = (
  card: Card,
  deckMinAtkDef: number,
  deckMaxAtkDef: number
) => {
  if (card.category !== "Monster") return -1;
  const atkDef = Math.max(card.atk, card.def * DEF_MULTIPLIER);
  const relativeMultiplier =
    0.5 + (atkDef - deckMinAtkDef) / (deckMaxAtkDef - deckMinAtkDef + 1);
  return atkDef * relativeMultiplier * getTributeThreatMultiplier(card);
};

const getDeckTributeAtkDefMap = (deck: Deck, field: Field) => {
  // compute max/min atkDef for each tribute tier in a deck
  return Object.keys(deck).reduce((map, cardName) => {
    const cardData = getCardData(cardName as CardName, field);
    if (cardData.category !== "Monster") return map;
    const atkDef = Math.max(cardData.atk, cardData.def * DEF_MULTIPLIER);
    const numTributes = getNumTributes(cardData);
    map[numTributes] = {
      max: Math.max(map[numTributes]?.max || 0, atkDef),
      min: Math.min(map[numTributes]?.min || Number.MAX_SAFE_INTEGER, atkDef),
    };
    return map;
  }, {} as DeckTributeAtkDefMap);
};
