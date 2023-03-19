import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AssetTrack from "./pages/AssetTrack";
import BottomNavigation from "./Components/BottomNavigation";
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/track" element={<AssetTrack />} />
      </Routes>
      <BottomNavigation />
    </>
  );
}

export default App;
