import { useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import UpArrowIcon from '@mui/icons-material/ArrowUpward';
import DownArrowIcon from '@mui/icons-material/ArrowDownward';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CopyIcon from '@mui/icons-material/CopyAll';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { cellLanguages } from "../../lib/fixtures/languages";
import { LangaugeOption } from "../../lib/typings/types";

export default function cellOptions({ language, handleCellLanguageChange }: { language: LangaugeOption, handleCellLanguageChange: any }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currLanguage, setCurrLanguage] = useState(language);

    const handleLangChange = (event: SelectChangeEvent) => {
        setCurrLanguage(event.target.value as LangaugeOption);
        handleCellLanguageChange(event.target.value as LangaugeOption);
    };

    const langulanguages = Object.keys(cellLanguages) as LangaugeOption[];
    return (
        <div className="h-10">
            <Box>
                <IconButton
                    aria-label="delete"
                    color="secondary"
                >
                    <UpArrowIcon />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    color="secondary"
                >
                    <DownArrowIcon />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    color="secondary"
                >
                    <AddIcon />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    color="secondary"
                >
                    <CopyIcon />
                </IconButton>
                <FormControl style={{ width: "120px" }}>
                    <InputLabel id="demo-simple-select-label">Language</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currLanguage}
                        label="language"
                        onChange={handleLangChange}
                    >
                        {
                            langulanguages.map((language, i: number) => (
                                <MenuItem
                                    key={i}
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
