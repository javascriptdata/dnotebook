import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducer";

const store = configureStore({
    reducer: {
        app: appReducer
    }
});

export default store;