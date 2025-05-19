import React, { createContext, useState } from "react";

import { disable, enable } from 'darkreader';
import { useEffect } from 'react';

import AppHeader from "./components/AppHeader";
import CardList from "./components/CardList";
import DeckPage from "./components/DeckPage";
import DuellistList from "./components/DuellistList";

import "./App.css";

export const RouteOnlyContext = createContext(true);

export interface Page {
  title: string;
}
const pages: Page[] = [{ title: "Duellists" }, { title: "Cards" }];

const App = () => {
  const [activePage, setActivePage] = useState("Duellists");
  const [isRouteOnly, setIsRouteOnly] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedDuellistName, setSelectedDuellistName] = useState("");

  const goToDeck = (duellistName: string): void => {
    setActivePage("Deck");
    setSelectedDuellistName(duellistName);
  };

  useEffect(() => {
    if (isDarkMode) {
      enable({
        brightness: 100,
        contrast: 90,
        sepia: 10,
      });
    } else {
      disable();
    }
  }, [isDarkMode]);


  return (
    <RouteOnlyContext.Provider value={isRouteOnly}>
      <AppHeader
        pages={pages}
        activePage={activePage}
        onPageChange={setActivePage}
        onRouteOnlyToggle={setIsRouteOnly}
      />
      <div style={{ margin: "8px" }}>
        {activePage === "Duellists" && <DuellistList goToDeck={goToDeck} />}
        {activePage === "Cards" && <CardList />}
        {activePage === "Deck" && (
          <DeckPage duellistName={selectedDuellistName} goToDeck={goToDeck} />
        )}
      </div>
    </RouteOnlyContext.Provider>
  );
};

export default App;
