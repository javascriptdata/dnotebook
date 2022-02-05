import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';

export default function RunMenu() {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <PlayArrowIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Run Cell</ListItemText>
          <Typography variant="body2" color="text.secondary">
          ⇧ Enter
          </Typography>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <PlayLessonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Run Cell and Insert Below</ListItemText>
          <Typography variant="body2" color="text.secondary">
           Ctrl Enter
          </Typography>
        </MenuItem>

       <MenuItem>
          <ListItemIcon>
            <PlaylistPlayIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Run All Cell</ListItemText>
        </MenuItem>

      </MenuList>
    </Paper>
  );
}
