import { createSlice } from "@reduxjs/toolkit";
import { TABS } from "../utils/constants";

export const tabSlice = createSlice({
  name: "tab",
  initialState: {
    selectedTab: TABS.RoomsWise,
    showInventory: false,
  },
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setShowInventory: (state, action) => {
      state.showInventory = action.payload;
    },
  },
});

export const { setSelectedTab, setShowInventory } = tabSlice.actions;

export const selectTab = (state) => state.tab.selectedTab;
export const selectShowInventory = (state) => state.tab.showInventory;

export default tabSlice.reducer;
