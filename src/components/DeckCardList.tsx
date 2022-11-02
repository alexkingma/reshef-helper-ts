import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Card as MuiCard } from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";

import useCardColumns from "../common/useCardColumns";
import { getNumTributes } from "../common/deck";

interface Props {
  deckCards: DeckCard[];
}

type DataMapKey =
  | "monster0"
  | "monster1"
  | "monster2"
  | "monster3"
  | "magic"
  | "trap"
  | "ritual";
type DataMap = {
  [key in DataMapKey]: DeckCard[];
};

const DeckCardList = ({ deckCards }: Props) => {
  const columns = useCardColumns([
    "qty",
    "threat",
    "image",
    "name",
    "cost",
    "level",
    "atk",
    "def",
    "alignment",
    "type",
  ]) as TableColumn<DeckCard>[];

  const dataMap = deckCards.reduce(
    (map, card) => {
      switch (card.category) {
        case "Monster":
          map[`monster${getNumTributes(card)}`].push(card);
          break;
        case "Magic":
          map.magic.push(card);
          break;
        case "Trap":
          map.trap.push(card);
          break;
        case "Ritual":
          map.ritual.push(card);
          break;
      }
      return map;
    },
    {
      monster0: [],
      monster1: [],
      monster2: [],
      monster3: [],
      magic: [],
      trap: [],
      ritual: [],
    } as DataMap
  );

  const onRowClicked = (row: DeckCard) => {
    const link = `https://yugipedia.com/wiki/${row.name.replace(
      /\s/,
      "_"
    )}_(ROD)`;
    window.open(link, "_blank");
  };

  const tables = [
    { title: "0-4", cards: dataMap.monster0 },
    { title: "5-6", cards: dataMap.monster1 },
    { title: "7-8", cards: dataMap.monster2 },
    { title: "9-12", cards: dataMap.monster3 },
    { title: "Spell", cards: dataMap.magic },
    { title: "Trap", cards: dataMap.trap },
    { title: "Ritual", cards: dataMap.ritual },
  ];

  return (
    <MuiCard>
      {tables.map(
        (table, idx) =>
          !!table.cards.length && (
            <React.Fragment key={table.title}>
              <DataTable
                columns={columns}
                data={table.cards}
                defaultSortFieldId="id"
                sortIcon={<ArrowDownward />}
                dense
                striped
                highlightOnHover
                onRowClicked={onRowClicked}
                noTableHead={idx !== 0}
              />
              <hr />
            </React.Fragment>
          )
      )}
    </MuiCard>
  );
};

export default DeckCardList;
