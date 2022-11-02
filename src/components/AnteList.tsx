import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Card as MuiCard } from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";

import useCardColumns from "../common/useCardColumns";
import { getCardData, sortDeck } from "../common/deck";

interface Props {
  cardNames: CardName[];
}

const AnteList = ({ cardNames }: Props) => {
  if (!cardNames.length) return null;

  const columns = useCardColumns([
    "image",
    "name",
    "cost",
    "level",
    "atk",
    "def",
  ]) as TableColumn<Card>[];

  const cards = cardNames
    .map((cardName) => getCardData(cardName, "Arena"))
    .sort(sortDeck);

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
        title={`Ante Pool (1/${cardNames.length} or ${Math.round(
          100 / cardNames.length
        )}% each)`}
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
