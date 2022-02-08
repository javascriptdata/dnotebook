import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import FileNew from '@mui/icons-material/AddBox';
import FileOpen from '@mui/icons-material/OpenInNew';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SaveIcon from '@mui/icons-material/Save';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';


export default function FileMenu() {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
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
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PowerSettingsNewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Shut Down</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
