import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainPage from "./pages/MainPage";
import ZayavkiPage from "./pages/ZayavkiPage";
import NormativTS from "./pages/NormativTS";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/zayavki" element={<ZayavkiPage />} />
        <Route path="/normativ" element={<NormativTS />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
