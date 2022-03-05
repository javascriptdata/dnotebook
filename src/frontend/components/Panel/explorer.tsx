import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { setDirectories } from "../../lib/state/reducer";
import { openFolder, openNotebookFromFileName } from "../../lib/FileSystem/fileSystem";
import { connect } from "react-redux";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { 
  setActiveWorkspaceDirectoryHandle,
  setActiveNotebookTabNumber,
  updateActiveNotebookName,
  addNotebook,
 } from "../../lib/state/reducer"
import { AppState } from "../../lib/typings/types";
interface PanelProps {
  state: any;
  name: string;
  items: any,
};

const RecursiveComponent: React.FC<PanelProps> = ({ name, items }) => {
  const hasChildren = items && items;

  return (
    <>
      <TreeItem nodeId={name} label={name} className="mt-1" key={name}>
        {hasChildren &&
          items.map((item: JSX.IntrinsicAttributes & PanelProps & { children?: React.ReactNode; }) => <RecursiveComponent key={item.name} {...item} />)}
      </TreeItem>
    </>
  );
};

export const Explorer: React.FC<{ state: any }> = ({ state }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<string[]>([]);
  const { activeWorkspaceDirectoryHandle, notebooks, activeNotebookName } = useSelector((state: { app: AppState }) => state.app)

  async function onFolderSelect() {
    const folders = await openFolder();
    dispatch(setActiveWorkspaceDirectoryHandle(folders?.directoryHandle))
    dispatch(setDirectories(folders));
  }

  const handleSelect = async (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected(nodeIds);
    //@ts-ignore
    const selectedItemName = event.target.innerText
    if (!selectedItemName){
      return;
    }

    if (["dnb", "md", "txt", "js", "ts", "sh", "json"].includes(selectedItemName.split(".").pop())) {

      if (selectedItemName === activeNotebookName){
        return;
      }

      if (notebooks[selectedItemName]){
        const tabNames = Object.keys(notebooks)
        const tabIndex = tabNames.indexOf(selectedItemName)
        dispatch(setActiveNotebookTabNumber(tabIndex))
        dispatch(updateActiveNotebookName(selectedItemName))
        return;
      }


      const notebook = await openNotebookFromFileName(selectedItemName, activeWorkspaceDirectoryHandle)
      dispatch(addNotebook(notebook))
      const tabNames = Object.keys(notebooks)
      dispatch(setActiveNotebookTabNumber(tabNames.length))
      dispatch(updateActiveNotebookName(selectedItemName))
    }
  };


  return (
    <div className="mt-5 px-4 text-sm">
      {state && Object.keys(state).length ? (
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          selected={selected}
          onNodeSelect={handleSelect}
          sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        >
          <RecursiveComponent {...state} />
        </TreeView>
      ) : (
        <div>
          <p>You have not yet added a folder to the workspace.</p>
          <Button className="mt-4" onClick={onFolderSelect}>
            Open Folder
          </Button>
        </div>
      )}
    </div>
  );
};

interface State {
  state: Object;
  app: any;
}
function mapStateToProps(state: State) {
  return {
    state: state.app.directories,
  };
}
export default connect(mapStateToProps, null)(Explorer);
