import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

import { RouteOnlyContext } from "../App";
import { duellists } from "../assets/duellists";

import "./DeckHeader.css";

interface Props {
  duellist: Duellist;
  effectiveDC: number;
  rawDC: number;
  goToDeck: (duellistName: string) => void;
}

const useDuellistNavigation = (duellists: Duellist[], currentIdx: number) => {
  const isRouteOnly = useContext(RouteOnlyContext);

  const getClosestDuellist = (arr: Duellist[], startIdx: number) => {
    // ripple outward from the starting index in both directions
    // to find the closest(idx - wise) duellst to settle on
    let lo = startIdx;
    let hi = startIdx + 1;
    while (arr[lo] || arr[hi]) {
      if (arr[lo]?.inRoute || !isRouteOnly) return arr[lo];
      if (arr[hi]?.inRoute || !isRouteOnly) return arr[hi];
      lo--;
      hi++;
    }
  };

  const prevDuellist = getClosestDuellist(
    duellists.slice(0, currentIdx),
    currentIdx - 1
  );
  const nextDuellist = getClosestDuellist(
    duellists.slice(currentIdx + 1, duellists.length),
    0
  );

  return {
    prevDuellist,
    nextDuellist,
    isFirst: !prevDuellist,
    isLast: !nextDuellist,
  };
};

const DeckHeader = ({ duellist, effectiveDC, rawDC, goToDeck }: Props) => {
  const duellistIdx = duellists.findIndex((d) => d.name === duellist.name);

  const { prevDuellist, nextDuellist, isFirst, isLast } = useDuellistNavigation(
    duellists,
    duellistIdx
  );

  const onPrevClick = () => {
    if (!isFirst) goToDeck(prevDuellist!.name);
  };
  const onNextClick = () => {
    if (!isLast) goToDeck(nextDuellist!.name);
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
          {prevDuellist?.name}
        </Button>
        <Typography variant="h5">{duellist.name}</Typography>
        <Button
          variant="outlined"
          endIcon={<ArrowRight />}
          onClick={onNextClick}
          disabled={isLast}
          className="navButton"
        >
          {nextDuellist?.name}
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
