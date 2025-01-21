import { Box, List, Stack, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ROOM_WISE_INVENTORY } from "../utils/constants";
import { BLUE_COLOR } from "../utils/colorConstants";
import {
  increment,
  decrement,
  selectCounters,
} from "../features/roomCounterSlice";

const RoomWiseContent = () => {
  const dispatch = useDispatch();
  const counters = useSelector(selectCounters);

  const handleIncrement = (room) => {
    dispatch(increment(room));
  };

  const handleDecrement = (room) => {
    dispatch(decrement(room));
  };

  return (
    <Box>
      <List>
        {ROOM_WISE_INVENTORY.map((roomObj, index) =>
          Object.values(roomObj).map((room, roomIndex) => (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ px: 2, mb: 2 }}
              key={`${index}-${roomIndex}`}
            >
              <Typography variant="body1" sx={{ fontSize: "14px" }}>
                {room}
              </Typography>
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
            </Stack>
          ))
        )}
      </List>
    </Box>
  );
};

export default RoomWiseContent;
