import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Emergency from "./pages/Emergency";
import Analysis from "./pages/Analysis";
import Education from "./pages/Education";
import DataBreach from "./pages/EmergencyCase/DataBreach";
import Financial from "./pages/EmergencyCase/Financial";
import DataReport from "./pages/Report/DataReport";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FinancialReport from "./pages/Report/FinancialReport";
import Chat from "./pages/Analysis/Chat";
import Phone from "./pages/Analysis/Phone";
import Screenshot from "./pages/Analysis/Screenshot";

function App() {
  return (
    <div className="relative flex min-h-screen flex-col bg-linear-to-br from-[#F5F7FA] to-[#C3CFE2]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/analysis/chat" element={<Chat />} />
        <Route path="/analysis/screenshot" element={<Screenshot />} />
        <Route path="/analysis/phone" element={<Phone />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/emergency/data" element={<DataBreach />} />
        <Route path="/emergency/financial" element={<Financial />} />
        <Route path="/report/data" element={<DataReport />} />
        <Route path="/report/financial" element={<FinancialReport />} />
        <Route path="/education" element={<Education />} />
    
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
