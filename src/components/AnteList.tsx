import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Card as MuiCard } from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";

import { getCategoryColor, getScaledColor } from "../common/useCardColumns";
import { getCardData } from "../common/deck";

interface Props {
  cardNames: CardName[];
}

const AnteList = ({ cardNames }: Props) => {
  const columns: TableColumn<Card>[] = [
    {
      name: "Card",
      selector: (row: Card) => row.name,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row: Card) => true,
          style: (row: Card) => ({
            color: getCategoryColor(row),
          }),
        },
      ],
    },
    {
      name: "Cost",
      selector: (row: Card) => row.cost,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row: Card) => true,
          style: (row: Card) => ({
            color: getScaledColor(row.cost, 0, 585),
          }),
        },
      ],
    },
  ];

  const cards = cardNames.map((cardName) => getCardData(cardName, "Arena"));

  const onRowClicked = (row: Card) => {
    const link = `https://yugipedia.com/wiki/${row.name.replace(
      /\s/,
      "_"
    )}_(ROD)`;
    window.open(link, "_blank");
  };

  return (
    <MuiCard>
      <DataTable
        columns={columns}
        data={cards}
        defaultSortFieldId="id"
        sortIcon={<ArrowDownward />}
        dense
        striped
        highlightOnHover
        onRowClicked={onRowClicked}
      />
    </MuiCard>
  );
};

export default AnteList;
