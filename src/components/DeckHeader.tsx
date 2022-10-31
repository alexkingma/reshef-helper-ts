import React from "react";
import duellists from "../assets/duellists";

interface Props {
  duellist: Duellist;
  effectiveDC: number;
  rawDC: number;
  onPrevClick: () => void;
  onNextClick: () => void;
}

const DeckHeader = ({
  duellist,
  effectiveDC,
  rawDC,
  onPrevClick,
  onNextClick,
}: Props) => {
  const isFirst = duellists[0].name === duellist.name;
  const isLast = duellists[duellists.length - 1].name === duellist.name;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={onPrevClick} disabled={isFirst}>
          Prev
        </button>
        {duellist.name}
        <button onClick={onNextClick} disabled={isLast}>
          Next
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* TODO: use DuellistRow instead of raw text */}
        {duellist.field}; DC {effectiveDC}{" "}
        {effectiveDC !== rawDC && `(${rawDC})`}
      </div>
    </>
  );
};

export default DeckHeader;
