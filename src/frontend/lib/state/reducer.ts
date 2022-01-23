import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    interpreterMode: "node",
    notebookCells: {
        "1": {
            content: "",
            language: "javascript"
        }
    },
    notebookConfig: {
        cellTheme: "monokai",
        cellFontSize: 14,
        cellEnableBasicAutocompletion: true,
        cellEnableLiveAutocompletion: true,
        cellEnableSnippets: true,
        cellShowLineNumbers: false,
        cellTabSize: 2,
        width: "100%",
    },
}

const appReducer = createSlice({
    name: "app",
    initialState: { ...initialState },
    reducers: {
        setInterpreterMode: (state, action) => {
            state.interpreterMode = action.payload;
        },
        updateNotebookCells: (state, action) => {
            state.notebookCells = action.payload;
        }
    }
});

export const {
    setInterpreterMode,
    updateNotebookCells
} = appReducer.actions;

export default appReducer.reducer;