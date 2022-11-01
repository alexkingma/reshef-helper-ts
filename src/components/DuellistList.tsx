import React, { useContext } from "react";
import DataTable from "react-data-table-component";
import { Card as MuiCard } from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";

import { getDeckCapacityString } from "../common/deck";
import useDuellistColumns, { DuellistRow } from "../common/useDuellistColumns";
import { DuellistsContext } from "../App";

interface Props {
  goToDeck: (name: string) => void;
}

const DuellistList = ({ goToDeck }: Props) => {
  const { columns } = useDuellistColumns();
  const duellists = useContext(DuellistsContext);
  const data = duellists.map((duellist, idx) => {
    const { deck, ...props } = duellist;
    return {
      ...props,
      id: idx + 1,
      dc: getDeckCapacityString(deck),
      numCards: Object.values(deck).reduce((sum, a) => sum + a),
    };
  });

  const onRowClicked = (row: DuellistRow) => goToDeck(row.name);

  return (
    <MuiCard>
      <DataTable
        title={`Duellists (${duellists.length} Total)`}
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
