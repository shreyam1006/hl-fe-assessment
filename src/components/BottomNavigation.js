import { BottomNavigation, Button, Paper } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowInventory, selectTab } from "../features/tabSlice";

// const fetchRoomWiseData = async () => {
//   try {
//     const response = await fetch(
//       "https://119a2e2a-9ce4-405d-b7f9-4781b222f735.mock.pstmn.io/rooms-data"
//     );
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error("Error fetching room-wise data:", error);
//   }
// };

const BottomNav = forwardRef((props, ref) => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const selectedTab = useSelector(selectTab);

  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value, ref]);

  return (
    <Paper
      ref={ref}
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "76px",
        boxShadow: `0px -4px 8px 0px #0000001A,
                    0px -14px 14px 0px #00000017,
                    0px -32px 19px 0px #0000000D,
                    0px -56px 22px 0px #00000003,
                    0px -88px 25px 0px #00000000`,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          p: 0,
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <Button
          sx={{
            alignSelf: "center",
            width: "90%",
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
          onClick={() => {
            if (selectedTab === "Room Wise") {
              dispatch(setShowInventory(true));
            }
            // else {
            // fetchRoomWiseData();
            // }
          }}
        >
          <b>Continue</b>
        </Button>
      </BottomNavigation>
    </Paper>
  );
});

export default BottomNav;
