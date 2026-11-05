import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Beranda" },
  { to: "/emergency", label: "Darurat" },
  { to: "/analysis", label: "Analisis" },
  { to: "/education", label: "Edukasi" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 transition-all duration-300 sm:px-6 ${
        scrolled
          ? "bg-white/75 py-3 shadow-[0_8px_30px_-18px_rgba(17,24,39,0.45)] backdrop-blur-xl"
          : "bg-transparent py-5 sm:py-5 lg:py-6"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center gap-1.5 sm:justify-between sm:gap-2 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:justify-normal lg:gap-0">
        <NavLink
          to="/"
          className="flex shrink-0 items-center gap-1 justify-self-start whitespace-nowrap text-[12.5px] font-bold leading-none text-[#0F172A] transition-opacity hover:opacity-80 sm:gap-2 sm:text-base lg:ms-2 lg:text-[26px]"
        >
          <img
            src="/logo2.png"
            alt="Logo CegahScam"
            className={`w-auto shrink-0 transition-all duration-300 ${
              scrolled ? "h-6 lg:h-7" : "h-6 lg:h-8"
            }`}
          />
          <span className="max-[359px]:hidden">
            Cegah<span className="text-[#1E40AF]">Scam</span>
          </span>
        </NavLink>

        <nav
          className={`flex shrink-0 items-center justify-center gap-2 rounded-full bg-white/80 px-3 py-2 shadow-lg shadow-[#446685]/10 backdrop-blur-md transition-all duration-300 sm:gap-8 sm:px-8 lg:gap-12 lg:px-10 lg:py-3 ${
            scrolled ? "lg:shadow-md" : ""
          }`}
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative text-[12.5px] transition-colors duration-200 sm:text-sm ${
                  isActive
                    ? "font-bold text-[#1E40AF]"
                    : "font-normal text-[#0F172A] hover:text-[#1E40AF]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <span className="hidden lg:block" aria-hidden="true" />
      </div>
    </header>
  );
}
