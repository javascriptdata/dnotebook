import {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from "react-redux";
import { AppState } from '../../lib/typings/types';
import { updateConfig } from '../../lib/state/reducer';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Input from '@mui/material/Input';
import { editorThemes } from '../../lib/fixtures/editorThemes';

const style = {
    position: 'absolute' as 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function SettingsModal() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { config } = useSelector((state: { app: AppState }) => state.app)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleNotebookThemeChange = (e: any) => {
        const notebookThemeMode = e.target.value;
        const newConfig = { ...config, notebookThemeMode }
        dispatch(updateConfig(newConfig))
    }

    const handleCellThemeChange = (e: any) => {
        const cellTheme = e.target.value;
        const newConfig = { ...config, cellTheme }
        dispatch(updateConfig(newConfig))
    }

    
    return (
        <div>
            <span onClick={handleOpen}>
                Settings
            </span>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <div className='grid grid-cols-2'>
                            <div>
                                <Typography variant='body1'>
                                    Notebook Theme
                                </Typography>
                            </div>
                            <div>
                                <FormControl >
                                    <InputLabel id={`notebook-theme-select`}>Mode</InputLabel>
                                    <Select
                                        labelId={`notebook-theme-select`}
                                        id={`notebook-theme-select`}
                                        value={config.notebookThemeMode}
                                        label="notebookTheme"
                                        style={{ width: '200px' }}
                                        onChange={handleNotebookThemeChange}
                                    >
                                        {
                                            ["dark", "light"].map((mode, i: number) => (
                                                <MenuItem
                                                    key={i}
                                                    value={mode}
                                                >
                                                    {mode}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 mt-4'>
                            <div>
                                <Typography variant='body1'>
                                    Autosave Notebook
                                </Typography>
                            </div>
                            <div>
                                <Checkbox
                                    checked={config.autosaveNotebook}
                                    onChange={() => {
                                        const newConfig = { ...config, autosaveNotebook: !config.autosaveNotebook }
                                        dispatch(updateConfig(newConfig))
                                    }}
                                />
                            </div>
                        </div>
                        <Divider />

                        <div className='grid grid-cols-2 mt-4'>
                            <div>
                                <Typography variant='body1'>
                                    Text Editor Theme
                                </Typography>
                            </div>
                            <div>
                                <FormControl >
                                    <InputLabel id={`cell-theme-select`}>Theme</InputLabel>
                                    <Select
                                        labelId={`cell-theme-select`}
                                        id={`cell-theme-select`}
                                        value={config.cellTheme}
                                        label="cellTheme"
                                        style={{ width: '200px' }}
                                        onChange={handleCellThemeChange}
                                    >
                                        {
                                            editorThemes.map((theme, i: number) => (
                                                <MenuItem
                                                    key={i}
                                                    value={theme}
                                                >
                                                    {theme}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 mt-4'>
                            <div>
                                <Typography variant='body1'>
                                    Text Editor Font Size
                                </Typography>
                            </div>
                            <div>
                                <Input
                                    value={config.cellFontSize}
                                    onChange={(e) => {
                                        const newConfig = { ...config, cellFontSize: e.target.value }
                                        dispatch(updateConfig(newConfig))
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
