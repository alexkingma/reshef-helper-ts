import { TableColumn } from "react-data-table-component/dist/src/DataTable/types";

export type DuellistRow = Omit<Duellist, "deck" | "ante"> & {
  id: number;
  dc: string;
  numCards: number;
};

const useDuellistColumns = () => {
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

  return { columns };
};

export default useDuellistColumns;
