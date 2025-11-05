// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Profile from "./pages/Profile";
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
        <Route path="/wizard" element={<Wizard />} />
      </Routes>
    </Router>
  );
}

export default App;