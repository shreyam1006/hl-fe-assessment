import {
  BottomNavigation,
  Button,
  Paper,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
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
import { TABS, API } from "../utils/constants";

const BottomNav = forwardRef((props, ref) => {
  const [value, setValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const selectedTab = useSelector(selectTab);
  const showInventory = useSelector(selectShowInventory);
  const inventory = useSelector(selectInventory);
  const counters = useSelector(selectCounters);

  const rooms = useSelector((state) => state.selectedSpaces.rooms);
  const kitchens = useSelector((state) => state.selectedSpaces.kitchens);
  const diningHalls = useSelector((state) => state.selectedSpaces.diningHalls);
  const drawingHalls = useSelector(
    (state) => state.selectedSpaces.drawingHalls
  );

  const uniqueInventoryItems =
    selectedTab === TABS.CategoriesWise
      ? Object.entries(inventory).reduce((uniqueItems, [category, items]) => {
          items
            .filter((item) => item.quantity > 0)
            .forEach((item) => {
              if (
                !uniqueItems.find(
                  (existingItem) => existingItem.title === item.title
                )
              ) {
                uniqueItems.push({ ...item });
              }
            });
          return uniqueItems;
        }, [])
      : (() => {
          const allSpaces = [
            ...rooms,
            ...kitchens,
            ...diningHalls,
            ...drawingHalls,
          ];
          const aggregatedItems = {};

          allSpaces.forEach((space) => {
            if (space?.inventory?.All) {
              space.inventory.All.forEach((item) => {
                if (item.quantity > 0) {
                  if (!aggregatedItems[item.title]) {
                    aggregatedItems[item.title] = { ...item };
                  } else {
                    aggregatedItems[item.title].quantity += item.quantity;
                  }
                }
              });
            }
          });

          return Object.values(aggregatedItems);
        })();

  const totalItems = uniqueInventoryItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value, ref]);

  const handleContinue = async () => {
    if (selectedTab === TABS.RoomsWise) {
      setIsLoading(true);
      try {
        Object.entries(counters).forEach(([type, count]) => {
          if (count > 0) {
            dispatch(
              setSelectedSpaces({
                type,
                count,
              })
            );
          }
        });

        const response = await fetch(
          `${API.BASE_URL}${API.ENDPOINTS.SET_ROOMS}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Rooms: rooms.length.toString(),
              Kitchen: kitchens.length.toString(),
              "Dining Hall": diningHalls.length.toString(),
              "Drawing Hall": drawingHalls.length.toString(),
            }),
          }
        );

        const data = await response.text();

        if (!response.ok) {
          throw new Error(data.message || "Failed to set rooms");
        }

        dispatch(setShowInventory(true));
        setSnackbarMessage(data.message || "Rooms set successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error setting rooms:", error);
        setSnackbarMessage(error.message || "Failed to set rooms");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.ORDER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit order");
      }

      setSnackbarMessage(
        data.message || `${totalItems} items added successfully!`
      );
      setSnackbarSeverity("success");
      setConfirmDialogOpen(false);
      setSnackbarOpen(true);
      handleContinue();
    } catch (error) {
      console.error("Error submitting order:", error);
      setSnackbarMessage(error.message || "Failed to submit order");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
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
        onConfirm={handleConfirm}
        title={`Are you sure you want to add ${totalItems} inventory items ?`}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
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
        {(showInventory || selectedTab === TABS.CategoriesWise) && (
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
            {(showInventory || selectedTab === TABS.CategoriesWise) && (
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
                  showInventory || selectedTab === TABS.CategoriesWise
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
              disabled={isLoading}
              startIcon={
                isLoading && <CircularProgress size={20} color="inherit" />
              }
              onClick={() => {
                if (showInventory || selectedTab === TABS.CategoriesWise) {
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
