import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import SaveIcon from '@mui/icons-material/Save';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

export default function SettingsMenu() {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>

        <MenuItem>
          <ListItemIcon>
            <WysiwygIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Theme</ListItemText>
        </MenuItem>
        <Divider /> 

        <MenuItem>
          <ListItemIcon>
            <SaveIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Autosave Notebook</ListItemText>
        </MenuItem>
        <Divider /> 

        <MenuItem>
          <ListItemIcon>
            <FormatIndentIncreaseIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Text Editor Indentation</ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <TextIncreaseIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Increase Text Editor Size</ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <TextDecreaseIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Decrease Text Editor Size</ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <IntegrationInstructionsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Text Editor Theme</ListItemText>
        </MenuItem>

      </MenuList>
    </Paper>
  );
}
