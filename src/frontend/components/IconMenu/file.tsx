import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Cloud from "@mui/icons-material/Cloud";
import FileList from "./fileList";

export default function FileMenu() {
  const [activeMenuOption, setActiveMenuOptions] = useState({
    "file-menu": false,
    "edit-menu": false,
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id;
    setAnchorEl(event.currentTarget);
    //@ts-ignore */
    const selectedMenuOptionState = activeMenuOption[id];
    const newActiveMenuOption: any = {};

    Object.keys(activeMenuOption).forEach((key) => {
      newActiveMenuOption[key] = false;
    });
    newActiveMenuOption[id] = !selectedMenuOptionState;
    setActiveMenuOptions(newActiveMenuOption);
  };
  const listStyle = {
    display: "flex",
    justifyContent: "space-between",
  };
  const fontSize = {
    fontSize: "13px",
    width: "70px",
  };
  const arrowStyle = {
    width: "15px",
    marginLeft: "20px",
  };
  return (
    <div>
      <MenuList>
        <div>
          <MenuItem
            style={listStyle}
            id="file-menu"
            variant={activeMenuOption["file-menu"] ? "outlined" : "text"}
            onMouseEnter={handleMenuClick}
          >
            <div style={fontSize}>File</div>
            <ArrowForwardIosRoundedIcon style={arrowStyle} />
          </MenuItem>
          <Menu
            anchorEl={anchorEl}
            open={activeMenuOption["file-menu"]}
            onClose={handleMenuClick}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            style={{
              marginTop: "-15px",
              borderRadius: "0px",
            }}
          >
            <FileList />
          </Menu>
        </div>
        <MenuItem>
          <div style={fontSize}>Edit</div>
          <ArrowForwardIosRoundedIcon style={arrowStyle} />
        </MenuItem>
        <MenuItem>
          <div style={fontSize}>Selection</div>
          <ArrowForwardIosRoundedIcon style={arrowStyle} />
        </MenuItem>
        <MenuItem>
          <div style={fontSize}>Help</div>
          <ArrowForwardIosRoundedIcon style={arrowStyle} />
        </MenuItem>
      </MenuList>
    </div>
  );
};
