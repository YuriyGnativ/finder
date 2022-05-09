import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dataSlice from "../redux/dataSlice";

const rootReducer = combineReducers({
  data: dataSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
