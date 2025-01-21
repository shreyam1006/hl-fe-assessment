import { configureStore } from "@reduxjs/toolkit";
import roomCounterReducer from "../features/roomCounterSlice";

export default configureStore({
  reducer: {
    roomCounter: roomCounterReducer,
  },
});
