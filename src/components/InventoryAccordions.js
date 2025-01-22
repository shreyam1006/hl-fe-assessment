import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BLUE_COLOR } from "../utils/colorConstants";
import { useSelector } from "react-redux";
import {
  selectRooms,
  selectKitchens,
  selectDiningHalls,
  selectDrawingHalls,
} from "../features/selectedSpacesSlice";
import CategoryWiseContent from "./CategoryWiseContent";

const SpaceInventoryContent = ({ spaceType, spaceName }) => {
  return (
    <CategoryWiseContent
      spaceType={spaceType}
      spaceName={spaceName}
      gridColumns={2}
    />
  );
};

const InventoryAccordions = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const rooms = useSelector(selectRooms);
  const kitchens = useSelector(selectKitchens);
  const diningHalls = useSelector(selectDiningHalls);
  const drawingHalls = useSelector(selectDrawingHalls);

  const allSpaces = useSelector((state) => {
    const spaces = [
      ...rooms.map((space) => ({ ...space, type: "Rooms" })),
      ...kitchens.map((space) => ({ ...space, type: "Kitchen" })),
      ...diningHalls.map((space) => ({ ...space, type: "Dining Hall" })),
      ...drawingHalls.map((space) => ({ ...space, type: "Drawing Hall" })),
    ];

    return spaces.map((space) => {
      const itemCount =
        space.inventory.All?.reduce(
          (sum, item) => sum + (item.quantity || 0),
          0
        ) || 0;
      return [space.name, itemCount, space.type];
    });
  });

  return (
    <Box sx={{ width: "100%" }}>
      {allSpaces.length === 0 ? (
        <Box sx={{ textAlign: "center" }}>No space found</Box>
      ) : (
        allSpaces.map(([spaceName, count, spaceType]) => (
          <Accordion
            key={spaceName}
            expanded={expanded === spaceName}
            onChange={handleChange(spaceName)}
            sx={{
              mb: 1,
              boxShadow: "none",
              "&:before": {
                display: "none",
              },
              backgroundColor: "#F7F7F7",
              width: "100%",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                "& .MuiAccordionSummary-content": {
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                },
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, fontSize: "14px" }}
              >
                {spaceName}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: BLUE_COLOR, fontSize: "10px" }}
              >
                {count} {count === 1 ? "Item" : "Items"} Added
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0 }}>
              <SpaceInventoryContent
                spaceType={spaceType}
                spaceName={spaceName}
              />
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Box>
  );
};

export default InventoryAccordions;
