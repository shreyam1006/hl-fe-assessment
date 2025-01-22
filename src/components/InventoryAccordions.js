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

const InventoryAccordions = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const rooms = useSelector(selectRooms);
  const kitchens = useSelector(selectKitchens);
  const diningHalls = useSelector(selectDiningHalls);
  const drawingHalls = useSelector(selectDrawingHalls);

  // Combine all spaces into a single object
  const numberedRooms = [
    ...rooms,
    ...kitchens,
    ...diningHalls,
    ...drawingHalls,
  ].reduce((acc, room) => {
    acc[room] = 0; // Initialize count to 0 for each room
    return acc;
  }, {});

  return (
    <Box sx={{ width: "100%" }}>
      {Object.entries(numberedRooms).map(([room, count]) => (
        <Accordion
          key={room}
          expanded={expanded === room}
          onChange={handleChange(room)}
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
              {room}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: BLUE_COLOR, fontSize: "10px" }}
            >
              Item Added {count}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Details for {room} can be added here</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default InventoryAccordions;
