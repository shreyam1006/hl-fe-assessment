import { useRef } from "react";
import BottomNav from "./components/BottomNavigation";
import Header from "./components/Header";
import { LinearProgress } from "@mui/material";

function App() {
  const ref = useRef(null);
  const headerRef = useRef(null);

  return (
    <div className="App">
      <Header ref={headerRef} />
      <div
        style={{
          height: "calc(100% - 110px)",
          marginTop: "54px",
          overflow: "auto",
        }}
      >
        <LinearProgress variant="determinate" value={50} />

        <header className="App-header">Hello World</header>
      </div>
      <BottomNav ref={ref} />
    </div>
  );
}

export default App;
