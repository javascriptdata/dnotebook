import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../typings/types";
import { v4 as uuid_v4 } from "uuid";

const initialId = uuid_v4()

const initialState: AppState = {
    interpreterMode: "node",
    cellIds: [initialId],
    cells: {
        [initialId]: {
            id: initialId,
            content: "",
            mode: "javascript",
            output: ""
        },
    },
    config: {
        cellTheme: "monokai",
        cellFontSize: 14,
        cellEnableBasicAutocompletion: true,
        cellEnableLiveAutocompletion: true,
        cellEnableSnippets: true,
        cellShowLineNumbers: false,
        cellTabSize: 2,
        width: "100%",
    },
    directories: [],
}

const appReducer = createSlice({
    name: "app",
    initialState: { ...initialState },
    reducers: {
        setInterpreterMode: (state, action) => {
            state.interpreterMode = action.payload;
        },
        updateCellIds: (state, action) => {
            state.cellIds = action.payload;
        },
        updateCells: (state, action) => {
            state.cells = action.payload;
        },
        updateConfig: (state, action) => {
            state.config = action.payload;
        },
        setDirectories: (state, action) => {
            state.directories = action.payload;
        }
    }
});

export const {
    setInterpreterMode,
    updateCellIds,
    updateCells,
    updateConfig,
    setDirectories,
} = appReducer.actions;

export default appReducer.reducer;