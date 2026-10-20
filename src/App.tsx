import { Routes, Route } from "react-router-dom";
import "./App.css";
import Beranda from "./pages/Beranda";
import Darurat from "./pages/Darurat";
import Analisis from "./pages/Analisis";
import Edukasi from "./pages/Edukasi";
import DaruratData from "./pages/KasusDarurat/DaruratData";
import DaruratFinansial from "./pages/KasusDarurat/DaruratFinansial";
import LaporanData from "./pages/HasilLaporan/LaporanData";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LaporanFinansial from "./pages/HasilLaporan/LaporanFinansial";

function App() {
  return (
    <div className="relative flex min-h-screen flex-col bg-linear-to-br from-[#F5F7FA] to-[#C3CFE2]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/analisis" element={<Analisis />} />
        <Route path="/daruratData" element={<DaruratData />} />
        <Route path="/daruratFinansial" element={<DaruratFinansial />} />
        <Route path="/laporanData" element={<LaporanData />} />
        <Route path="/laporanFinansial" element={<LaporanFinansial />} />
        <Route path="/edukasi" element={<Edukasi />} />
        <Route path="/darurat" element={<Darurat />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
