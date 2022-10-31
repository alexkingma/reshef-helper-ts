import React, { useState } from "react";

import CardList from "./components/CardList";
import DuellistList from "./components/DuellistList";
import DeckPage from "./components/DeckPage";

const App = () => {
  const [mode, setMode] = useState("duellists");
  const [selectedDuellistName, setSelectedDuellistName] = useState("");

  const goToDeck = (duellistName: string): void => {
    setMode("deck");
    setSelectedDuellistName(duellistName);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {mode !== "duellists" && (
          <button onClick={() => setMode("duellists")}>Route</button>
        )}
        {mode !== "cards" && (
          <button onClick={() => setMode("cards")}>Cards</button>
        )}
      </div>
      <>
        {mode === "duellists" && <DuellistList goToDeck={goToDeck} />}
        {mode === "cards" && <CardList />}
        {mode === "deck" && (
          <DeckPage duellistName={selectedDuellistName} goToDeck={goToDeck} />
        )}
      </>
    </>
  );
};

export default App;
