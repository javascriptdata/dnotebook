import MenuList from "@mui/material/MenuList";
import { useDispatch } from "react-redux";
import { setDirectories } from "../../lib/state/reducer";
import MenuItem from "@mui/material/MenuItem";
import { openFile, openFolder } from "../../lib/utils/fileSystem";
import { Divider } from "@mui/material";

export default function FileList() {
  const dispatch = useDispatch();
  async function onFolderSelect() {
    const folders = await openFolder();
    dispatch(setDirectories(folders));
  }
  const listStyle = {
    display: "flex",
    justifyContent: "space-between",
  };
  const fontSize = {
    fontSize: "13px",
    minWidth: "180px",
  };
  const arrowStyle = {
    width: "15px",
    marginLeft: "20px",
  };
  return (
    <div>
      <MenuList>
        <MenuItem style={listStyle}>
          <div style={fontSize}>New File</div>
        </MenuItem>
        <MenuItem style={listStyle}>
          <div style={fontSize}>New Window</div>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => openFile()}>
          <div style={fontSize}>Open File</div>
        </MenuItem>
        <MenuItem onClick={() => onFolderSelect()}>
          <div style={fontSize}>Open Folder</div>
        </MenuItem>
        <Divider />
        <MenuItem>
          <div style={fontSize}>Save</div>
        </MenuItem>
        <MenuItem>
          <div style={fontSize}>Save As</div>
        </MenuItem>
        <Divider />
        <MenuItem>
          <div style={fontSize}>Close Editor</div>
        </MenuItem>
      </MenuList>
    </div>
  );
}
