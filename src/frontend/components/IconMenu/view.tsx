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
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import BlurLinearIcon from '@mui/icons-material/BlurLinear';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import SlideshowIcon from '@mui/icons-material/Slideshow';

export default function ViewMenu() {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>

        <MenuItem>
          <ListItemIcon>
            <PresentToAllIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Presentation Mode All</ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <SlideshowIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Presentation Mode Output</ListItemText>
        </MenuItem>
        <Divider /> 

        <MenuItem>
          <ListItemIcon>
            <ViewSidebarIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Show Left SideBar</ListItemText>
        </MenuItem>
        <Divider />

        <MenuItem>
          <ListItemIcon>
            <BlurLinearIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Show Line Numbers</ListItemText>
        </MenuItem>
        <Divider />

        <MenuItem>
          <ListItemIcon>
            <ExpandLessIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Collapse Selected Cell</ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            {/* <ExpandLessIcon fontSize="small" /> */}
          </ListItemIcon>
          <ListItemText>Collapse Selected Output</ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <UnfoldLessIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Collapse All Cells</ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            {/* <UnfoldLessIcon fontSize="small" /> */}
          </ListItemIcon>
          <ListItemText>Collapse All Outputs</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <ExpandMoreIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Expand Selected Cell</ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            {/* <ExpandMoreIcon fontSize="small" /> */}
          </ListItemIcon>
          <ListItemText>Expand Selected Output</ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <UnfoldMoreIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Expand All Cells</ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            {/* <UnfoldMoreIcon fontSize="small" /> */}
          </ListItemIcon>
          <ListItemText>Expand All Outputs</ListItemText>
        </MenuItem>

      </MenuList>
    </Paper>
  );
}
