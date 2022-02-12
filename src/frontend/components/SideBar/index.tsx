import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Button } from "@mui/material";

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
  return (
    <div className="flex">
      <div className="flex flex-col justify-center items-center">
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