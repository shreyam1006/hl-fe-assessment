import { configureStore } from "@reduxjs/toolkit";
import roomCounterReducer from "../features/roomCounterSlice";
import tabReducer from "../features/tabSlice";

export default configureStore({
  reducer: {
    roomCounter: roomCounterReducer,
    tab: tabReducer,
  },
});
