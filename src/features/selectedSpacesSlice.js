import { createSlice } from "@reduxjs/toolkit";

import { CATEGORY_DATA } from "../features/inventorySlice";

const createDefaultInventory = () => {
  const inventory = Object.keys(CATEGORY_DATA).reduce((acc, category) => {
    acc[category] = structuredClone(CATEGORY_DATA[category]).map((item) => ({
      ...item,
      quantity: 0,
    }));
    return acc;
  }, {});

  inventory.All = structuredClone(Object.values(CATEGORY_DATA))
    .flat()
    .map((item) => ({
      ...item,
      quantity: 0,
    }));
  return inventory;
};

const initialState = {
  rooms: [], // Will store [{name: "Room 1", inventory: {...}}, etc.]
  kitchens: [], // Will store [{name: "Kitchen 1", inventory: {...}}, etc.]
  diningHalls: [], // Will store [{name: "Dining Hall 1", inventory: {...}}, etc.]
  drawingHalls: [], // Will store [{name: "Drawing Hall 1", inventory: {...}}, etc.]
};

export const selectedSpacesSlice = createSlice({
  name: "selectedSpaces",
  initialState,
  reducers: {
    updateSpaceInventory: (state, action) => {
      const { type, spaceName, category, title, quantity } = action.payload;

      // Convert type to match state structure
      let spaceType;
      switch (type) {
        case "Rooms":
          spaceType = "rooms";
          break;
        case "Kitchen":
          spaceType = "kitchens";
          break;
        case "Dining Hall":
          spaceType = "diningHalls";
          break;
        case "Drawing Hall":
          spaceType = "drawingHalls";
          break;
        default:
          return;
      }

      // Find the space
      const space = state[spaceType]?.find((space) => space.name === spaceName);
      if (!space) return;

      // Update in specific category
      const item = space.inventory[category]?.find(
        (item) => item.title === title
      );
      if (item) {
        item.quantity = quantity;
        // Also update in All category
        const allItem = space.inventory.All?.find(
          (item) => item.title === title
        );
        if (allItem) {
          allItem.quantity = quantity;
        }
        // Update in original category if updating from All
        if (category === "All") {
          Object.keys(CATEGORY_DATA).forEach((cat) => {
            if (cat !== "All") {
              const categoryItem = space.inventory[cat]?.find(
                (item) => item.title === title
              );
              if (categoryItem) {
                categoryItem.quantity = quantity;
              }
            }
          });
        }
      }
    },

    setSelectedSpaces: (state, action) => {
      const { type, count } = action.payload;

      // Convert type to match state structure
      let spaceType;
      switch (type) {
        case "Rooms":
          spaceType = "rooms";
          break;
        case "Kitchen":
          spaceType = "kitchens";
          break;
        case "Dining Hall":
          spaceType = "diningHalls";
          break;
        case "Drawing Hall":
          spaceType = "drawingHalls";
          break;
        default:
          return;
      }

      // Create spaces with empty inventory using structuredClone for deep copy
      const spaces = Array.from({ length: count }, (_, i) => ({
        name: `${type === "Rooms" ? "Room" : type} ${i + 1}`,
        inventory: structuredClone(createDefaultInventory()),
      }));

      // Update the spaces array
      state[spaceType] = spaces;
    },
    clearSelectedSpaces: (state) => {
      state.rooms = [];
      state.kitchens = [];
      state.diningHalls = [];
      state.drawingHalls = [];
    },
  },
});

export const {
  setSelectedSpaces,
  clearSelectedSpaces,
  initializeSpaceInventory,
  updateSpaceInventory,
} = selectedSpacesSlice.actions;

// Selectors
export const selectAllSpaces = (state) => state.selectedSpaces;
export const selectRooms = (state) => state.selectedSpaces.rooms;
export const selectKitchens = (state) => state.selectedSpaces.kitchens;
export const selectDiningHalls = (state) => state.selectedSpaces.diningHalls;
export const selectDrawingHalls = (state) => state.selectedSpaces.drawingHalls;

// Inventory Selectors
export const selectSpaceInventory = (state, spaceType, spaceName) => {
  if (!spaceType || !spaceName) return createDefaultInventory();
  const type = spaceType.toLowerCase().replace(" ", "") + "s";
  const space = state.selectedSpaces[type]?.find(
    (space) => space.name === spaceName
  );
  return space?.inventory || createDefaultInventory();
};

export default selectedSpacesSlice.reducer;
