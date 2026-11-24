import { NavLink } from "react-router-dom";
import { useState } from "react";
import ConsentModal from "../components/ConsentModal";
import wallpaper from "../assets/Login/login-wall.jpg";
import arrow from "../assets/Icon/arrow.svg";
import arrowMobile from "../assets/Icon/arrowMobile.svg";
import google from "../assets/Icon/google.svg";

export default function Register() {
  const [isConsentOpen, setIsConsentOpen] = useState(false);

  return (
    <main className="relative min-h-screen md:h-screen bg-[#446685] flex flex-col md:flex-row items-center gap-6 p-2 overflow-hidden">
      {/* Arrow */}
      <NavLink to="/" className="absolute top-5 left-5 z-50 md:top-7 md:left-7">
        <picture>
          <source media="(max-width: 767px)" srcSet={arrowMobile} />
          <img
            src={arrow}
            alt="Kembali"
            className="p-1 w-10 h-10 border max-[767px]:border-0 md:border-[#446685] rounded-full"
          />
        </picture>
      </NavLink>

      {/* Wallpaper */}
      <div className="absolute inset-0 z-0 md:relative md:w-1/2 md:h-full md:overflow-hidden md:rounded-lg">
        <img
          src={wallpaper}
          alt="Wallpaper"
          className="w-full h-full object-cover"
        />

        {/* Overlay khusus mobile */}
        <div className="absolute inset-0 bg-black/60 md:hidden pointer-events-none"></div>
      </div>

      {/* Bagian kiri - Form */}
      <div className="relative z-10 w-full md:w-1/2 md:h-full flex flex-col items-center justify-center gap-8 px-5 py-10 md:px-10 max-[767px]:mt-10">
        {/* Heading */}
        <div className="w-3/4 md:w-3/4 flex flex-col gap-3">
          <h1 className="text-[#F5F7FA] font-medium text-5xl md:text-5xl">
            Buat Akun Anda
          </h1>

          <p className="text-[#F5F7FA] text-sm md:text-base">
            Sudah punya akun?{" "}
            <NavLink to="/login" className="text-[#3385FF] underline">
              Masuk
            </NavLink>
          </p>
        </div>

        {/* Form */}
        <form
          className="w-3/4 flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            setIsConsentOpen(true);
          }}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-[#F5F7FA]">
              Username atau email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Masukkan username atau email"
              className="w-full bg-[#F5F7FA] px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-[#3385FF]"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[#F5F7FA]">
              Kata sandi
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Masukkan kata sandi"
              className="w-full bg-[#F5F7FA] px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-[#3385FF]"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-[#F5F7FA]">
              Konfirmasi Kata sandi
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Konfirmasi kata sandi"
              className="w-full bg-[#F5F7FA] px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-[#3385FF]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1E40AF] text-[#F5F7FA] py-3 rounded-md font-medium hover:bg-[#1D4ED8] transition-colors duration-200"
          >
            Buat Akun
          </button>
        </form>

        {/* Google */}
        <div className="w-3/4 flex flex-col gap-5 md:gap-7">
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-gray-400"></div>

            <span className="text-gray-300 text-sm whitespace-nowrap">
              Atau daftar dengan
            </span>

            <div className="flex-1 border-t border-gray-400"></div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 text-[#F5F7FA] py-3 rounded-md font-medium border border-gray-300 hover:bg-gray-100 transition-colors duration-200 hover:text-[#446685]"
          >
            <img src={google} alt="Google" className="w-5 h-5" />
            Daftar dengan Google
          </button>
        </div>
      </div>
      <ConsentModal
        isOpen={isConsentOpen}
        onClose={() => setIsConsentOpen(false)}
        onContinue={() => {
          setIsConsentOpen(false);
          console.log("Persetujuan diterima");
        }}
      />
    </main>
  );
}
