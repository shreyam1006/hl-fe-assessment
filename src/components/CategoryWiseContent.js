import React, { useState } from "react";
import { BLUE_COLOR } from "../utils/colorConstants";
import SearchIcon from "@mui/icons-material/Search";
import { Tabs, Tab, Box, styled, Typography } from "@mui/material";
import InventoryCard from "./InventoryCard";
import { useSelector, useDispatch } from "react-redux";
import { selectInventory, updateQuantity } from "../features/inventorySlice";
import {
  selectDiningHalls,
  selectDrawingHalls,
  selectKitchens,
  selectRooms,
  updateSpaceInventory,
} from "../features/selectedSpacesSlice";
import { CATEGORY_DATA } from "../features/inventorySlice";
import { selectTab } from "../features/tabSlice";
import { TABS } from "../utils/constants";

const StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    display: "none",
  },
  minHeight: "unset",
  "& .MuiTabs-flexContainer": {
    gap: "16px",
  },
});

const StyledTab = styled(Tab)({
  textTransform: "none",
  fontSize: "12px",
  color: "#616161",
  minHeight: "unset",
  padding: "0",
  minWidth: "unset",
  "&.Mui-selected": {
    color: BLUE_COLOR,
    fontWeight: 700,
    fontSize: "14px",
    "& .MuiTypography-root": {
      color: BLUE_COLOR,
      fontSize: "10px",
    },
  },
});

const CategoryWiseContent = ({
  customInventory,
  spaceType,
  spaceName,
  onInventoryUpdate,
  gridColumns = 2,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const selectedTab = useSelector(selectTab);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const [activeTab, setActiveTab] = useState("All");
  const isCategoriesTab = selectedTab === TABS.CategoriesWise;

  const globalInventory = useSelector(selectInventory);
  const roomsInventory = useSelector(selectRooms);
  const kitchensInventory = useSelector(selectKitchens);
  const diningHallsInventory = useSelector(selectDiningHalls);
  const drawingHallsInventory = useSelector(selectDrawingHalls);

  const specificInventory = () => {
    if (spaceName.includes("Room")) {
      return roomsInventory.find((room) => room.name === spaceName).inventory;
    } else if (spaceName.includes("Kitchen")) {
      return kitchensInventory.find((kitchen) => kitchen.name === spaceName)
        .inventory;
    } else if (spaceName.includes("Dining")) {
      return diningHallsInventory.find((dining) => dining.name === spaceName)
        .inventory;
    } else if (spaceName.includes("Drawing")) {
      return drawingHallsInventory.find((drawing) => drawing.name === spaceName)
        .inventory;
    }
  };

  const inventory = isCategoriesTab ? globalInventory : specificInventory();

  const categories = [
    { name: "All", count: inventory.All?.length || 0 },
    {
      name: "Electrical Appliances",
      count: inventory["Electrical Appliances"]?.length || 0,
    },
    { name: "Furniture", count: inventory.Furniture?.length || 0 },
    { name: "Home Decor", count: inventory["Home Decor"]?.length || 0 },
  ];

  const inventoryResults = (
    searchQuery ? inventory.All || [] : inventory[activeTab] || []
  ).filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleQuantityChange = (item, newQuantity) => {
    const originalCategory = Object.keys(CATEGORY_DATA).find((cat) =>
      CATEGORY_DATA[cat].some((i) => i.title === item.title)
    );
    if (!originalCategory) return;

    if (!isCategoriesTab) {
      dispatch(
        updateSpaceInventory({
          type: spaceType,
          spaceName,
          category: originalCategory,
          title: item.title,
          quantity: newQuantity,
        })
      );
    } else {
      dispatch(
        updateQuantity({
          category: activeTab,
          title: item.title,
          quantity: newQuantity,
        })
      );
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px", position: "relative" }}>
        <SearchIcon
          style={{
            position: "absolute",
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#666",
            zIndex: 1,
          }}
        />
        <input
          type="text"
          placeholder="Search for items"
          value={searchQuery}
          onChange={handleSearch}
          style={{
            width: "76%",
            padding: "12px",
            paddingRight: "40px",
            paddingLeft: "15px",
            fontSize: "12px",
            border: "1px solid #C3C3C3",
            borderRadius: "10px",
            outline: "none",
            marginLeft: "16px",
            marginRight: "16px",
          }}
        />
      </div>

      {!searchQuery && (
        <Box sx={{ mb: 3, pl: 2 }}>
          <StyledTabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons={false}
          >
            {categories.map((category) => (
              <StyledTab
                key={category.name}
                value={category.name}
                label={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {category.name}
                    {category.count > 0 && (
                      <Typography
                        component="span"
                        sx={{
                          color: "#000000",
                          fontSize: "8px",
                          fontWeight: 700,
                          borderRadius: "20px",
                          background: "#F5F5F5",
                          p: "3.5px",
                        }}
                      >
                        {category.count}
                      </Typography>
                    )}
                  </div>
                }
              />
            ))}
          </StyledTabs>
        </Box>
      )}

      {/* Category Content */}
      <Box sx={{ px: 2 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
            gap: 2,
          }}
        >
          {inventoryResults.length === 0 ? (
            <Box sx={{ px: 1 }}>No results found</Box>
          ) : (
            inventoryResults.map((item, index) => (
              <InventoryCard
                key={index}
                title={item.title}
                imageUrl={
                  item.imageUrl ||
                  globalInventory.All.find((i) => i.title === item.title)
                    ?.imageUrl
                }
                quantity={item.quantity}
                category={
                  activeTab === "All"
                    ? Object.keys(inventory).find(
                        (cat) =>
                          cat !== "All" &&
                          inventory[cat]?.some((i) => i.title === item.title)
                      )
                    : activeTab
                }
                onQuantityChange={(newQuantity) =>
                  handleQuantityChange(item, newQuantity)
                }
                spaceType={spaceType}
                spaceName={spaceName}
              />
            ))
          )}
        </Box>
      </Box>
    </div>
  );
};

export default CategoryWiseContent;
