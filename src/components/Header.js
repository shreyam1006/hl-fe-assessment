import { Box, Grid2, IconButton } from "@mui/material";
import { forwardRef } from "react";
import { useDispatch } from "react-redux";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { setShowInventory } from "../features/tabSlice";

const Header = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  return (
    <Grid2
      container
      ref={ref}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "54px",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        fontSize: "16px",
        fontWeight: 700,
        backgroundColor: "#fff",
      }}
    >
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
        Select Inventory
      </Box>
    </Grid2>
  );
});

export default Header;
