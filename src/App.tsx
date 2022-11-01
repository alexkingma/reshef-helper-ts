import React, { createContext, useState } from "react";

import CardList from "./components/CardList";
import DuellistList from "./components/DuellistList";
import DeckPage from "./components/DeckPage";
import AppHeader from "./components/AppHeader";
import { getDuellists } from "./assets/duellists";

export const DuellistsContext = createContext<Duellist[]>([]);

const App = () => {
  const [mode, setMode] = useState("duellists");
  const [isRouteOnly, setIsRouteOnly] = useState(true);
  const [selectedDuellistName, setSelectedDuellistName] = useState("");

  const goToDeck = (duellistName: string): void => {
    setMode("deck");
    setSelectedDuellistName(duellistName);
  };

  return (
    <DuellistsContext.Provider value={getDuellists(isRouteOnly)}>
      <AppHeader
        isRouteOnly={isRouteOnly}
        onRouteOnlyToggle={setIsRouteOnly}
        mode={mode}
        onModeChange={setMode}
      />
      <>
        {mode === "duellists" && <DuellistList goToDeck={goToDeck} />}
        {mode === "cards" && <CardList />}
        {mode === "deck" && (
          <DeckPage duellistName={selectedDuellistName} goToDeck={goToDeck} />
        )}
      </>
    </DuellistsContext.Provider>
  );
};

export default App;
