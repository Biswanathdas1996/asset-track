import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BottomNavigation from "./Components/BottomNavigation";
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <BottomNavigation />
    </>
  );
}

export default App;
