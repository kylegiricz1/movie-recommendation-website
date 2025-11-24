// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Recommendations from "./pages/Recommendations";
import Wizard from "./pages/Wizard";
import List from "./pages/List";
// Import other pages/components as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/list" element={<List />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/wizard" element={<Wizard />} />
        <Route path="/test-dark-veil" element={<TestDarkVeil />} />
        
      </Routes>
    </Router>
  );
}

export default App;
