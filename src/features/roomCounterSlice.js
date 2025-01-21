import { createSlice } from "@reduxjs/toolkit";
import { ROOM_WISE_INVENTORY } from "../utils/constants";

const initialState = {
  counters: ROOM_WISE_INVENTORY.reduce((acc, roomObj) => {
    Object.values(roomObj).forEach((room) => {
      acc[room] = 0;
    });
    return acc;
  }, {}),
};

export const roomCounterSlice = createSlice({
  name: "roomCounter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.counters[action.payload] += 1;
    },
    decrement: (state, action) => {
      state.counters[action.payload] = Math.max(
        0,
        state.counters[action.payload] - 1
      );
    },
  },
});

export const { increment, decrement } = roomCounterSlice.actions;

export const selectCounters = (state) => state.roomCounter.counters;

export default roomCounterSlice.reducer;
