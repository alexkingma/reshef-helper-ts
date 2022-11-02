import React, { createContext } from "react";

import { getDeckCards, getDeckCapacity } from "../common/deck";
import DeckHeader from "./DeckHeader";
import DeckCardList from "./DeckCardList";
import ThreatBreakdown from "./ThreatBreakdown";
import AnteList from "./AnteList";
import { duellists } from "../assets/duellists";

interface Props {
  duellistName: string;
  goToDeck: (duellistName: string) => void;
}

export const DuellistFieldContext = createContext("Arena" as Field);

const DeckPage = ({ duellistName, goToDeck }: Props) => {
  const duellistIdx = duellists.findIndex((d) => d.name === duellistName);
  const duellist = duellists[duellistIdx];
  const deckCards = getDeckCards(duellist.deck, duellist.field);
  const { effectiveDC, rawDC } = getDeckCapacity(duellist.deck);

  return (
    <DuellistFieldContext.Provider value={duellist.field}>
      <DeckHeader
        duellist={duellist}
        effectiveDC={effectiveDC}
        rawDC={rawDC}
        goToDeck={goToDeck}
      />
      <DeckCardList deckCards={deckCards} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ThreatBreakdown deckCards={deckCards} />
        <AnteList cardNames={duellist.ante} />
      </div>
    </DuellistFieldContext.Provider>
  );
};

export default DeckPage;
