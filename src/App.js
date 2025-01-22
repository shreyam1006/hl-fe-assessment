import { useRef } from "react";
import BottomNav from "./components/BottomNavigation";
import Header from "./components/Header";
import MainContent from "./components/MainContent";

function App() {
  const ref = useRef(null);
  const headerRef = useRef(null);

  return (
    <div className="App">
      <Header ref={headerRef} />
      <div
        style={{
          height: "calc(100% - 105px)",
          overflow: "auto",
        }}
      >
        <MainContent />
      </div>
      <BottomNav ref={ref} />
    </div>
  );
}

export default App;
