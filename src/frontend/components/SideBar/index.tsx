import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import FolderIcon from "@mui/icons-material/Folder";
import CustomizedTreeView from "../SideBar/FileTree";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Button } from "@mui/material";
import MenuBar from "../MenuBar/notebookOptionsBar";

export const sideNavData = [
  {
    name: "explorer",
    icon: <FolderRoundedIcon />,
  },
  {
    name: "search",
    icon: <SearchRoundedIcon />,
  },
];

export default function MiniDrawer() {
  const [openFileTree, setOpenFileTree] = useState(false);

  const handleFileTreeOptionClick = (e: any) => {
    setOpenFileTree(!openFileTree);
  };

  return (
      <div className="flex flex-col justify-center items-center mt-6">
          <MenuBar />
      {sideNavData.map((data) => {
        return (
          <div
            style={{
              marginTop: "25px",
              cursor: "pointer",
            }}
            key={data.name}
          >
            <Button
              style={{
                padding: "5px",
              }}
            >
              {data.icon}
            </Button>
          </div>
        );
      })}
    </div>
    // <Box sx={{ display: 'flex', marginLeft: '-10px', width: "50px" }}>
    //     <div className=''>
    //         <List>
    //             <ListItem>
    //                 <FolderIcon
    //                     id={'file-tree'}
    //                     onClick={handleFileTreeOptionClick}
    //                 />
    //             </ListItem>
    //         </List>
    //     </div>

    //     <div className='mt-4'>
    //         {openFileTree && <CustomizedTreeView />}
    //     </div>
    // </Box>
  );
}
