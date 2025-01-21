import { Box, Tab, Tabs, Typography, styled } from "@mui/material";
import InventoryAccordions from "./InventoryAccordions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RoomWiseContent from "./RoomWiseContent";
import CategoryWiseContent from "./CategoryWiseContent";
import { BLUE_COLOR } from "../utils/colorConstants";
import {
  setSelectedTab,
  selectTab,
  selectShowInventory,
} from "../features/tabSlice";
import { selectCounters } from "../features/roomCounterSlice";

const StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    display: "none",
  },
  minHeight: "unset",
  "& .MuiTabs-flexContainer": {
    gap: "4px",
    background: "#F7F7F7",
    borderRadius: "12px",
    padding: "4px 8px",
  },
});

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontSize: "12px",
  width: "160px",
  fontWeight: "500",
  padding: "12px 32px",
  borderRadius: "10px",
  color: "#000",
  backgroundColor: "#F7F7F7",
  minHeight: "unset",
  "&.Mui-selected": {
    color: "#fff",
    backgroundColor: BLUE_COLOR,
    fontWeight: 700,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const MainContent = () => {
  const dispatch = useDispatch();
  const selectedTab = useSelector(selectTab);
  const showInventory = useSelector(selectShowInventory);
  const counters = useSelector(selectCounters);

  const handleChange = (event, newValue) => {
    dispatch(setSelectedTab(newValue === 0 ? "Room Wise" : "Categories Wise"));
  };

  const value = selectedTab === "Room Wise" ? 0 : 1;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box sx={{ pt: "24px", px: 2 }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Room Wise" />
          <StyledTab label="Categories Wise" />
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
        {showInventory && selectedTab === "Room Wise" ? (
          <InventoryAccordions counters={counters} />
        ) : (
          <RoomWiseContent />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CategoryWiseContent />
      </TabPanel>
    </Box>
  );
};

export default MainContent;
