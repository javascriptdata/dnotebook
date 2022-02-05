import { useDispatch } from 'react-redux';
import { setInterpreterMode } from '../../lib/state/reducer';
import NodejsInterpreter from '../../lib/interpreter/server'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import FileMenu from '../IconMenu/file'
import EditMenu from '../IconMenu/edit'
import ViewMenu from '../IconMenu/view'
import RunMenu from '../IconMenu/run'
import ServerMenu from '../IconMenu/server'
import SettingsMenu from '../IconMenu/settings'

const MenuBar = () => {
    const dispatch = useDispatch();
    const [activeMenuOption, setActiveMenuOptions] = useState({
        "file-menu": false,
        "edit-menu": false,
        "view-menu": false,
        "run-menu": false,
        "server-menu": false,
        "settings-menu": false
    })

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.id;
        setAnchorEl(event.currentTarget);
        //@ts-ignore */
        const selectedMenuOptionState = activeMenuOption[id]
        const newActiveMenuOption: any = {}

        Object.keys(activeMenuOption).forEach(key => {
            newActiveMenuOption[key] = false
        })
        newActiveMenuOption[id] = !selectedMenuOptionState
        setActiveMenuOptions(newActiveMenuOption)
    };

    const modeChangeHandler = (value: string) => {
        dispatch(setInterpreterMode(value))
    }

    const handleServerStop = () => {
        const killCellProcessCmd = `stop`;
        const language = "process"
        NodejsInterpreter.exec(killCellProcessCmd, language, (resp) => {
            console.log(resp)
        })
    }

    const handleNotebookRestart = () => {
        //TODO: Save current notebook to local storage
        //TODO: Reload notebook the page from local storage
        console.log("Restarting notebook")
    }

    return (
        <div className="border-b-2 mb-2 mt-20">
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

                <div >
                    <Button
                        id="settings-menu"
                        variant={activeMenuOption["settings-menu"] ? "outlined" : "text"}
                        onClick={handleMenuClick}
                    >
                        <span className='normal-case'>Settings</span>
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={activeMenuOption["settings-menu"]}
                        onClose={handleMenuClick}
                    >
                        < SettingsMenu />
                    </Menu>
                </div>

            </div>
        </div>

        // <div>
        //     <select
        //         onChange={(e: any) => modeChangeHandler(e.target.value)}>
        //         {INTERPRETER_MODES.map((mode, index) => (
        //             <option key={index} value={mode}>{mode}</option>
        //         ))}
        //     </select>
        // </div>
        // <button
        //     onClick={handleServerStop}
        // >
        //     Stop Server
        // </button>
        // <button
        //     onClick={handleNotebookRestart}
        // >
        //     Restart
        // </button> 


    )
}

export default MenuBar