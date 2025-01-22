import { Box } from "@mui/material";
import InventoryAccordions from "./InventoryAccordions";
import React from "react";
import { useSelector } from "react-redux";
import RoomWiseContent from "./RoomWiseContent";
import CategoryWiseContent from "./CategoryWiseContent";
import { selectTab, selectShowInventory } from "../features/tabSlice";
import { selectCounters } from "../features/roomCounterSlice";

const MainContent = () => {
  const selectedTab = useSelector(selectTab);
  const showInventory = useSelector(selectShowInventory);
  const counters = useSelector(selectCounters);

  return (
    <Box sx={{ pt: 2, pb: 16 }}>
      {selectedTab === "Room Wise" ? (
        showInventory ? (
          <InventoryAccordions counters={counters} />
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
