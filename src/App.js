import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ParkingPage from "./pages/ParkingPage";
import WeatherPage from "./pages/WeatherPage";
import GarbagePage from "./pages/GarbagePage";
import FeedbackPage from "./pages/FeedbackPage";
import EmergencyPage from "./pages/EmergencyPage";
import StatisticsPage from "./pages/StatisticsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/parking" element={<ParkingPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/garbage" element={<GarbagePage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;