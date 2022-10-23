import React, { useState } from "react";
import CardList from "./components/CardList";

import OpponentList from "./components/OpponentList";

const App = () => {
  const [mode, setMode] = useState("opponentlist");

  return (
    <>
      <button onClick={() => setMode("cardlist")}>Show Card List</button>
      <button onClick={() => setMode("opponentlist")}>
        Show Opponent List
      </button>
      {mode === "opponentlist" ? <OpponentList /> : <CardList />}
    </>
  );
};

export default App;
