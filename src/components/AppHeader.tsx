import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

interface Props {
  isRouteOnly: boolean;
  onRouteOnlyToggle: (newIsRouteOnly: boolean) => void;
  mode: string;
  onModeChange: (newMode: string) => void;
}

const AppHeader = ({
  mode,
  onModeChange,
  isRouteOnly,
  onRouteOnlyToggle,
}: Props) => {
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            value={isRouteOnly}
            onChange={(_, newIsChecked) => onRouteOnlyToggle(newIsChecked)}
            defaultChecked
          />
        }
        label="Route Only"
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {mode !== "duellists" && (
          <button onClick={() => onModeChange("duellists")}>Route</button>
        )}
        {mode !== "cards" && (
          <button onClick={() => onModeChange("cards")}>Cards</button>
        )}
      </div>
    </>
  );
};

export default AppHeader;
