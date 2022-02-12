import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { AppState } from '../../lib/typings/types';
import { useSelector, useDispatch } from 'react-redux';
import { updateActiveNotebookName, setActiveNotebookTabNumber } from '../../lib/state/reducer';

export default function NotebookTabPanel() {
    const dispatch = useDispatch();
    const { notebooks, activeNotebookTabNumber } = useSelector((state: { app: AppState }) => state.app)
    const tabNames = Object.keys(notebooks)

    const handleChange = (event: any, newValue: number) => {
        const currentNotebookTab = notebooks[event.target.innerText]
        dispatch(updateActiveNotebookName(currentNotebookTab.name));
        dispatch(setActiveNotebookTabNumber(newValue));
    };

    return (
        <div className='col-span-12'>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeNotebookTabNumber} onChange={handleChange} aria-label="basic tabs example">
                    {
                        tabNames.map((name, i) => {
                            return <Tab style={{ textTransform: "none" }} key={i} label={name} />
                        })
                    }
                </Tabs>
            </Box>
        </div>
    );
}
