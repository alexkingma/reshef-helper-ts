import React, { useState } from "react";
import CardList from "./components/CardList";

import DuellistList from "./components/DuellistList";

const App = () => {
  const [mode, setMode] = useState("opponentlist");

  return (
    <>
      <button onClick={() => setMode("cardlist")}>Show Cards</button>
      <button onClick={() => setMode("opponentlist")}>Show Duellists</button>
      <DuellistList />
      <CardList />
    </>
  );
};

export default App;
