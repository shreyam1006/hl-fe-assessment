import React, { useState } from "react";
import { BLUE_COLOR } from "../utils/colorConstants";
import SearchIcon from "@mui/icons-material/Search";
import { Tabs, Tab, Box, styled, Typography } from "@mui/material";
import InventoryCard from "./InventoryCard";
import { useSelector } from "react-redux";
import { selectInventory } from "../features/inventorySlice";

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

const CategoryWiseContent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const [activeTab, setActiveTab] = useState("All");

  const inventory = useSelector(selectInventory);
  const categories = [
    { name: "All", count: inventory.All.length },
    {
      name: "Electrical Appliances",
      count: inventory["Electrical Appliances"].length,
    },
    { name: "Furniture", count: inventory.Furniture.length },
    { name: "Home Decor", count: inventory["Home Decor"].length },
  ];

  return (
    <div>
      {/* Search Input */}
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

      {/* Category Tabs */}
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
                  {category.count && (
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

      {/* Category Content */}
      <Box sx={{ px: 2 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
          }}
        >
          {inventory[activeTab].map((item, index) => (
            <InventoryCard
              key={index}
              title={item.title}
              imageUrl={item.imageUrl}
              quantity={item.quantity}
              category={
                activeTab === "All"
                  ? Object.keys(inventory).find(
                      (cat) =>
                        cat !== "All" &&
                        inventory[cat].some((i) => i.title === item.title)
                    )
                  : activeTab
              }
            />
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default CategoryWiseContent;
