import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { AppState } from '../../lib/typings/types';
import { useSelector, useDispatch } from 'react-redux';
import { updateActiveNotebookName, setActiveNotebookTabNumber, updateNotebooks } from '../../lib/state/reducer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function NotebookTabPanel() {
    const [contextMenu, setContextMenu] = useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    const dispatch = useDispatch();
    const { notebooks, activeNotebookTabNumber } = useSelector((state: { app: AppState }) => state.app)
    const tabNames = Object.keys(notebooks)

    const handleChange = (event: any, newValue: number) => {
        const currentNotebookTab = notebooks[event.target.innerText]
        dispatch(updateActiveNotebookName(currentNotebookTab.name));
        dispatch(setActiveNotebookTabNumber(newValue));
    };

    const handleContextMenu = (event: React.MouseEvent) => {
        // @ts-ignore
        if (event.target.innerText === "Dashboard") {
            return;
        }
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX - 2,
                    mouseY: event.clientY - 4,
                }
                : null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    const handleCloseTab = (name: string) => {
        if (name === "Dashboard") {
            return;
        }
        const newNotebooks = { ...notebooks };
        delete newNotebooks[name];
        const tabIndexBeforeCurrentTab = tabNames.indexOf(name) - 1;
        const tabNameBeforeCurrentTab = tabNames[tabIndexBeforeCurrentTab];
        dispatch(updateActiveNotebookName(tabNameBeforeCurrentTab || "Dashboard"));
        dispatch(setActiveNotebookTabNumber(tabIndexBeforeCurrentTab));
        dispatch(updateNotebooks(newNotebooks));
        handleClose();
    }

    const CustomTabComponent = (props: any) => {
        const { name } = props
        return (
            <div
                onContextMenu={handleContextMenu}
                style={{ cursor: 'context-menu' }}
            >
                <Tab {...props} style={{ textTransform: "none" }} />
                <Menu
                    open={contextMenu !== null}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        contextMenu !== null
                            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                            : undefined
                    }
                >
                    <MenuItem onClick={() => handleCloseTab(name)}>Close Tab</MenuItem>
                    <MenuItem onClick={handleClose}>Close All Other Tabs</MenuItem>
                    <MenuItem onClick={handleClose}>Rename Notebook</MenuItem>
                    <MenuItem onClick={handleClose}>Delete Notebook</MenuItem>

                </Menu>
            </div>
        );
    }


    return (
        <div className='col-span-12'>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeNotebookTabNumber} onChange={handleChange} aria-label="basic tabs example">
                    {
                        tabNames.map((name, i) => {
                            return (
                                <CustomTabComponent key={i} label={name} name={name} />
                            )
                        })
                    }
                </Tabs>
            </Box>
        </div>
    );
}
