import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { AppState } from '../../lib/typings/types';
import { useSelector, useDispatch } from 'react-redux';
import {
    updateActiveNotebookName,
    setActiveNotebookTabNumber,
    updateNotebooks
} from '../../lib/state/reducer';
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

    const handleTabChange = (event: any, newValue: number) => {
        const currentNotebookTab = notebooks[event.target.innerText]
        dispatch(updateActiveNotebookName(currentNotebookTab.name));
        dispatch(setActiveNotebookTabNumber(newValue));
    };

    const handleContextMenu = (event: React.MouseEvent, name: string) => {
        // @ts-ignore
        if (event.target.innerText === "Dashboard") {
            return;
        }

        if (name !== tabNames[activeNotebookTabNumber]) {
            return
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

    const handleContextMenuClose = () => {
        setContextMenu(null);
    };

    const handleCloseCurrentTab = () => {
        const tabName = tabNames[activeNotebookTabNumber]
        const newNotebooks = { ...notebooks };
        delete newNotebooks[tabName];
        const tabIndexBeforeCurrentTab = tabNames.indexOf(tabName) - 1; //On close set Tab immediately after as the next active Tab
        const tabNameBeforeCurrentTab = tabNames[tabIndexBeforeCurrentTab];
        dispatch(updateActiveNotebookName(tabNameBeforeCurrentTab || "Dashboard"));
        dispatch(setActiveNotebookTabNumber(tabIndexBeforeCurrentTab));
        dispatch(updateNotebooks(newNotebooks));
        handleContextMenuClose();
    }

    const handleCloseOtherTabs = () => {
        const tabName = tabNames[activeNotebookTabNumber]

        const newNotebooks = {
            "Dashboard": { ...notebooks["Dashboard"] },
            [tabName]: { ...notebooks[tabName] },
        }
        dispatch(updateNotebooks(newNotebooks));
        dispatch(updateActiveNotebookName(tabName));
        dispatch(setActiveNotebookTabNumber(1)); //Set to one, because remaining Tab is after Dashboard Tab
        handleContextMenuClose();
    }


    const CustomTabComponent = (props: any) => {
        const { name } = props
        return (
            <div
                onContextMenu={(e) => handleContextMenu(e, name)}
                style={{ cursor: 'context-menu' }}
            >
                <Tab {...props} style={{ textTransform: "none" }} />
                <Menu
                    open={contextMenu !== null}
                    onClose={handleContextMenuClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        contextMenu !== null
                            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                            : undefined
                    }
                >
                    <MenuItem onClick={() => handleCloseCurrentTab()}>Close Tab</MenuItem>
                    <MenuItem id={name} onClick={() => handleCloseOtherTabs()}>Close All Other Tabs</MenuItem>
                </Menu>
            </div>
        );
    }


    return (
        <div className='col-span-12'>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeNotebookTabNumber} onChange={handleTabChange} aria-label="basic tabs example">
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
