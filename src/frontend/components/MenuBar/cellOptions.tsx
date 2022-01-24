import Box from '@mui/material/Box';
import UpArrowIcon from '@mui/icons-material/ArrowUpward';
import DownArrowIcon from '@mui/icons-material/ArrowDownward';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CopyIcon from '@mui/icons-material/CopyAll';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { cellLanguages } from "../../lib/fixtures/languages";
import { AppState, LangaugeOption, NbCell } from "../../lib/typings/types";
import { useDispatch, useSelector } from "react-redux";
import { updateCells, updateCellIds } from "../../lib/state/reducer"
import { v4 as uuid_v4 } from "uuid";

export default function CellOptions({ cell }: { cell: NbCell }) {
    const dispatch = useDispatch();
    const { cells, cellIds } = useSelector((state: { app: AppState }) => state.app)
    const languages = Object.keys(cellLanguages) as LangaugeOption[];

    const currentCellIdIndex = cellIds.indexOf(cell.id)

    const handleCellLanguageChange = (e: any) => {
        const language = e.target.value as LangaugeOption
        const newCurrCell = { ...cell, mode: language }
        const newCells = { ...cells, [cell.id]: newCurrCell }
        dispatch(updateCells(newCells))
    }

    const handleAddNewCellBelowCurrentCell = () => {
        const newId = uuid_v4()
        const newCell: NbCell = {
            id: newId,
            content: '',
            mode: 'javascript',
            output: '',
        }

        const newCellIds = [...cellIds]
        const topCellIdIndex = cellIds.indexOf(cell.id)
        newCellIds.splice(topCellIdIndex + 1, 0, newId)

        const newCells = { ...cells, [newId]: newCell }
        dispatch(updateCells(newCells))
        dispatch(updateCellIds(newCellIds))
    }

    const handleMoveCurrentCellUp = () => {
        const newCellIds = [...cellIds]
        const currentCellIdIndex = cellIds.indexOf(cell.id)

        newCellIds.splice(currentCellIdIndex - 1, 0, cell.id)
        newCellIds.splice(currentCellIdIndex + 1, 1)

        dispatch(updateCellIds(newCellIds))
    }

    const handleMoveCurrentCellDown = () => {
        const newCellIds = [...cellIds]
        
        const currentCellIdIndex = cellIds.indexOf(cell.id)
        const downCellId = newCellIds[currentCellIdIndex + 1]
        const downCellIdIndex = newCellIds.indexOf(downCellId)

        newCellIds.splice(currentCellIdIndex, 1, downCellId)
        newCellIds.splice(downCellIdIndex, 1, cell.id)

        dispatch(updateCellIds(newCellIds))                                                                                                                              
    }


    return (
        <div className="h-10">
            <Box>
                <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={handleAddNewCellBelowCurrentCell}
                >
                    <AddIcon />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    color="secondary"
                    disabled={currentCellIdIndex === 0}
                    onClick={handleMoveCurrentCellUp}
                >
                    <UpArrowIcon />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    color="secondary"
                    disabled={currentCellIdIndex === cellIds.length - 1}
                    onClick={handleMoveCurrentCellDown}
                >
                    <DownArrowIcon />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    color="secondary"
                >
                    <CopyIcon />
                </IconButton>
                <FormControl >
                    <InputLabel id={`cell-lang-select`}>Language</InputLabel>
                    <Select
                        labelId={`cell-lang-select`}
                        id={`cell-lang-select`}
                        value={cell.mode}
                        label="language"
                        onChange={handleCellLanguageChange}
                    >
                        {
                            languages.map((language, i: number) => (
                                <MenuItem
                                    key={uuid_v4()}
                                    value={cellLanguages[language].value}
                                >
                                    {cellLanguages[language].name}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Box>
        </div>
    );
}
