import * as React from 'react';
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
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import JoinFullIcon from '@mui/icons-material/JoinFull';
import ClearIcon from '@mui/icons-material/Clear';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

export default function ServerMenu() {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>

        <MenuItem>
          <ListItemIcon>
            <CancelScheduleSendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Interrupt Server</ListItemText>
          <Typography variant="body2" color="text.secondary">
            I, I
          </Typography>
        </MenuItem>
        <Divider /> 

        <MenuItem>
          <ListItemIcon>
            <RestartAltIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Restart Server</ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <PlaylistRemoveIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Restart Server and Clear All Outputs</ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <PlaylistPlayIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Restart Server and Run All Cells</ListItemText>
        </MenuItem>
        <Divider /> 

        <MenuItem>
          <ListItemIcon>
            <PowerSettingsNewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Shut Down Server</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
