import { default as cards } from "../assets/card_list";
import { default as fields } from "../assets/field.json";

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

export const getNumTributes = ({ level }: MonsterCard | GodCard) => {
  return level >= 9 ? 3 : level >= 7 ? 2 : level >= 5 ? 1 : 0;
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
  const tributeThreatMultiplierMap = {
    // 0-tribute monsters are more threat-relevant than 1/2/3-tribute monsters
    0: 1,
    1: 0.8,
    2: 0.6,
    3: 0.5,
  };
  const defMultiplier = 0.8; // DEF is less threatening than ATK

  // compare against a deck's range of monsters to determine relative threat level
  const tributeAtkDefRange = Object.keys(deck).reduce((map, cardName) => {
    const cardData = getCardData(cardName as CardName, field);
    if (cardData.category !== "Monster") return map;
    const atkDef = Math.max(cardData.atk, cardData.def * defMultiplier);
    const numTributes = getNumTributes(cardData);
    map[numTributes] = {
      max: Math.max(map[numTributes]?.max || 0, atkDef),
      min: Math.min(map[numTributes]?.min || Number.MAX_SAFE_INTEGER, atkDef),
    };
    return map;
  }, {} as { [key in 0 | 1 | 2 | 3]: { min: number; max: number } });

  Object.entries(deck).map(([cardName, qty]) => {
    const cardData = getCardData(cardName as CardName, field);
    if (cardData.category !== "Monster") return;
    const numTributes = getNumTributes(cardData);
    const tributeThreatMultiplier = tributeThreatMultiplierMap[numTributes];
    const { min, max } = tributeAtkDefRange[numTributes];
    const atkDef = Math.max(cardData.atk, cardData.def * defMultiplier);
    threatMap[cardData.alignment] +=
      (0.5 + (atkDef - min) / (max - min + 1)) *
      atkDef *
      tributeThreatMultiplier *
      qty;
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

  // sort by threat level
  return Object.entries(threatMap)
    .sort(([, a], [, b]) => b - a)
    .reduce(
      (map, [alignment, threat]) => ({ ...map, [alignment]: threat }),
      {}
    );
};
