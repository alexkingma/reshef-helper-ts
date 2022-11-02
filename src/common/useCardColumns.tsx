import { useContext } from "react";
import { TableColumn } from "react-data-table-component";
import { DuellistFieldContext } from "../components/DeckPage";

import { getFieldMultipliers } from "./deck";
import { getImage } from "./image";

export type CardColumnKey =
  | "id"
  | "image"
  | "name"
  | "cost"
  | "level"
  | "atk"
  | "def"
  | "alignment"
  | "type"
  | "code";
export type DeckCardColumnKey = "qty" | "threat";

type CardColumnMap = { [key in CardColumnKey]: TableColumn<Card> };
type DeckCardColumnMap = { [key in DeckCardColumnKey]: TableColumn<DeckCard> };

export const getScaledColor = (val: number, min: number, max: number) => {
  const hue = Math.floor((val / (max - min)) * 120); // from green to red
  return `hsl(${hue}, 100%, 50%)`;
};

export const getAlignmentColor = (alignment: Alignment) => {
  switch (alignment) {
    case "Fiend":
      return "#BD0096";
    case "Earth":
      return "#C52121";
    case "Forest":
      return "#007D2F";
    case "Water":
      return "#00C0F8";
    case "Dark":
      return "#282828";
    case "Light":
      return "#9DA8A6";
    case "Wind":
      return "#93EFC2";
    case "Fire":
      return "#C52121";
    case "Dreams":
      return "#9C94D6";
    case "Divine":
      return "#7207B1";
    case "Thunder":
      return "#EFC700";
    default:
      return "inherit";
  }
};

export const getCategoryColor = (row: Card) => {
  switch (row.category) {
    case "Monster":
      return row.effect ? "#F36D10" : "inherit";
    case "Magic":
      return "#4BE679";
    case "Trap":
      return "#D7174E";
    case "Ritual":
      return "#273AD5";
  }
};

const useCardColumns = (
  desiredColumnKeys: (CardColumnKey | DeckCardColumnKey)[]
) => {
  const duellistField = useContext(DuellistFieldContext);

  const cardColumnMap: CardColumnMap = {
    id: {
      name: "ID",
      selector: (row: Card) => row.id,
      sortable: true,
      width: "70px",
    },
    image: {
      name: "",
      selector: (row: Card) => "",
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row: Card) => true,
          style: (row: Card) => ({
            background: `no-repeat -16px url(${getImage(row.name)})`,
          }),
        },
      ],
      width: "80px",
    },
    name: {
      name: "Card",
      selector: (row: Card) => row.name,
      sortable: true,
      grow: 3,
      conditionalCellStyles: [
        {
          when: (row: Card) => true,
          style: (row: Card) => ({
            color: getCategoryColor(row),
          }),
        },
      ],
    },
    cost: {
      name: "Cost",
      selector: (row: Card) => row.cost,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row: Card) => true,
          style: (row: Card) => ({
            color: getScaledColor(row.cost, 0, 585),
          }),
        },
      ],
    },
    level: {
      name: "Level",
      selector: (row: Card) => {
        return "*"
          .repeat("level" in row ? row.level : 0)
          .replace(/(\*{1,4})(\*{0,2})(\*{0,2})(\*{0,4})/, "$1 $2 $3 $4");
      },
      sortable: true,
    },
    atk: {
      name: "ATK",
      selector: (row: Card) => ("atk" in row ? row.atk : ""),
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row: Card) => true,
          style: (row: Card) => ({
            color: "atk" in row ? getScaledColor(row.atk, 0, 3000) : "inherit",
          }),
        },
      ],
      sortFunction: (a, b) => {
        const atkA = "atk" in a ? a.atk : -1;
        const atkB = "atk" in b ? b.atk : -1;
        return atkA - atkB;
      },
    },
    def: {
      name: "DEF",
      selector: (row: Card) => ("def" in row ? row.def : ""),
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row: Card) => true,
          style: (row: Card) => ({
            color: "def" in row ? getScaledColor(row.def, 0, 3000) : "inherit",
          }),
        },
      ],
      sortFunction: (a, b) => {
        const defA = "def" in a ? a.def : -1;
        const defB = "def" in b ? b.def : -1;
        return defA - defB;
      },
    },
    alignment: {
      name: "Alignment",
      selector: (row: Card) => ("alignment" in row ? row.alignment : ""),
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row: Card) => true,
          style: (row: Card) => ({
            color:
              "alignment" in row ? getAlignmentColor(row.alignment) : "inherit",
          }),
        },
      ],
    },
    type: {
      name: "Type",
      selector: (row: Card) => ("type" in row ? row.type : ""),
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row: Card) => true,
          style: (row: Card) => {
            let color = "inherit";
            if ("type" in row) {
              const cardFieldMulti =
                getFieldMultipliers(duellistField)[row.type];
              if (cardFieldMulti > 1) color = "green";
              if (cardFieldMulti < 1) color = "red";
            }
            return { color };
          },
        },
      ],
    },
    code: {
      name: "Code",
      selector: (row: Card) => (row.code !== -1 ? row.code : ""),
      sortable: true,
    },
  };

  const deckCardColumnMap: DeckCardColumnMap = {
    qty: {
      name: "Qty",
      selector: (row: DeckCard) => row.qty,
      sortable: true,
      width: "70px",
    },
    threat: {
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
  };

  const mergedColumnMap = { ...cardColumnMap, ...deckCardColumnMap };
  return desiredColumnKeys.map((key) => mergedColumnMap[key]);
};

export default useCardColumns;
