import React from "react";
import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component/dist/src/DataTable/types";
import { Card as MuiCard } from "@mui/material";
import SortIcon from "@mui/icons-material/ArrowDownward";

import { default as cards } from "../assets/card_list";

type CardRow = Card;

const small = "80px";

const getScaledColor = (val: number, min: number, max: number) => {
  const hue = Math.floor((val / (max - min)) * 120); // go from green to red
  return `hsl(${hue}, 100%, 50%)`;
};

const getAlignmentColor = (row: CardRow) => {
  if (row.category !== "Monster") return;
  switch (row.alignment) {
    case "Fiend":
      return "#BD0096";
    case "Earth":
      return "#C52121";
    case "Forest":
      return "#007D2F";
    case "Water":
      return "#00C0F8";
    case "Dark":
      return "#282828";
    case "Light":
      return "#9DA8A6";
    case "Wind":
      return "#93EFC2";
    case "Fire":
      return "#C52121";
    case "Dreams":
      return "#9C94D6";
    case "Divine":
      return "#7207B1";
    case "Thunder":
      return "#EFC700";
  }
};

const getCategoryColor = (row: CardRow) => {
  switch (row.category) {
    case "Monster":
      return row.effect ? "#F36D10" : "#A39D37";
    case "Magic":
      return "#4BE679";
    case "Trap":
      return "#D7174E";
    case "Ritual":
      return "#273AD5";
  }
};

const columns: TableColumn<CardRow>[] = [
  {
    name: "ID",
    selector: (row: CardRow) => row.id,
    sortable: true,
    width: small,
  },
  {
    name: "Card",
    selector: (row: CardRow) => row.name,
    sortable: true,
    grow: 3,
  },
  {
    name: "Cost",
    selector: (row: CardRow) => row.cost,
    sortable: true,
    width: small,
    conditionalCellStyles: [
      {
        when: (row: CardRow) => true,
        style: (row: CardRow) => ({
          color: getScaledColor(row.cost, 0, 585),
        }),
      },
    ],
  },
  {
    name: "Category",
    selector: (row: CardRow) => row.category,
    sortable: true,
    conditionalCellStyles: [
      {
        when: (row: CardRow) => true,
        style: (row: CardRow) => ({
          color: getCategoryColor(row),
        }),
      },
    ],
  },
  {
    name: "Level",
    selector: (row: CardRow) => (row.category === "Monster" ? row.level : ""),
    sortable: true,
    width: small,
  },
  {
    name: "ATK",
    selector: (row: CardRow) => (row.category === "Monster" ? row.atk : ""),
    sortable: true,
    width: small,
  },
  {
    name: "DEF",
    selector: (row: CardRow) => (row.category === "Monster" ? row.def : ""),
    sortable: true,
    width: small,
  },
  {
    name: "Alignment",
    selector: (row: CardRow) =>
      row.category === "Monster" ? row.alignment : "",
    sortable: true,
    conditionalCellStyles: [
      {
        when: (row: CardRow) => true,
        style: (row: CardRow) => ({
          color: getAlignmentColor(row),
          paintOrder: "stroke fill",
        }),
      },
    ],
  },
  {
    name: "Type",
    selector: (row: CardRow) => (row.category === "Monster" ? row.type : ""),
    sortable: true,
  },
  {
    name: "Code",
    selector: (row: CardRow) => ("code" in row ? row.code : ""),
    sortable: true,
    width: small,
  },
];

const data = cards.map((card) => ({ ...card })) as Card[];

const DuellistList = () => {
  return (
    <MuiCard>
      <DataTable
        title="Cards"
        columns={columns}
        data={data}
        defaultSortFieldId="id"
        sortIcon={<SortIcon />}
        pagination
        striped
        highlightOnHover
        paginationRowsPerPageOptions={[10, 25, 50, 100, 1000]}
      />
    </MuiCard>
  );
};

export default DuellistList;
