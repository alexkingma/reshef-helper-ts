import React from "react";
import DataTable from "react-data-table-component";
import { Card as MuiCard } from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";

import duellists from "../assets/duellists";
import { getDeckCapacity } from "../common/deck";
import useDuellistColumns, { DuellistRow } from "../common/useDuellistColumns";

interface Props {
  goToDeck: (name: string) => void;
}

const getDC = (deck: Deck) => {
  const { effectiveDC, rawDC } = getDeckCapacity(deck);
  if (effectiveDC === rawDC) return rawDC.toLocaleString();
  return `${effectiveDC.toLocaleString()} (${rawDC.toLocaleString()})`;
};

const data = duellists.map((duellist: Duellist, idx) => {
  const { deck, ...props } = duellist;
  return {
    ...props,
    id: idx + 1,
    dc: getDC(deck),
    numCards: Object.values(deck).reduce((sum, a) => sum + a),
  };
});

const DuellistList = ({ goToDeck }: Props) => {
  const { columns } = useDuellistColumns();

  const onRowClicked = (row: DuellistRow) => {
    goToDeck(row.name);
  };

  return (
    <MuiCard>
      <DataTable
        title="Duellists"
        columns={columns}
        data={data}
        defaultSortFieldId="id"
        sortIcon={<ArrowDownward />}
        pagination
        paginationPerPage={50}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        dense
        striped
        highlightOnHover
        onRowClicked={onRowClicked}
      />
    </MuiCard>
  );
};

export default DuellistList;
