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

export default function EditMenu() {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>

        <MenuItem>
          <ListItemIcon>
            <UndoIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Undo</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘Z
          </Typography>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <RedoIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Redo</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘Y
          </Typography>
        </MenuItem>
        <Divider /> 

        <MenuItem>
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cut Cell</ListItemText>
          <Typography variant="body2" color="text.secondary">
            X
          </Typography>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy Cell</ListItemText>
          <Typography variant="body2" color="text.secondary">
            C
          </Typography>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <ContentPasteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paste Cell Below</ListItemText>
          <Typography variant="body2" color="text.secondary">
            V
          </Typography>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <ContentPasteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paste Cell Above</ListItemText>
          <Typography variant="body2" color="text.secondary">
            A
          </Typography>
        </MenuItem>
        <Divider /> 

        <MenuItem>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete Cells</ListItemText>
          <Typography variant="body2" color="text.secondary">
            D,D
          </Typography>
        </MenuItem>
        <Divider /> 

        <MenuItem>
          <ListItemIcon>
            <SelectAllIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Select Cell</ListItemText>
          <Typography variant="body2" color="text.secondary">
            S
          </Typography>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <JoinFullIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Merge Selected Cells</ListItemText>
          <Typography variant="body2" color="text.secondary">
            M
          </Typography>
        </MenuItem>
        <Divider /> 

        <MenuItem>
          <ListItemIcon>
            <ClearIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Clear Output</ListItemText>
          <Typography variant="body2" color="text.secondary">
            
          </Typography>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <ClearAllIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Clear All Output</ListItemText>
          <Typography variant="body2" color="text.secondary">
            
          </Typography>
        </MenuItem>

      </MenuList>
    </Paper>
  );
}
