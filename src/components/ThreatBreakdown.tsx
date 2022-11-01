import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Card as MuiCard } from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";

import { getAlignmentColor, getScaledColor } from "../common/useCardColumns";
import { getAlignmentThreatMap } from "../common/threat";

interface Props {
  deckCards: DeckCard[];
}

interface ThreatRow {
  alignment: Alignment;
  threat: number;
}

const ThreatBreakdown = ({ deckCards }: Props) => {
  const columns: TableColumn<ThreatRow>[] = [
    {
      name: "Alignment",
      selector: (row: ThreatRow) => row.alignment,
      conditionalCellStyles: [
        {
          when: (row: ThreatRow) => true,
          style: (row: ThreatRow) => ({
            color: getAlignmentColor(row.alignment),
          }),
        },
      ],
    },
    {
      name: "Threat",
      selector: (row: ThreatRow) => row.threat,
      conditionalCellStyles: [
        {
          when: (row: ThreatRow) => true,
          style: (row: ThreatRow) => ({
            color: getScaledColor(row.threat, 0, 50),
          }),
        },
      ],
    },
  ];

  const data = Object.entries(getAlignmentThreatMap(deckCards)).map(
    ([alignment, threat]) => ({
      alignment,
      threat,
    })
  ) as ThreatRow[];

  return (
    <div>
      <MuiCard>
        <DataTable
          columns={columns}
          data={data}
          defaultSortFieldId="threat"
          sortIcon={<ArrowDownward />}
          dense
          striped
          highlightOnHover
        />
      </MuiCard>
    </div>
  );
};

export default ThreatBreakdown;
