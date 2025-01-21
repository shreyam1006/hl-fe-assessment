import {
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { ROOM_WISE_INVENTORY } from "../utils/constants";
import { BLUE_COLOR } from "../utils/colorConstants";

const RoomWiseContent = () => {
  const [counters, setCounters] = useState(
    ROOM_WISE_INVENTORY.reduce((acc, roomObj) => {
      Object.values(roomObj).forEach((room) => {
        acc[room] = 0;
      });
      return acc;
    }, {})
  );

  const handleIncrement = (room) => {
    setCounters((prev) => ({
      ...prev,
      [room]: prev[room] + 1,
    }));
  };

  const handleDecrement = (room) => {
    setCounters((prev) => ({
      ...prev,
      [room]: Math.max(0, prev[room] - 1),
    }));
  };

  return (
    <Box>
      <List>
        {ROOM_WISE_INVENTORY.map((roomObj, index) =>
          Object.values(roomObj).map((room, roomIndex) => (
            <ListItem key={`${index}-${roomIndex}`}>
              <ListItemText primary={room} />
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton
                  variant="outlined"
                  size="small"
                  onClick={() => handleDecrement(room)}
                >
                  <Box
                    sx={{
                      color: BLUE_COLOR,
                      border: `1px solid ${BLUE_COLOR}`,
                      width: "20px",
                      height: "20px",
                      borderRadius: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        lineHeight: "20px",
                        position: "relative",
                        top: "-2px",
                      }}
                    >
                      -
                    </span>
                  </Box>
                </IconButton>
                <Typography variant="body1" sx={{ color: BLUE_COLOR }}>
                  {counters[room]}
                </Typography>
                <IconButton
                  variant="outlined"
                  size="small"
                  onClick={() => handleIncrement(room)}
                >
                  <Box
                    sx={{
                      color: BLUE_COLOR,
                      border: `1px solid ${BLUE_COLOR}`,
                      width: "20px",
                      height: "20px",
                      borderRadius: "20px",
                    }}
                  >
                    +
                  </Box>
                </IconButton>
              </Stack>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default RoomWiseContent;
