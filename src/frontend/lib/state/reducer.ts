import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    interpreterMode: "node",
}

const appReducer = createSlice({
    name: "app",
    initialState: { ...initialState },
    reducers: {
        setInterpreterMode: (state, action) => {
            state.interpreterMode = action.payload;
        }
    }
});

export const {
    setInterpreterMode,
} = appReducer.actions;

export default appReducer.reducer;