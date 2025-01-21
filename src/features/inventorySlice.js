import { createSlice } from "@reduxjs/toolkit";

const CATEGORY_DATA = {
  "Electrical Appliances": [
    {
      title: "Smart TV",
      imageUrl:
        "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=300&q=80",
      quantity: 0,
    },
    {
      title: "Microwave",
      imageUrl:
        "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=300&q=80",
      quantity: 0,
    },
    {
      title: "Air Conditioner",
      imageUrl:
        "https://images.unsplash.com/photo-1614633833026-0820552978b6?auto=format&fit=crop&w=300&q=80",
      quantity: 0,
    },
  ],
  Furniture: [
    {
      title: "Sofa Set",
      imageUrl:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80",
      quantity: 0,
    },
    {
      title: "Dining Table",
      imageUrl:
        "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=300&q=80",
      quantity: 0,
    },
    {
      title: "Bookshelf",
      imageUrl:
        "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=300&q=80",
      quantity: 0,
    },
  ],
  "Home Decor": [
    {
      title: "Wall Clock",
      imageUrl:
        "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=300&q=80",
      quantity: 0,
    },
    {
      title: "Table Lamp",
      imageUrl:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=300&q=80",
      quantity: 0,
    },
    {
      title: "Throw Pillows",
      imageUrl:
        "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=300&q=80",
      quantity: 0,
    },
  ],
};

const initialState = {
  inventory: {
    ...CATEGORY_DATA,
    All: Object.values(CATEGORY_DATA).flat(),
  },
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    updateQuantity: (state, action) => {
      const { category, title, quantity } = action.payload;
      // Update in specific category
      if (category !== "All") {
        const item = state.inventory[category].find(
          (item) => item.title === title
        );
        if (item) {
          item.quantity = quantity;
          // Update the same item in All category
          const allItem = state.inventory.All.find(
            (item) => item.title === title
          );
          if (allItem) {
            allItem.quantity = quantity;
          }
        }
      } else {
        // If updating from All view, find the original category and update both
        const allItem = state.inventory.All.find(
          (item) => item.title === title
        );
        if (allItem) {
          allItem.quantity = quantity;
          // Find and update in original category
          Object.keys(state.inventory).forEach((cat) => {
            if (cat !== "All") {
              const categoryItem = state.inventory[cat].find(
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
  },
});

export const { updateQuantity } = inventorySlice.actions;

export const selectInventory = (state) => state.inventory.inventory;

export default inventorySlice.reducer;