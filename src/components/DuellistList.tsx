import React from "react";
import DataTable from "react-data-table-component";
import { Card as MuiCard } from "@mui/material";
import SortIcon from "@mui/icons-material/ArrowDownward";

import { default as duellists } from "../assets/duellist_list";
import { default as routeDuellists } from "../assets/route_duellists";
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

const data = routeDuellists
  .reduce((list: Duellist[], duellistName) => {
    // only list the route duellists for now
    list.push(duellists.find(({ name }) => name === duellistName)!);
    return list;
  }, [])
  .map((duellist: Duellist, idx) => {
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
        sortIcon={<SortIcon />}
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
