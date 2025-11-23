// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
// Import other pages/components as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Add other routes */}
        {/* <Route path="/list" element={<ListPage />} /> */}
        {/* <Route path="/recommendations" element={<RecommendationsPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;