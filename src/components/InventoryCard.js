import React from "react";
import { Box, Typography, Stack, IconButton } from "@mui/material";
import ConfirmDialog from "./ConfirmDialog";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../features/inventorySlice";
import { BLUE_COLOR } from "../utils/colorConstants";

const cardStyle = {
  backgroundColor: "white",
  border: "1px solid #C3C3C3",
  height: "147px",
  borderRadius: "4px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

const imageStyle = {
  width: "100%",
  height: "100px",
  objectFit: "cover",
};

const InventoryCard = ({ title, imageUrl, quantity, category }) => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleIncrement = () => {
    dispatch(updateQuantity({ category, title, quantity: quantity + 1 }));
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      if (quantity === 1) {
        setOpenDialog(true);
      } else {
        dispatch(updateQuantity({ category, title, quantity: quantity - 1 }));
      }
    }
  };

  const handleConfirmRemove = () => {
    dispatch(updateQuantity({ category, title, quantity: quantity - 1 }));
    setOpenDialog(false);
  };

  const handleCancelRemove = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Box sx={cardStyle}>
        <img src={imageUrl} alt={title} style={imageStyle} />
        <Box
          sx={{
            p: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: "auto",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: "10px",
              fontWeight: 700,
              color: "#333",
            }}
          >
            {title}
          </Typography>
          {quantity === 0 ? (
            <Box
              onClick={handleIncrement}
              sx={{
                color: BLUE_COLOR,
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                userSelect: "none",
                "&:hover": {
                  opacity: 0.8,
                },
                "&:active": {
                  opacity: 0.6,
                },
              }}
            >
              Add
            </Box>
          ) : (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <IconButton
                variant="outlined"
                size="small"
                onClick={handleDecrement}
              >
                <Box
                  sx={{
                    color: BLUE_COLOR,
                    border: `1px solid ${BLUE_COLOR}`,
                    width: "16px",
                    height: "16px",
                    borderRadius: "20px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      lineHeight: "20px",
                      position: "relative",
                      top: "-3.5px",
                    }}
                  >
                    -
                  </span>
                </Box>
              </IconButton>
              <Typography
                variant="body1"
                sx={{ color: BLUE_COLOR, fontSize: "12px" }}
              >
                {quantity}
              </Typography>
              <IconButton
                variant="outlined"
                size="small"
                onClick={handleIncrement}
              >
                <Box
                  sx={{
                    color: BLUE_COLOR,
                    border: `1px solid ${BLUE_COLOR}`,
                    width: "16px",
                    height: "16px",
                    borderRadius: "20px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      lineHeight: "20px",
                      position: "relative",
                      top: "-2px",
                    }}
                  >
                    +
                  </span>
                </Box>
              </IconButton>
            </Stack>
          )}
        </Box>
      </Box>
      <ConfirmDialog
        open={openDialog}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
        message="Are you sure you want to remove this item from Inventory ?"
        confirmText="Remove"
        cancelText="Cancel"
      />
    </>
  );
};

export default InventoryCard;
