import { useRef } from "react";
import BottomNav from "./components/BottomNavigation";

function App() {
  const ref = useRef(null);

  return (
    <div className="App">
      <div style={{ height: "calc(100% - 56px)", overflow: "auto" }}>
        <header className="App-header">Hello World</header>
      </div>
      <BottomNav ref={ref} />
    </div>
  );
}

export default App;
