import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import wallpaper from "../assets/Login/login-wall.jpg";
import arrowDesktop from "../assets/Icon/arrow.svg";
import arrowMobile from "../assets/Icon/arrowMobile.svg";
import google from "../assets/Icon/google.svg";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === "admin@123" && password === "123") {
      login(username);
      navigate("/");
    } else {
      setError("Username atau password salah!");
    }
  };

  return (
    <main className="relative min-h-screen md:h-screen bg-[#446685] flex flex-col md:flex-row items-center gap-6 p-2 overflow-hidden">
      {/* Arrow */}
      <NavLink to="/" className="absolute top-5 left-5 z-50 md:top-7 md:left-7">
        <picture>
          <source media="(max-width: 767px)" srcSet={arrowMobile} />
          <img
            src={arrowDesktop}
            alt="Kembali"
            className="p-1 w-10 h-10 border max-[767px]:border-0 md:border-[#446685] rounded-full"
          />
        </picture>
      </NavLink>

      {/* Bagian kiri / Background */}
      <div className="absolute inset-0 z-0 md:relative md:w-1/2 md:h-full md:overflow-hidden md:rounded-lg">
        <img
          src={wallpaper}
          alt="Wallpaper"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60 md:hidden pointer-events-none"></div>
      </div>

      {/* Bagian kanan */}
      <div className="relative z-10 w-full md:w-1/2 md:h-full flex flex-col items-center justify-center gap-8 px-5 py-10 md:px-10 max-[767px]:mt-10">
        {/* Heading */}
        <div className="w-3/4 flex flex-col gap-3">
          <h1 className="text-[#F5F7FA] font-medium text-5xl">
            Masuk ke Akun Anda
          </h1>

          <p className="text-[#F5F7FA]">
            Belum punya akun?{" "}
            <NavLink to="/register" className="text-[#3385FF] underline">
              Daftar di sini
            </NavLink>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-3/4 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-[#F5F7FA]">
              Username atau email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Masukkan username atau email"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              className="w-full bg-white px-3 py-3 rounded-md outline-none focus:ring-2 focus:ring-[#3385FF]"
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full bg-white px-3 py-3 rounded-md outline-none focus:ring-2 focus:ring-[#3385FF]"
            />
          </div>

          {error && <p className="text-red-300 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#1E40AF] text-[#F5F7FA] py-3 rounded-md font-medium hover:bg-[#1D4ED8] transition-colors duration-200"
          >
            Masuk
          </button>
        </form>

        <div className="w-3/4 flex flex-col gap-7">
          {/* Pemisah */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-gray-400"></div>

            <span className="text-gray-300 text-sm whitespace-nowrap">
              Atau daftar dengan
            </span>

            <div className="flex-1 border-t border-gray-400"></div>
          </div>

          {/* Tombol Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 text-[#F5F7FA] py-3 rounded-md font-medium border border-gray-300 hover:bg-gray-100 transition-colors duration-200 hover:text-[#446685]"
          >
            <img src={google} alt="Google" className="w-5 h-5" />
            Masuk dengan Google
          </button>
        </div>
      </div>
    </main>
  );
}
