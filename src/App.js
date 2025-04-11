import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainPage from "./pages/MainPage";
import ZayavkiPage from "./pages/ZayavkiPage";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/zayavki" element={<ZayavkiPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
