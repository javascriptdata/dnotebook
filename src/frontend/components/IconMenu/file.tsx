import FileNew from '@mui/icons-material/AddBox';
import FileOpen from '@mui/icons-material/OpenInNew';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SaveIcon from '@mui/icons-material/Save';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import React, { useState } from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import { openFile, openFolder } from "../../lib/utils/fileSystem";
import { addNewBlankNotebook } from "../../lib/state/reducer"
import { useDispatch } from 'react-redux';

export default function FileMenu() {
  const dispatch = useDispatch()

  const handleNewBlankFileOpen = () => {
    console.log("New Blank File");
    dispatch(addNewBlankNotebook({
      name: `Untitled_${Math.floor(Math.random() * 100)}`,
    }))

  }

  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
        <MenuItem onClick={() => handleNewBlankFileOpen()}>
          <ListItemIcon>
            <FileNew fontSize="small" />
          </ListItemIcon>
          <ListItemText>New</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘N
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => openFile()}>
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
          <ListItemText>Export Notebook as ...</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘DE
          </Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
};
