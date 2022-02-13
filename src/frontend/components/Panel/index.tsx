import React from 'react';
import Explorer from "./explorer";
import Search from "./search";
import RefreshIcon from "@mui/icons-material/Refresh";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { refreshWorkspaceDirectory } from "../../lib/FileSystem/fileSystem";
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../lib/typings/types';
import { setDirectories } from "../../lib/state/reducer";

interface PanelProps {
  showPanel: String | null;
}


export const Panel: React.FC<PanelProps> = ({ showPanel }) => {
  const dispatch = useDispatch()
  const { activeWorkspaceDirectoryHandle } = useSelector((state: { app: AppState }) => state.app)


  const handleWorkspaceDirectoryRefresh = async () => {
    const folders = await refreshWorkspaceDirectory(activeWorkspaceDirectoryHandle);
    dispatch(setDirectories(folders));
  }

  return (
    <div className="p-2">
      <div className='grid grid-cols-2 border-b-2'>
        <Typography className='ml-7' variant="subtitle1">
          {showPanel}
        </Typography>
        {
          showPanel == "Explorer" ? (
            <div style={{width: "90%"}} className='grid grid-cols-3'>
              <Button >
                <NoteAddIcon />
              </Button>
              <Button>
                <CreateNewFolderIcon />
              </Button>
              <Button onClick={() => handleWorkspaceDirectoryRefresh()}>
                <RefreshIcon />
              </Button>
            </div>
          ) : (
            ""
          )
        }
      </div>
      {showPanel && showPanel === "Explorer" && <Explorer state={undefined} />}
      {showPanel && showPanel === "Search" && <Search />}
    </div>
  );
}


export default Panel;