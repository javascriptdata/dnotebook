import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import appReducer from "./reducer";

const store = configureStore({
  devTools: true,
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;