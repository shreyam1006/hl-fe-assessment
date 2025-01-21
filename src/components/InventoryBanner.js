import { Box } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const InventoryBanner = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#059445",
        color: "white",
        padding: "8px 16px",
        display: "flex",
        borderTopRightRadius: "12px",
        borderTopLeftRadius: "12px",
        gap: 1,
      }}
    >
      <InfoOutlinedIcon sx={{ fontSize: 16 }} />
      <span style={{ fontSize: "12px" }}>
        Please ensure all inventory is added upfront. Any items added later
        during pickup will incur extra charges.
      </span>
    </Box>
  );
};

export default InventoryBanner;
