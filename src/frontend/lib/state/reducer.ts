import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../typings/types";
import { v4 as uuid_v4 } from "uuid";

const initialState: AppState = {
    interpreterMode: "node",
    activeNotebookName: "Dashboard",
    activeNotebookTabNumber: 0,
    notebooks: {
        "Dashboard": { //Default open tab for Dashboard
            notebookId: uuid_v4(),
            name: "Dashboard",
            cellIds: [],
            cells: {},
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
    notebookSavingStatus: "saved"
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
        },
        updateNotebooks: (state, action) => {
            state.notebooks = action.payload;
        },
        addNotebook: (state, action) => {
            const notebook = action.payload;
            state.notebooks[notebook.name] = notebook;
        },
        setActiveNotebookTabNumber: (state, action) => {
            state.activeNotebookTabNumber = action.payload;
        },
        setNotebookSavingStatus: (state, action) => {
            state.notebookSavingStatus = action.payload;
        },
    }
});

export const {
    setInterpreterMode,
    updateCellIds,
    updateCells,
    updateConfig,
    updateActiveNotebookName,
    setDirectories,
    addNotebook,
    setActiveNotebookTabNumber,
    setNotebookSavingStatus,
    updateNotebooks
} = appReducer.actions;

export default appReducer.reducer;