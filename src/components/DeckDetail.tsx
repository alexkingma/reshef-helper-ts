import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Card as MuiCard } from "@mui/material";
import SortIcon from "@mui/icons-material/ArrowDownward";

import useCardColumns from "../common/useCardColumns";
import duellists from "../assets/duellist_list";
import { default as cards } from "../assets/card_list";

type CardRow = Card & {
  qty: number;
};

interface Props {
  duellistName: string;
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
  [key in DataMapKey]: CardRow[];
};

const DeckDetail = ({ duellistName }: Props) => {
  const duellist = duellists.find((d) => d.name === duellistName);
  if (!duellist) {
    return <h1>Duellist not found</h1>;
  }
  const { columns } = useCardColumns();
  const newColumns: TableColumn<CardRow>[] = [
    {
      name: "Qty",
      selector: (row: CardRow) => row.qty,
      sortable: true,
      width: "70px",
    },
    ...(columns as CardRow[]),
  ].filter((col) => !["ID", "Code"].includes(col.name));

  const data = Object.entries(duellist.deck).map(
    ([cardName, qty]: [string, number]) => {
      const card = cards.find((card) => card.name === cardName);
      return { qty, ...(card as Card) };
    }
  );

  const dataMap = data.reduce(
    (map, card) => {
      switch (card.category) {
        case "Monster":
          const numTributes =
            card.level >= 9 ? 3 : card.level >= 7 ? 2 : card.level >= 5 ? 1 : 0;
          map[`monster${numTributes}`].push(card);
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

  const onRowClicked = (row: CardRow) => {
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
      <h3>{duellistName}</h3>
      {tables.map(
        (table, idx) =>
          !!table.cards.length && (
            <React.Fragment key={table.title}>
              <DataTable
                columns={newColumns}
                data={table.cards}
                defaultSortFieldId="id"
                sortIcon={<SortIcon />}
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

export default DeckDetail;
