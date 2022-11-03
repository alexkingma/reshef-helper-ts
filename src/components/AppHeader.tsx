import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Checkbox, FormControlLabel } from "@mui/material";

import { RouteOnlyContext } from "../App";
import { Page } from "../App";

import "./AppHeader.css";

interface Props {
  pages: Page[];
  activePage: string;
  onRouteOnlyToggle: (newIsRouteOnly: boolean) => void;
  onPageChange: (newMode: string) => void;
}

function AppHeader({
  pages,
  activePage,
  onPageChange,
  onRouteOnlyToggle,
}: Props) {
  const isRouteOnly = useContext(RouteOnlyContext);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = (page: string) => {
    handleCloseNavMenu();
    onPageChange(page);
  };

  return (
    <AppBar position="static">
      <Toolbar className="toolbar" variant="dense">
        <div className="leftContainer">
          <IconButton
            size="large"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {pages.map((page) => (
              <MenuItem key={page.title} onClick={() => navigate(page.title)}>
                <Typography textAlign="center">{page.title}</Typography>
              </MenuItem>
            ))}
          </Menu>
          <Typography className="pageTitle" variant="h5">
            {activePage}
          </Typography>
        </div>
        <FormControlLabel
          control={
            <Checkbox
              value={isRouteOnly}
              onChange={(_, newIsChecked) => onRouteOnlyToggle(newIsChecked)}
              defaultChecked
            />
          }
          labelPlacement="start"
          label="Route Only"
        />
      </Toolbar>
    </AppBar>
  );
}
export default AppHeader;
