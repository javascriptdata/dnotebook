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
    name: "Explorer",
    icon: <FolderRoundedIcon />,
  },
  {
    name: "Search",
    icon: <SearchRoundedIcon />,
  },
];

interface MiniDrawerProps {
  setShowPanel: Function;
  showPanel: String | null;
}
export const MiniDrawer: React.FC<MiniDrawerProps> = ({setShowPanel, showPanel}) => {
  const [openFileTree, setOpenFileTree] = useState(false);

  const handleFileTreeOptionClick = (e: any) => {
    setOpenFileTree(!openFileTree);
  };

  return (
    <div className="flex">
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
                onClick={() => {
                  if (showPanel && showPanel === data.name) {
                    setShowPanel(null);
                  } else {
                    setShowPanel(data.name);
                  }
                }}
              >
                {data.icon}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MiniDrawer;