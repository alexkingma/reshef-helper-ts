import React from "react";

import { getAlignmentColor, getScaledColor } from "../common/useCardColumns";
import { getAlignmentThreatMap } from "../common/threat";

interface Props {
  deckCards: DeckCard[];
}

const ThreatBreakdown = ({ deckCards }: Props) => {
  return (
    <div>
      Alignment Threat:
      <table style={{ paddingLeft: "20px" }}>
        <tbody>
          {Object.entries(getAlignmentThreatMap(deckCards)).map(
            ([alignment, threat]) => (
              <tr key={alignment}>
                <td
                  style={{
                    color: getAlignmentColor(alignment as Alignment),
                  }}
                >
                  {alignment}
                </td>
                <td style={{ color: getScaledColor(threat as number, 0, 50) }}>
                  {threat as number}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ThreatBreakdown;
