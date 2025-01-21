import { Box, Drawer, Typography } from "@mui/material";

const InventoryDrawer = ({ open, onClose, items }) => {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          position: "fixed",
          bottom: 0,
          width: "100%",
          maxWidth: "375px",
          margin: "0 auto",
          borderRadius: "4px",
        },
      }}
    >
      <Box sx={{ p: 3, maxHeight: "80vh", overflowY: "auto" }}>
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          Added Items
        </Typography>
        {items.map((item) => (
          <Box
            key={item.title}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 4,
              gap: 2,
            }}
          >
            <Box
              component="img"
              src={item.imageUrl}
              alt={item.title}
              sx={{
                width: 20,
                height: 20,
                borderRadius: "22px",
                objectFit: "cover",
              }}
            />
            <Typography sx={{ flex: 1, fontSize: "16px" }}>
              {item.title}
            </Typography>
            <Typography sx={{ color: "#666666", fontWeight: "500" }}>
              {item.quantity}
            </Typography>
          </Box>
        ))}
      </Box>
    </Drawer>
  );
};

export default InventoryDrawer;
