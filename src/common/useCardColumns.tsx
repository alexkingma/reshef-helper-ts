import { TableColumn } from "react-data-table-component/dist/src/DataTable/types";

type CardRow = Card;

const useCardColumns = () => {
  const getScaledColor = (val: number, min: number, max: number) => {
    const hue = Math.floor((val / (max - min)) * 120); // from green to red
    return `hsl(${hue}, 100%, 50%)`;
  };

  const getAlignmentColor = (row: CardRow) => {
    if (row.category !== "Monster") return;
    switch (row.alignment) {
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
    }
  };

  const getCategoryColor = (row: CardRow) => {
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

  const columns: TableColumn<CardRow>[] = [
    {
      name: "ID",
      selector: (row: CardRow) => row.id,
      sortable: true,
      width: "70px",
    },
    {
      name: "Card",
      selector: (row: CardRow) => row.name,
      sortable: true,
      grow: 3,
      conditionalCellStyles: [
        {
          when: (row: CardRow) => true,
          style: (row: CardRow) => ({
            color: getCategoryColor(row),
          }),
        },
      ],
    },
    {
      name: "Cost",
      selector: (row: CardRow) => row.cost,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row: CardRow) => true,
          style: (row: CardRow) => ({
            color: getScaledColor(row.cost, 0, 585),
          }),
        },
      ],
    },
    {
      name: "Level",
      selector: (row: CardRow) => {
        if (row.category !== "Monster") return "";
        return "*"
          .repeat(row.level)
          .replace(/(\*{1,4})(\*{0,2})(\*{0,2})(\*{0,4})/, "$1 $2 $3 $4");
      },
      sortable: true,
    },
    {
      name: "ATK",
      selector: (row: CardRow) => (row.category === "Monster" ? row.atk : ""),
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row: CardRow) => true,
          style: (row: CardRow) => ({
            color:
              row.category === "Monster"
                ? getScaledColor(row.atk, 0, 3000)
                : "inherit",
          }),
        },
      ],
      sortFunction: (a, b) => {
        const atkA = a.category === "Monster" ? a.atk : -1;
        const atkB = b.category === "Monster" ? b.atk : -1;
        return atkA - atkB;
      },
    },
    {
      name: "DEF",
      selector: (row: CardRow) => (row.category === "Monster" ? row.def : ""),
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row: CardRow) => true,
          style: (row: CardRow) => ({
            color:
              row.category === "Monster"
                ? getScaledColor(row.def, 0, 3000)
                : "inherit",
          }),
        },
      ],
      sortFunction: (a, b) => {
        const defA = a.category === "Monster" ? a.def : -1;
        const defB = b.category === "Monster" ? b.def : -1;
        return defA - defB;
      },
    },
    {
      name: "Alignment",
      selector: (row: CardRow) =>
        row.category === "Monster" ? row.alignment : "",
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row: CardRow) => true,
          style: (row: CardRow) => ({
            color: getAlignmentColor(row),
            paintOrder: "stroke fill",
          }),
        },
      ],
    },
    {
      name: "Type",
      selector: (row: CardRow) => (row.category === "Monster" ? row.type : ""),
      sortable: true,
    },
    {
      name: "Code",
      selector: (row: CardRow) => ("code" in row ? row.code : ""),
      sortable: true,
    },
  ];

  return { columns };
};

export default useCardColumns;
