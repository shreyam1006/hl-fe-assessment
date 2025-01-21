import { Box, Tab, Tabs, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import RoomWiseContent from "./RoomWiseContent";
import CategoryWiseContent from "./CategoryWiseContent";
import { BLUE_COLOR } from "../utils/colorConstants";

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
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const MainContent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box sx={{ pt: "24px", px: "16px" }}>
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
        <RoomWiseContent />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CategoryWiseContent />
      </TabPanel>
    </Box>
  );
};

export default MainContent;
