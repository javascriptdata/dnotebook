import FileNew from '@mui/icons-material/AddBox';
import FileOpen from '@mui/icons-material/OpenInNew';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SaveIcon from '@mui/icons-material/Save';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import React, { useState } from "react";
import MenuList from "@mui/material/MenuList";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
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
          {/* @ts-ignore */}
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
          <ListItemIcon>
            <FileNew fontSize="small" />
          </ListItemIcon>
          <ListItemText>New</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘N
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FileOpen fontSize="small" />
          </ListItemIcon>
          <ListItemText>Open</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘O
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DriveFileRenameOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Rename Notebook</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘R
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SaveIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Save Notebook</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘S
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SaveAltIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Download</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘D
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ImportExportIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export Notebook As...</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘DE
          </Typography>
          <div style={fontSize}>Edit</div>
          <ArrowForwardIosRoundedIcon style={arrowStyle} />
        </MenuItem>
        <MenuItem>
          <div style={fontSize}>Selection</div>
          <ArrowForwardIosRoundedIcon style={arrowStyle} />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PowerSettingsNewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Shut Down</ListItemText>
          <div style={fontSize}>Help</div>
          <ArrowForwardIosRoundedIcon style={arrowStyle} />
        </MenuItem>
      </MenuList>
    </div>
  );
};
