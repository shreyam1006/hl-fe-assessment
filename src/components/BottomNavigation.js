import {
  BottomNavigation,
  Button,
  Paper,
  Box,
  Drawer,
  Typography,
} from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowInventory,
  selectTab,
  selectShowInventory,
} from "../features/tabSlice";
import { selectInventory } from "../features/inventorySlice";
import { BLUE_COLOR } from "../utils/colorConstants";

const BottomNav = forwardRef((props, ref) => {
  const [value, setValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const selectedTab = useSelector(selectTab);
  const showInventory = useSelector(selectShowInventory);
  const inventory = useSelector(selectInventory);

  const calculateTotalItems = () => {
    let totals = {};
    Object.entries(inventory).forEach(([category, items]) => {
      if (category !== "All") {
        totals[category] = items.reduce((sum, item) => sum + item.quantity, 0);
      }
    });
    return totals;
  };

  const totalItems = calculateTotalItems();

  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value, ref]);

  return (
    <>
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
          },
        }}
      >
        <Box sx={{ p: 3, maxHeight: "50vh" }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Total Items
          </Typography>
          {Object.entries(totalItems).map(([category, count]) => (
            <Box
              key={category}
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>{category}</Typography>
              <Typography fontWeight="bold">{count} items</Typography>
            </Box>
          ))}
        </Box>
      </Drawer>
      <Paper
        ref={ref}
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "76px",
          boxShadow: `0px -4px 8px 0px #0000001A,
                      0px -14px 14px 0px #00000017,
                      0px -32px 19px 0px #0000000D,
                      0px -56px 22px 0px #00000003,
                      0px -88px 25px 0px #00000000`,
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          sx={{
            p: 0,
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Box sx={{ display: "flex", width: "100%", gap: 2, px: 2 }}>
            {(showInventory || selectedTab === "Categories Wise") && (
              <Box
                sx={{
                  color: BLUE_COLOR,
                  fontSize: "14px",
                  margin: "auto",
                }}
                variant="contained"
                size="large"
                onClick={() => setDrawerOpen(true)}
              >
                View total items
              </Box>
            )}
            <Button
              sx={{
                alignSelf: "center",
                width:
                  showInventory || selectedTab === "Categories Wise"
                    ? "50%"
                    : "90%",
                height: "44px",
                borderRadius: "10px",
                backgroundColor: "#4285F4",
                color: "#FFFFFF",
                textTransform: "none",
                fontSize: "16px",
                margin: "10px auto",
                "&:hover": {
                  backgroundColor: "#4285F4",
                },
              }}
              variant="contained"
              size="large"
              onClick={() => {
                if (selectedTab === "Room Wise") {
                  dispatch(setShowInventory(true));
                }
              }}
            >
              <b>Continue</b>
            </Button>
          </Box>
        </BottomNavigation>
      </Paper>
    </>
  );
});

export default BottomNav;
