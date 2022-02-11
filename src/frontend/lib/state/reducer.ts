import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../typings/types";
import { v4 as uuid_v4 } from "uuid";

const initialNotebookId = uuid_v4()
const initialCellId1 = uuid_v4()
const initialCellId2 = uuid_v4()


const initialState: AppState = {
    interpreterMode: "node",
    activeNotebookName: "note1.dnb",
    notebooks: {
        "note1.dnb": {
            notebookId: initialNotebookId,
            name: "note1.dnb",
            cellIds: [initialCellId1],
            cells: {
                [initialCellId1]: {
                    id: initialCellId1,
                    content: "",
                    mode: "javascript",
                    output: ""
                },
            },
        },
        "note2.dnb": {
            notebookId: uuid_v4(),
            name: "note2.dnb",
            cellIds: [initialCellId2],
            cells: {
                [initialCellId2]: {
                    id: initialCellId2,
                    content: "",
                    mode: "markdown",
                    output: ""
                },
            },
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
        notebookThemeMode: "light",
        autosaveNotebook: true,
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
            const { newCellIds, activeNotebookName } = action.payload;
            state.notebooks[activeNotebookName].cellIds = newCellIds;
        },
        updateCells: (state, action) => {
            const { newCells, activeNotebookName } = action.payload;
            state.notebooks[activeNotebookName].cells = newCells;
        },
        updateConfig: (state, action) => {
            state.config = action.payload;
        },
        updateActiveNotebookName: (state, action) => {
            state.activeNotebookName = action.payload;
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
    updateActiveNotebookName,
    setDirectories,
} = appReducer.actions;

export default appReducer.reducer;