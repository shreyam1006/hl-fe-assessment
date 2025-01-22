import {
  Box,
  Grid2,
  IconButton,
  LinearProgress,
  Tab,
  Tabs,
  styled,
} from "@mui/material";
import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import {
  setShowInventory,
  setSelectedTab,
  selectTab,
  selectShowInventory,
} from "../features/tabSlice";
import { BLUE_COLOR } from "../utils/colorConstants";
import { TABS } from "../utils/constants";

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

const StyledTab = styled(Tab)(() => ({
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

const Header = forwardRef(({ children }, ref) => {
  const dispatch = useDispatch();
  const selectedTab = useSelector(selectTab);
  const showInventory = useSelector(selectShowInventory);

  const handleChange = (event, newValue) => {
    dispatch(
      setSelectedTab(newValue === 0 ? TABS.RoomsWise : TABS.CategoriesWise)
    );
  };

  const value = selectedTab === TABS.RoomsWise ? 0 : 1;
  return (
    <Box>
      <Grid2
        container
        ref={ref}
        sx={{
          position: "sticky",
          width: "100%",
          height: "54px",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          fontSize: "16px",
          fontWeight: 700,
          backgroundColor: "#fff",
          zIndex: 1,
        }}
      >
        {showInventory && selectedTab === TABS.RoomsWise && (
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              left: 20,
              top: "50%",
              transform: "translateY(-50%)",
            }}
            onClick={() => dispatch(setShowInventory(false))}
          >
            <ArrowBackIosNewRoundedIcon
              sx={{
                color: "#000",
                fontSize: "18px",
              }}
            />
          </IconButton>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {(showInventory && selectedTab === TABS.RoomsWise) ||
          selectedTab === TABS.CategoriesWise
            ? "Add"
            : "Select"}{" "}
          Inventory
        </Box>
      </Grid2>
      <Box
        sx={{
          position: "sticky",
          backgroundColor: "#fff",
          zIndex: 1,
        }}
      >
        <LinearProgress variant="determinate" value={50} />
      </Box>
      <Box
        sx={{
          position: "sticky",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            px: 2,
            mt: 3,
          }}
        >
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            <StyledTab label="Room Wise" />
            <StyledTab label="Categories Wise" />
          </StyledTabs>
        </Box>
      </Box>
    </Box>
  );
});

export default Header;
