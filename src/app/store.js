import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "../features/tabSlice";
import inventoryReducer from "../features/inventorySlice";
import roomCounterReducer from "../features/roomCounterSlice";
import selectedSpacesReducer from "../features/selectedSpacesSlice";

export default configureStore({
  reducer: {
    tab: tabReducer,
    inventory: inventoryReducer,
    roomCounter: roomCounterReducer,
    selectedSpaces: selectedSpacesReducer,
  },
});
