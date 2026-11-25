import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import arrow from "../assets/Icon/arrow.svg";
import user from "../assets/Icon/profile.svg";

export default function Profile() {
  const { username } = useAuth();
  const [formData, setFormData] = useState({
    username: username ?? "",
    nama: "",
    pekerjaan: "",
    alamat: "",
    kodePos: "",
    kota: "",
    provinsi: "",
    password: "",
  });

  const isChanged = Object.values(formData).some((value, index) => {
    const initialValues = [username ?? "", "", "", "", "", "", "", ""];

    return value !== initialValues[index];
  });

  return (
    <main className="px-5 md:px-20 flex flex-col gap-8 md:gap-10 min-h-screen py-6 md:py-10">
      {/* Arrow */}
      <Link to="/" className="w-10">
        <img src={arrow} alt="Arrow" className="p-1 w-10 h-10" />
      </Link>

      <h1 className="text-2xl md:text-3xl font-semibold">Profil Pengguna</h1>

      {/* Dua section */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-5">
        {/* Sisi kiri */}
        <div className="w-full md:w-1/3">
          <div className="flex flex-row items-center gap-4 md:flex-col md:items-start">
            <img
              src={user}
              alt="Foto profil"
              className="border p-3 w-16 md:w-20 h-auto rounded-full"
            />

            <div>
              <p className="font-bold">{username}</p>
              <p className="text-sm">Terakhir masuk 5 menit yang lalu</p>
            </div>
          </div>

          <div className="border-t border-gray-400 my-5"></div>

          <button className="text-red-400 font-semibold hover:cursor-pointer">
            Hapus Pengguna
          </button>
        </div>

        {/* Sisi kanan */}
        <div className="w-full md:flex-1">
          <form className="flex flex-col gap-5">
            {/* Data Diri */}
            <div className="bg-white/50 rounded-lg p-5 md:p-10">
              <h1 className="text-2xl mb-4 font-semibold">Data Diri</h1>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <label className="font-medium">Nama Lengkap</label>
                  <input
                    type="text"
                    placeholder="Nama lengkap"
                    className="bg-white/50 py-2 px-3 rounded-md border border-gray-400"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium">Pekerjaan</label>
                  <input
                    type="text"
                    placeholder="Pekerjaan Anda"
                    className="bg-white/50 py-2 px-3 rounded-md border border-gray-400"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium">Alamat</label>
                  <input
                    type="text"
                    placeholder="Alamat tinggal Anda"
                    className="bg-white/50 py-2 px-3 rounded-md border border-gray-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex flex-col">
                    <label className="font-medium">Kode Pos</label>
                    <input
                      type="text"
                      placeholder="Kode Pos"
                      className="bg-white/50 py-2 px-3 rounded-md border border-gray-400"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-medium">Kota</label>
                    <input
                      type="text"
                      placeholder="Kota tinggal Anda"
                      className="bg-white/50 py-2 px-3 rounded-md border border-gray-400"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-medium">Provinsi</label>
                    <input
                      type="text"
                      placeholder="Provinsi Anda"
                      className="bg-white/50 py-2 px-3 rounded-md border border-gray-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Informasi Akun */}
            <div className="bg-white/50 rounded-lg p-5 md:p-10">
              <h1 className="text-2xl mb-4 font-semibold">Informasi Akun</h1>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <label className="font-medium">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        username: e.target.value,
                      })
                    }
                    placeholder="Username"
                    className="bg-white/50 py-2 px-3 rounded-md border border-gray-400"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium">Password</label>
                  <input
                    type="password"
                    placeholder="Password Anda"
                    className="bg-white/50 py-2 px-3 rounded-md border border-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={!isChanged}
              className={`lg:w-1/4 w-full rounded-lg py-3 font-semibold text-white transition ${
                isChanged
                  ? "bg-[#1A56DB] hover:bg-[#1645B5] cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Simpan Perubahan data
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
