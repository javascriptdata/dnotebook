import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import FileMenu from '../IconMenu/file'
import EditMenu from '../IconMenu/edit'
import ViewMenu from '../IconMenu/view'
import RunMenu from '../IconMenu/run'
import ServerMenu from '../IconMenu/server'
import SettingsModal from '../Modals/Settings';
import { useSelector } from 'react-redux';
import { AppState } from '../../lib/typings/types';
import SaveStatusLabel from './saveStatusLabel';

const MenuBar = () => {
  const { notebookSavingStatus, activeNotebookName } = useSelector((state: { app: AppState }) => state.app)
  const [activeMenuOption, setActiveMenuOptions] = useState({
    "file-menu": false,
    "edit-menu": false,
    "view-menu": false,
    "run-menu": false,
    "server-menu": false,
  })


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id;
    setAnchorEl(event.currentTarget);
    //@ts-ignore */
    const selectedMenuOptionState = activeMenuOption[id];
    const newActiveMenuOption: any = {};

    Object.keys(activeMenuOption).forEach((key) => {
      newActiveMenuOption[key] = false;
    });
    newActiveMenuOption[id] = !selectedMenuOptionState;
    setActiveMenuOptions(newActiveMenuOption);
  };


  return (
    <div style={{
      zIndex: 99,
    }}
      className="border-b-2 mt-20 grid grid-cols-2">
      <div className="flex">
        <div >
          <Button
            id="file-menu"
            variant={activeMenuOption["file-menu"] ? "outlined" : "text"}
            onClick={handleMenuClick}
          >
            <span className='normal-case'>File</span>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={activeMenuOption["file-menu"]}
            onClose={handleMenuClick}
          >
            < FileMenu />
          </Menu>
        </div>
        <div >
          <Button
            id="edit-menu"
            variant={activeMenuOption["edit-menu"] ? "outlined" : "text"}
            onClick={handleMenuClick}
          >
            <span className='normal-case'>Edit</span>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={activeMenuOption["edit-menu"]}
            onClose={handleMenuClick}
          >
            < EditMenu />
          </Menu>
        </div>

        <div >
          <Button
            id="view-menu"
            variant={activeMenuOption["view-menu"] ? "outlined" : "text"}
            onClick={handleMenuClick}
          >
            <span className='normal-case'>View</span>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={activeMenuOption["view-menu"]}
            onClose={handleMenuClick}
          >
            < ViewMenu />
          </Menu>
        </div>

        <div >
          <Button
            id="run-menu"
            variant={activeMenuOption["run-menu"] ? "outlined" : "text"}
            onClick={handleMenuClick}
          >
            <span className='normal-case'>Run</span>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={activeMenuOption["run-menu"]}
            onClose={handleMenuClick}
          >
            < RunMenu />
          </Menu>
        </div>

        <div >
          <Button
            id="server-menu"
            variant={activeMenuOption["server-menu"] ? "outlined" : "text"}
            onClick={handleMenuClick}
          >
            <span className='normal-case'>Server</span>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={activeMenuOption["server-menu"]}
            onClose={handleMenuClick}
          >
            < ServerMenu />
          </Menu>
        </div>

        <div>
          <Button>
            <span className='normal-case'> < SettingsModal /></span>
          </Button>
        </div>
      </div>
      <div className='justify-self-end mr-5'>
        {
          activeNotebookName !== "Dashboard" ?
            <SaveStatusLabel notebookStatus={notebookSavingStatus} />
            :
            <div></div>
        }
      </div>
    </div>
  )
}

export default MenuBar
