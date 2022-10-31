import React from "react";
import { Button, Typography } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

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
  const duellistIdx = duellists.findIndex((d) => d.name === duellist.name);
  const numDuellists = duellists.length;
  const isFirst = duellistIdx === 0;
  const isLast = duellistIdx === duellists.length - 1;

  const getName = (duellistIdx: number) => {
    if (duellistIdx >= numDuellists || duellistIdx < 0) {
      return "";
    }
    return duellists[duellistIdx].name;
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowLeft />}
          onClick={onPrevClick}
          disabled={isFirst}
          style={{ flexBasis: "250px" }}
        >
          {getName(duellistIdx - 1)}
        </Button>
        <Typography variant="h5">
          {getName(duellistIdx)} ({duellistIdx + 1}/{numDuellists})
        </Typography>
        <Button
          variant="outlined"
          endIcon={<ArrowRight />}
          onClick={onNextClick}
          disabled={isLast}
          style={{ flexBasis: "250px" }}
        >
          {getName(duellistIdx + 1)}
        </Button>
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
