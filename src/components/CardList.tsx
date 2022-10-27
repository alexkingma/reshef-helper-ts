import React from "react";
import DataTable from "react-data-table-component";
import { Card as MuiCard } from "@mui/material";
import SortIcon from "@mui/icons-material/ArrowDownward";

import { default as cards } from "../assets/card_list";
import useCardColumns from "../common/useCardColumns";

const data = cards.map((card) => ({ ...card })) as Card[];

const CardList = () => {
  const { columns } = useCardColumns();

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
        data={data}
        defaultSortFieldId="id"
        sortIcon={<SortIcon />}
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
