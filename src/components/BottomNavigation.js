import {
  BottomNavigation,
  Button,
  Paper,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import InventoryBanner from "./InventoryBanner";
import InventoryDrawer from "./InventoryDrawer";
import ConfirmDialog from "./ConfirmDialog";
import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowInventory,
  selectTab,
  selectShowInventory,
} from "../features/tabSlice";
import { selectInventory } from "../features/inventorySlice";
import { selectCounters } from "../features/roomCounterSlice";
import { setSelectedSpaces } from "../features/selectedSpacesSlice";
import { BLUE_COLOR } from "../utils/colorConstants";

const BottomNav = forwardRef((props, ref) => {
  const [value, setValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useDispatch();
  const selectedTab = useSelector(selectTab);
  const showInventory = useSelector(selectShowInventory);
  const inventory = useSelector(selectInventory);
  const counters = useSelector(selectCounters);

  const uniqueInventoryItems = Object.entries(inventory).reduce(
    (uniqueItems, [category, items]) => {
      items
        .filter((item) => item.quantity > 0)
        .forEach((item) => {
          if (
            !uniqueItems.find(
              (existingItem) => existingItem.title === item.title
            )
          ) {
            uniqueItems.push(item);
          }
        });
      return uniqueItems;
    },
    []
  );

  const totalItems = uniqueInventoryItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value, ref]);

  const handleContinue = () => {
    if (selectedTab === "Room Wise") {
      dispatch(setShowInventory(true));

      // Set selected spaces for each room type
      if (counters["Rooms"] > 0) {
        dispatch(
          setSelectedSpaces({
            type: "Rooms",
            count: counters["Rooms"],
          })
        );
      }
      if (counters["Kitchen"] > 0) {
        dispatch(
          setSelectedSpaces({
            type: "Kitchen",
            count: counters["Kitchen"],
          })
        );
      }
      if (counters["Dining Hall"] > 0) {
        dispatch(
          setSelectedSpaces({
            type: "Dining Hall",
            count: counters["Dining Hall"],
          })
        );
      }
      if (counters["Drawing Hall"] > 0) {
        dispatch(
          setSelectedSpaces({
            type: "Drawing Hall",
            count: counters["Drawing Hall"],
          })
        );
      }
    }
  };

  return (
    <>
      <InventoryDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={uniqueInventoryItems}
      />
      <ConfirmDialog
        open={confirmDialogOpen}
        onCancel={() => setConfirmDialogOpen(false)}
        onConfirm={() => {
          setConfirmDialogOpen(false);
          setSnackbarOpen(true);
          handleContinue();
        }}
        title={`Are you sure you want to add ${totalItems} number of items ?`}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {totalItems} items added successfully!
        </Alert>
      </Snackbar>
      <Paper
        ref={ref}
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          borderRadius: "12px",
          boxShadow: `0px -4px 8px 0px #0000001A,
                        0px -14px 14px 0px #00000017,
                        0px -32px 19px 0px #0000000D,
                        0px -56px 22px 0px #00000003,
                        0px -88px 25px 0px #00000000`,
        }}
      >
        {(showInventory || selectedTab === "Categories Wise") && (
          <InventoryBanner />
        )}
        <BottomNavigation
          showLabels
          value={value}
          sx={{
            p: 0,
            display: "flex",
            alignItems: "center",
            height: "76px",
          }}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              gap: 2,
              height: "100%",
            }}
          >
            {(showInventory || selectedTab === "Categories Wise") && (
              <Box
                sx={{
                  color: BLUE_COLOR,
                  fontSize: "14px",
                  margin: "auto",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
                onClick={() => setDrawerOpen(true)}
              >
                View {totalItems} items
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
                if (showInventory || selectedTab === "Categories Wise") {
                  setConfirmDialogOpen(true);
                } else {
                  handleContinue();
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
