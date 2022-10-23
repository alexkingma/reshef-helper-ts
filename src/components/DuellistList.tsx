import React from "react";
import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component/dist/src/DataTable/types";
import { Card as MuiCard } from "@mui/material";
import SortIcon from "@mui/icons-material/ArrowDownward";

import { default as duellists } from "../assets/duellist_list";
import { default as cards } from "../assets/card_list";

type DuellistRow = Omit<Duellist, "deck" | "ante"> & {
  dc: string;
  numCards: number;
};

const getBaseCost = (cardName: CardName): number => {
  const card = cards.find((c) => c.name === cardName);
  if (!card) {
    console.log(`Card data for ${cardName} not found!`);
    return -1;
  }
  return card.cost;
};

const getDC = (deck: Deck) => {
  let rawDC = 0;
  let effectiveDC = 0;
  Object.entries(deck).map(([cardName, quant]) => {
    const baseCost = getBaseCost(cardName as CardName);
    rawDC += baseCost * quant;
    if (baseCost !== 999) {
      effectiveDC += baseCost * quant;
    }
  });
  if (effectiveDC === rawDC) return rawDC.toLocaleString();
  return `${effectiveDC.toLocaleString()} (${rawDC.toLocaleString()})`;
};

const columns: TableColumn<DuellistRow>[] = [
  {
    name: "ID",
    selector: (row: DuellistRow) => row.id,
    sortable: true,
    width: "80px",
  },
  {
    name: "Opponent",
    selector: (row: DuellistRow) => row.name,
    sortable: true,
    grow: 2,
  },
  {
    name: "Cards",
    selector: (row: DuellistRow) => row.numCards,
    sortable: true,
  },
  {
    name: "DC",
    selector: (row: DuellistRow) => row.dc,
    sortable: true,
    sortFunction: (a, b) => {
      const dcA = parseInt(a.dc.split("(")[0].replace(",", ""), 10);
      const dcB = parseInt(b.dc.split("(")[0].replace(",", ""), 10);
      return dcA - dcB;
    },
  },
  {
    name: "Field",
    selector: (row: DuellistRow) => (row.field === "Arena" ? "" : row.field),
    sortable: true,
  },
  {
    name: "LP",
    selector: (row: DuellistRow) => row.lp,
    sortable: true,
    format: (row: DuellistRow) => row.lp.toLocaleString(),
  },
  {
    name: "$$",
    selector: (row: DuellistRow) => row.payout || "",
    sortable: true,
  },
  {
    name: "Location",
    selector: (row: DuellistRow) => row.location,
    sortable: true,
    grow: 2,
  },
];

const data = duellists.map((duellist: Duellist) => {
  const { deck, ...props } = duellist;
  return {
    ...props,
    dc: getDC(deck),
    numCards: Object.values(deck).reduce((sum, a) => sum + a),
  };
});

const DuellistList = () => {
  return (
    <MuiCard>
      <DataTable
        title="Duellists"
        columns={columns}
        data={data}
        defaultSortFieldId="id"
        sortIcon={<SortIcon />}
        pagination
        striped
        highlightOnHover
      />
    </MuiCard>
  );
};

export default DuellistList;
