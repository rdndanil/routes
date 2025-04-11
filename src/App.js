import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainPage from "./pages/MainPage";
import ZayavkiPage from "./pages/ZayavkiPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/zayavki" element={<ZayavkiPage />} />
      </Routes>
    </Router>
  );
};

export default App;
