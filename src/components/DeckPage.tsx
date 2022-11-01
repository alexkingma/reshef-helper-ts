import React, { createContext } from "react";

import duellists from "../assets/duellists";
import { getDeckCards, getDeckCapacity } from "../common/deck";
import DeckHeader from "./DeckHeader";
import DeckCardList from "./DeckCardList";
import ThreatBreakdown from "./ThreatBreakdown";
import AnteList from "./AnteList";

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

  const goToPrevDuellist = () => goToDeck(duellists[duellistIdx - 1].name);
  const goToNextDuellist = () => goToDeck(duellists[duellistIdx + 1].name);

  return (
    <DuellistFieldContext.Provider value={duellist.field}>
      <DeckHeader
        duellist={duellist}
        effectiveDC={effectiveDC}
        rawDC={rawDC}
        onPrevClick={goToPrevDuellist}
        onNextClick={goToNextDuellist}
      />
      <DeckCardList deckCards={deckCards} />
      <AnteList cardNames={duellist.ante} />
      <ThreatBreakdown deckCards={deckCards} />
    </DuellistFieldContext.Provider>
  );
};

export default DeckPage;
