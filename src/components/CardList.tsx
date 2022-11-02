import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Card as MuiCard } from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";

import cards from "../assets/cards";
import useCardColumns from "../common/useCardColumns";

const CardList = () => {
  const columns = useCardColumns([
    "id",
    "image",
    "name",
    "cost",
    "level",
    "atk",
    "def",
    "alignment",
    "type",
    "code",
  ]) as TableColumn<Card>[];

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
        title="Cards"
        columns={columns}
        data={cards}
        defaultSortFieldId="id"
        sortIcon={<ArrowDownward />}
        pagination
        paginationPerPage={50}
        paginationRowsPerPageOptions={[10, 25, 50, 100, 1000]}
        dense
        striped
        highlightOnHover
        onRowClicked={onRowClicked}
      />
    </MuiCard>
  );
};

export default CardList;
