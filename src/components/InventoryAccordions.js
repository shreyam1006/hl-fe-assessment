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

const InventoryAccordions = ({ counters }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Group rooms by type and create numbered names
  const createNumberedRooms = () => {
    const roomGroups = {};
    Object.entries(counters).forEach(([room, count]) => {
      // Create numbered entries for all room types
      const nameMap = {
        Rooms: "Room",
        Kitchen: "Kitchen",
        "Drawing Hall": "Drawing Hall",
        "Dining Hall": "Dining Hall",
      };

      const baseName = nameMap[room];
      if (baseName) {
        for (let i = 1; i <= count; i++) {
          roomGroups[`${baseName} ${i}`] = 0;
        }
      }
    });
    return roomGroups;
  };

  const numberedRooms = createNumberedRooms();

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
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
