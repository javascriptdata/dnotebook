import * as React from 'react';
import { useDispatch } from "react-redux";
import { setDirectories } from "../../lib/state/reducer";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import { openFile, openFolder } from "../../lib/utils/fileSystem";

export default function FileMenu() {
  const dispatch = useDispatch();
  async function onFolderSelect() {
    const folders = await openFolder();
    console.log(folders);
    dispatch(setDirectories(folders))
  }
  return (
    <Paper sx={{ width: 320, maxWidth: "100%" }}>
      <MenuList>
        <MenuItem onClick={() => openFile()}>
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Open File</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘X
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => onFolderSelect()}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Open Folder</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘C
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘V
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
