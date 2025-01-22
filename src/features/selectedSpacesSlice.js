import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  spaces: {
    rooms: [], // Will store ["Room 1", "Room 2", etc.]
    kitchens: [], // Will store ["Kitchen 1", "Kitchen 2", etc.]
    diningHalls: [], // Will store ["Dining Hall 1", "Dining Hall 2", etc.]
    drawingHalls: [], // Will store ["Drawing Hall 1", "Drawing Hall 2", etc.]
  },
};

export const selectedSpacesSlice = createSlice({
  name: "selectedSpaces",
  initialState,
  reducers: {
    setSelectedSpaces: (state, action) => {
      const { type, count } = action.payload;
      let spacesArray = [];

      // Create numbered spaces based on type and count
      for (let i = 1; i <= count; i++) {
        switch (type) {
          case "Rooms":
            spacesArray.push(`Room ${i}`);
            break;
          case "Kitchen":
            spacesArray.push(`Kitchen ${i}`);
            break;
          case "Dining Hall":
            spacesArray.push(`Dining Hall ${i}`);
            break;
          case "Drawing Hall":
            spacesArray.push(`Drawing Hall ${i}`);
            break;
          default:
            break;
        }
      }

      // Update the appropriate array in state
      switch (type) {
        case "Rooms":
          state.spaces.rooms = spacesArray;
          break;
        case "Kitchen":
          state.spaces.kitchens = spacesArray;
          break;
        case "Dining Hall":
          state.spaces.diningHalls = spacesArray;
          break;
        case "Drawing Hall":
          state.spaces.drawingHalls = spacesArray;
          break;
        default:
          break;
      }
    },
    clearSelectedSpaces: (state) => {
      state.spaces = {
        rooms: [],
        kitchens: [],
        diningHalls: [],
        drawingHalls: [],
      };
    },
  },
});

export const { setSelectedSpaces, clearSelectedSpaces } =
  selectedSpacesSlice.actions;

// Selectors
export const selectAllSpaces = (state) => state.selectedSpaces.spaces;
export const selectRooms = (state) => state.selectedSpaces.spaces.rooms;
export const selectKitchens = (state) => state.selectedSpaces.spaces.kitchens;
export const selectDiningHalls = (state) =>
  state.selectedSpaces.spaces.diningHalls;
export const selectDrawingHalls = (state) =>
  state.selectedSpaces.spaces.drawingHalls;

export default selectedSpacesSlice.reducer;
