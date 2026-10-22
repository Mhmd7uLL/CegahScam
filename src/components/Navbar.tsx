import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="absolute top-10 z-50 flex w-full px-6">
      <div className="mx-auto grid w-full max-w-290 grid-cols-[1fr_auto_1fr] items-center">

        <Link to="/" className="flex items-center gap-2 justify-self-start whitespace-nowrap font-bold text-[#0F172A] text-[26px] leading-none"
            >
            <img src="/logo2.png" alt="Logo CegahScam" className="h-8 w-auto shrink-0" />
            <span>
              Cegah<span className="text-[#1E40AF]">Scam</span>
            </span>
         </Link>
        <div className="flex items-center justify-center gap-12 rounded-4xl bg-white/80 px-10 py-3 shadow-lg backdrop-blur-md">
          <Link to="/" className="hover:font-bold hover:text-[#1E40AF]">
            Beranda
          </Link>
          <Link to="/emergency" className="hover:font-bold hover:text-[#1E40AF]">
            Darurat
          </Link>
          <Link to="/analysis" className="hover:font-bold hover:text-[#1E40AF]">
            Analysis
          </Link>
          <Link to="/education" className="hover:font-bold hover:text-[#1E40AF]">
            Edukasi
          </Link>
        </div>
      </div>
    </div>
  );
}
