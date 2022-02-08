import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import FolderIcon from '@mui/icons-material/Folder';
import CustomizedTreeView from "../SideBar/FileTree"


export default function MiniDrawer() {
    const [openFileTree, setOpenFileTree] = useState(false);

    const handleFileTreeOptionClick = (e: any) => {
        setOpenFileTree(!openFileTree)
    };

    return (
        <Box sx={{ display: 'flex', marginLeft: '-10px', width: "50px" }}>
            <div className=''>
                <List>
                    <ListItem>
                        <FolderIcon
                            id={'file-tree'}
                            onClick={handleFileTreeOptionClick}
                        />
                    </ListItem>
                </List>
            </div>

            <div className='mt-4'>
                {openFileTree && <CustomizedTreeView />}
            </div>
        </Box>
    );
}
