import { Box } from "@mui/material";
import InventoryAccordions from "./InventoryAccordions";
import React from "react";
import { useSelector } from "react-redux";
import RoomWiseContent from "./RoomWiseContent";
import CategoryWiseContent from "./CategoryWiseContent";
import { selectTab, selectShowInventory } from "../features/tabSlice";
import { TABS } from "../utils/constants";

const MainContent = () => {
  const selectedTab = useSelector(selectTab);
  const showInventory = useSelector(selectShowInventory);

  return (
    <Box sx={{ pt: 2, pb: 16 }}>
      {selectedTab === TABS.RoomsWise ? (
        showInventory ? (
          <InventoryAccordions />
        ) : (
          <RoomWiseContent />
        )
      ) : (
        <CategoryWiseContent />
      )}
    </Box>
  );
};

export default MainContent;
