import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

import { DuellistsContext } from "../App";

import "./DeckHeader.css";

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
  const duellists = useContext(DuellistsContext);
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
        className="container"
      >
        <Button
          variant="outlined"
          startIcon={<ArrowLeft />}
          onClick={onPrevClick}
          disabled={isFirst}
          className="navButton"
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
          className="navButton"
        >
          {getName(duellistIdx + 1)}
        </Button>
      </div>
      <div className="subheader">
        {/* TODO: use DuellistRow instead of raw text */}
        {duellist.field}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{duellist.lp}{" "}
        LP&nbsp;&nbsp; &nbsp; {effectiveDC} DC
      </div>
    </>
  );
};

export default DeckHeader;
