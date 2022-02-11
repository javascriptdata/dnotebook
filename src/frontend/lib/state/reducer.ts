import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../typings/types";
import { v4 as uuid_v4 } from "uuid";

const initialState: AppState = {
    interpreterMode: "node",
    activeNotebookName: "Dashboard",
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
        addNewBlankNotebook: (state, action) => {
            const { name } = action.payload;
            const firstCellId = uuid_v4();
            state.notebooks[name] = {
                notebookId: uuid_v4(),
                name,
                cellIds: [firstCellId],
                cells: {
                    [firstCellId]: {
                        id: firstCellId,
                        content: "",
                        mode: "javascript",
                        output: ""
                    },
                },
            };
            //create file in current working directory using the File API
            // const newNotebookFile = new File([], newNotebookName, { type: "text/plain" });
            // state.directories.push(newNotebookFile);

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
    addNewBlankNotebook,
} = appReducer.actions;

export default appReducer.reducer;