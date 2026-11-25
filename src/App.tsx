import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Emergency from "./pages/Emergency";
import Analysis from "./pages/Analysis";
import Education from "./pages/Education";
import DataBreach from "./pages/EmergencyCase/DataBreach";
import Financial from "./pages/EmergencyCase/Financial";
import EmergencyReportView from "./pages/Report/EmergencyReportView";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chat from "./pages/Analysis/Chat";
import Phone from "./pages/Analysis/Phone";
import Screenshot from "./pages/Analysis/Screenshot";
import ResultAnalysisChat from "./pages/ResultAnalysis/ResultChat";
import ResultAnalysiPhone from "./pages/ResultAnalysis/ResultPhone";
import ResultAnalysisScreenshot from "./pages/ResultAnalysis/ResultScreenshot";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import History from "./pages/History";

function ScrollToTop() {
  const { key } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);

  return null;
}

function App() {
  const pageLocation = useLocation();
  const hideLayout = ["/login", "/register", "/profile", "/history"].includes(pageLocation.pathname);

  return (
    <div className="relative flex min-h-screen flex-col bg-linear-to-br from-[#F5F7FA] to-[#C3CFE2]">
      <ScrollToTop />
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/analysis/chat" element={<Chat />} />
        <Route path="/analysis/screenshot" element={<Screenshot />} />
        <Route path="/analysis/resultchat" element={<ResultAnalysisChat />} />
        <Route path="/analysis/resultphone" element={<ResultAnalysiPhone />} />
        <Route path="/analysis/resultscreenshot" element={<ResultAnalysisScreenshot />} />
        <Route path="/analysis/phone" element={<Phone />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/emergency/data" element={<DataBreach />} />
        <Route path="/emergency/financial" element={<Financial />} />
        <Route path="/report/data" element={<EmergencyReportView kind="data" />} />
        <Route path="/report/financial" element={<EmergencyReportView kind="financial" />} />
        <Route path="/education" element={<Education />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
