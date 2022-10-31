import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Card as MuiCard } from "@mui/material";
import SortIcon from "@mui/icons-material/ArrowDownward";

import useCardColumns, {
  getAlignmentColor,
  getScaledColor,
} from "../common/useCardColumns";
import duellists from "../assets/duellist_list";
import { getDeck, getDeckCapacity, getNumTributes } from "../common/deck";
import { getAlignmentThreatMap } from "../common/threat";

interface Props {
  duellistName: string;
}

type DataMapKey =
  | "monster0"
  | "monster1"
  | "monster2"
  | "monster3"
  | "magic"
  | "trap"
  | "ritual";
type DataMap = {
  [key in DataMapKey]: DeckCard[];
};

const DeckDetail = ({ duellistName }: Props) => {
  const duellist = duellists.find((d) => d.name === duellistName) as Duellist;
  const { columns } = useCardColumns();
  const newColumns: TableColumn<DeckCard>[] = [
    {
      name: "Qty",
      selector: (row: DeckCard) => row.qty,
      sortable: true,
      width: "70px",
    },
    {
      name: "Threat",
      selector: (row: DeckCard) => row.threat,
      sortable: true,
      width: "90px",
      conditionalCellStyles: [
        {
          when: (row: DeckCard) => true,
          style: (row: DeckCard) => ({
            color: getScaledColor(row.threat, 0, 20),
          }),
        },
      ],
    },
    ...(columns as DeckCard[]),
  ].filter((col) => !["ID", "Code"].includes(col.name));

  const deckCards = getDeck(duellist.deck, duellist.field);
  const dataMap = deckCards.reduce(
    (map, card) => {
      switch (card.category) {
        case "Monster":
          map[`monster${getNumTributes(card)}`].push(card);
          break;
        case "Magic":
          map.magic.push(card);
          break;
        case "Trap":
          map.trap.push(card);
          break;
        case "Ritual":
          map.ritual.push(card);
          break;
      }
      return map;
    },
    {
      monster0: [],
      monster1: [],
      monster2: [],
      monster3: [],
      magic: [],
      trap: [],
      ritual: [],
    } as DataMap
  );

  const onRowClicked = (row: DeckCard) => {
    const link = `https://yugipedia.com/wiki/${row.name.replace(
      /\s/,
      "_"
    )}_(ROD)`;
    window.open(link, "_blank");
  };

  const tables = [
    { title: "0-4", cards: dataMap.monster0 },
    { title: "5-6", cards: dataMap.monster1 },
    { title: "7-8", cards: dataMap.monster2 },
    { title: "9-12", cards: dataMap.monster3 },
    { title: "Spell", cards: dataMap.magic },
    { title: "Trap", cards: dataMap.trap },
    { title: "Ritual", cards: dataMap.ritual },
  ];

  const { effectiveDC, rawDC } = getDeckCapacity(duellist.deck);

  return (
    <MuiCard>
      <h3>{duellistName}</h3>
      {tables.map(
        (table, idx) =>
          !!table.cards.length && (
            <React.Fragment key={table.title}>
              <DataTable
                columns={newColumns}
                data={table.cards}
                defaultSortFieldId="id"
                sortIcon={<SortIcon />}
                dense
                striped
                highlightOnHover
                onRowClicked={onRowClicked}
                noTableHead={idx !== 0}
              />
              <hr />
            </React.Fragment>
          )
      )}
      <div>Field: {duellist.field}</div>
      <div>
        DC: {effectiveDC} {effectiveDC !== rawDC && `(${rawDC})`}
      </div>
      <div>
        Alignment Threat:
        <table style={{ paddingLeft: "20px" }}>
          <tbody>
            {Object.entries(getAlignmentThreatMap(deckCards)).map(
              ([alignment, threat]) => (
                <tr key={alignment}>
                  <td
                    style={{ color: getAlignmentColor(alignment as Alignment) }}
                  >
                    {alignment}
                  </td>
                  <td
                    style={{ color: getScaledColor(threat as number, 0, 50) }}
                  >
                    {threat as number}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div>Types: ?</div>
    </MuiCard>
  );
};

export default DeckDetail;
