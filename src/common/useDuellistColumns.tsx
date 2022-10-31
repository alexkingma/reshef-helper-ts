import { TableColumn } from "react-data-table-component/dist/src/DataTable/types";
import { getAverageAnteCost, getAverageCardCost } from "./deck";
import { getScaledColor } from "./useCardColumns";

export type DuellistRow = Omit<Duellist, "deck"> & {
  id: number;
  dc: string;
  numCards: number;
};

const dcToNumber = (dc: string) => {
  return parseInt(dc.split("(")[0].replace(",", ""), 10);
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
      grow: 3,
    },
    {
      name: "Ante Avg",
      selector: (row: DuellistRow) =>
        row.ante.length ? getAverageAnteCost(row.ante).rawAvg : "",
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row: DuellistRow) => true,
          style: (row: DuellistRow) => ({
            color: getScaledColor(getAverageAnteCost(row.ante).rawAvg, 0, 400),
          }),
        },
      ],
    },
    {
      name: "DC",
      selector: (row: DuellistRow) => row.dc,
      sortable: true,
      sortFunction: (a, b) => {
        return dcToNumber(a.dc) - dcToNumber(b.dc);
      },
      conditionalCellStyles: [
        {
          when: (row: DuellistRow) => true,
          style: (row: DuellistRow) => ({
            color: getScaledColor(dcToNumber(row.dc), 1500, 6000),
          }),
        },
      ],
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
      conditionalCellStyles: [
        {
          when: (row: DuellistRow) => true,
          style: (row: DuellistRow) => ({
            color: getScaledColor(row.lp, 5000, 20000),
          }),
        },
      ],
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
