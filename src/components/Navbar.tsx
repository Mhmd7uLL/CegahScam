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
  const [open, setOpen] = useState(false);

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
          : "bg-transparent py-4 sm:py-5 lg:py-6"
      }`}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="sm:hidden">
          <div className="flex items-center justify-between gap-3 rounded-full bg-white/80 px-4 py-2 shadow-lg shadow-[#446685]/10 backdrop-blur-md">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="flex shrink-0 items-center gap-2 text-[15px] font-bold leading-none text-[#0F172A] transition-opacity hover:opacity-80"
            >
              <img
                src="/logo2.png"
                alt="Logo CegahScam"
                className="h-7 w-auto shrink-0"
              />
              <span>
                Cegah<span className="text-[#1E40AF]">Scam</span>
              </span>
            </NavLink>

            <button
              type="button"
              aria-label={open ? "Tutup menu" : "Buka menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#0F172A] transition-colors hover:bg-[#446685]/10"
            >
              {open ? (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>

          {open ? (
            <div
              id="mobile-menu"
              className="mt-2 rounded-2xl bg-white/95 p-2 shadow-[0_18px_40px_-20px_rgba(17,24,39,0.45)] ring-1 ring-black/5 backdrop-blur-md"
            >
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-[14px] transition-colors duration-200 ${
                      isActive
                        ? "bg-[#EAF2FF] font-bold text-[#1E40AF]"
                        : "font-medium text-[#0F172A] hover:bg-[#446685]/5"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          ) : null}
        </div>

        <div className="hidden items-center justify-between gap-2 sm:flex lg:grid lg:grid-cols-[1fr_auto_1fr] lg:justify-normal lg:gap-0">
          <NavLink
            to="/"
            className="flex shrink-0 items-center gap-2 justify-self-start whitespace-nowrap text-base font-bold leading-none text-[#0F172A] transition-opacity hover:opacity-80 lg:ms-2 lg:text-[26px]"
          >
            <img
              src="/logo2.png"
              alt="Logo CegahScam"
              className={`w-auto shrink-0 transition-all duration-300 ${
                scrolled ? "h-6 lg:h-7" : "h-6 lg:h-8"
              }`}
            />
            <span>
              Cegah<span className="text-[#1E40AF]">Scam</span>
            </span>
          </NavLink>

          <nav
            className={`flex shrink-0 items-center justify-center gap-8 rounded-full bg-white/80 px-8 py-2 shadow-lg shadow-[#446685]/10 backdrop-blur-md transition-all duration-300 lg:gap-12 lg:px-10 lg:py-3 ${
              scrolled ? "lg:shadow-md" : ""
            }`}
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative text-sm transition-colors duration-200 ${
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
      </div>
    </header>
  );
}
