import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import profile from "../assets/Icon/profile.svg";
import ArrowDwn from "../assets/Icon/arrowDwn.svg";
import ArrowDwnMobile from "../assets/Icon/arrowDwn-mobile.svg";

const links = [
  { to: "/", label: "Beranda" },
  { to: "/emergency", label: "Darurat" },
  { to: "/analysis", label: "Analisis" },
  { to: "/education", label: "Edukasi" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showDropProfile, setShowDropProfile] = useState(false);
  const { IsLoggedIn, username, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

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
        {/* Mobile scale */}
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
            <div className="flex flex-row items-center gap-2">
              {!IsLoggedIn ? (
                <NavLink
                  to="/login"
                  className="text-[#F5F7FA] bg-[#1E40AF] text-sm rounded-3xl py-1 px-4 font-semibold"
                >
                  Masuk
                </NavLink>
              ) : (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setProfileOpen((value) => !value)}
                    className="flex items-center gap-2 rounded-3xl bg-[#1E40AF] px-4 py-2 text-sm font-semibold text-[#F5F7FA]"
                  >
                    <span>{username || "Pengguna"}</span>
                    <img
                      src={ArrowDwnMobile}
                      alt=""
                      className={`h-3 w-3 transition-transform ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-b-xl bg-white shadow-lg">
                      <NavLink
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-3 text-sm text-[#0F172A] hover:bg-gray-100"
                      >
                        Pengaturan Profil
                      </NavLink>
                      <NavLink
                        to="/history"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-3 text-sm text-[#0F172A] hover:bg-gray-100"
                      >
                        Riwayat
                      </NavLink>

                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setProfileOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-gray-100"
                      >
                        Keluar
                      </button>
                    </div>
                  )}
                </div>
              )}
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

        {/* Desktop scale */}
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

          {!IsLoggedIn ? (
            // Kondisi belum login
            <NavLink
              to="/login"
              className="flex flex-row gap-3 justify-self-end"
            >
              <img src={profile} alt="Profile" className="w-5 h-auto" />
              <p className="text-[#1E40AF] font-bold">Login</p>
            </NavLink>
          ) : (
            // Kondisi sudah login
            <div className="flex flex-row items-center gap-3 justify-self-end">
              <p className="text-[#1E40AF] font-bold">Hi, {username}!</p>|
              <button onClick={() => setShowDropProfile(!showDropProfile)}>
                <img
                  src={ArrowDwn}
                  className="w-5 h-auto hover:cursor-pointer"
                />
              </button>
            </div>
          )}
        </div>
        {showDropProfile && (
          <div className="absolute bg-white w-1/5 h-auto right-15 top-17 rounded-b-lg">
            <div className="flex flex-col p-5 text-end">
              <NavLink
                to="/profile"
                className="hover:bg-[#1E40AF] hover:text-[#F5F7FA] p-2 hover:rounded-md"
              >
                Pengaturan Profil
              </NavLink>
              <NavLink
                to="/history"
                className="hover:bg-[#1E40AF] hover:text-[#F5F7FA] p-2 hover:rounded-md"
              >
                Riwayat
              </NavLink>
              <button
                onClick={() => {
                  logout();
                  setShowDropProfile(false);
                }}
                className="text-end hover:bg-[#1E40AF] hover:text-[#F5F7FA] p-2 hover:rounded-md hover:cursor-pointer"
              >
                Keluar
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
