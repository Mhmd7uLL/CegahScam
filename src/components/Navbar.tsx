import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="absolute top-7 lg:top-10 z-50 flex w-full px-6">
      <div className="mx-auto grid w-full max-w-150 lg:max-w-290 lg:grid-cols-[1fr_auto_1fr] items-center">
        <NavLink
          to="/"
          className="flex items-center gap-2 justify-self-start whitespace-nowrap font-bold text-[#0F172A] lg:text-[26px] leading-none max-[600px]:justify-self-center"
        >
          <img
            src="/logo2.png"
            alt="Logo CegahScam"
            className="h-5 lg:h-8 w-auto shrink-0"
          />
          <span>
            Cegah<span className="text-[#1E40AF]">Scam</span>
          </span>
        </NavLink>
        <div className="flex items-center justify-center gap-8 lg:gap-12 rounded-4xl bg-white/80 lg:px-10 py-3 shadow-lg backdrop-blur-md max-[600px]:mt-3">
          <NavLink
            to="/"
            className={({ isActive }) => `hover:font-bold hover:text-[#1E40AF] max-[600px]:text-[15px] ${ isActive ? "font-bold text-[#1E40AF]" : "font-normal" }`}
          >
            Beranda
          </NavLink>
          <NavLink
            to="/emergency"
            className={({ isActive }) => `hover:font-bold hover:text-[#1E40AF] max-[600px]:text-[15px] ${ isActive ? "font-bold text-[#1E40AF]" : "font-normal" }`}
          >
            Darurat
          </NavLink>
          <NavLink
            to="/analysis"
            className={({ isActive }) => `hover:font-bold hover:text-[#1E40AF] max-[600px]:text-[15px] ${ isActive ? "font-bold text-[#1E40AF]" : "font-normal" }`}
          >
            Analisis
          </NavLink>
          <NavLink
            to="/education"
            className={({ isActive }) => `hover:font-bold hover:text-[#1E40AF] max-[600px]:text-[15px] ${ isActive ? "font-bold text-[#1E40AF]" : "font-normal" }`}
          >
            Edukasi
          </NavLink>
        </div>
      </div>
    </div>
  );
}
