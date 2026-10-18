import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="absolute top-10 z-50 flex w-full px-6">
      <div className="mx-auto grid w-full max-w-290 grid-cols-[1fr_auto_1fr] items-center">
        <Link to="/" className="justify-self-start font-bold text-[#0F172A] text-[26px]">
          Cegah<span className="text-[#1E40AF]">Scam</span>
        </Link>
        <div className="flex items-center justify-center gap-12 rounded-4xl bg-white/80 px-10 py-3 shadow-lg backdrop-blur-md">
          <Link to="/" className="hover:font-bold hover:text-[#1E40AF]">
            Beranda
          </Link>
          <Link to="/darurat" className="hover:font-bold hover:text-[#1E40AF]">
            Darurat
          </Link>
          <Link to="/analisis" className="hover:font-bold hover:text-[#1E40AF]">
            Analisis
          </Link>
          <Link to="/edukasi" className="hover:font-bold hover:text-[#1E40AF]">
            Edukasi
          </Link>
        </div>
      </div>
    </div>
  );
}
