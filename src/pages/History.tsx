import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import arrow from "../assets/Icon/arrow.svg";

export default function History() {
  const [activeTab, setActiveTab] = useState("emergency");
  const { username } = useAuth();
  return (
    <main className="px-5 md:px-20 flex flex-col gap-8 md:gap-10 min-h-screen py-6 md:py-10">
      {/* Arrow */}
      <Link to="/" className="w-10 shrink-0">
        <img src={arrow} alt="Arrow" className="p-1 w-10 h-10" />
      </Link>

      {/* Heading */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Riwayat Penggunaan dari {username}!
        </h1>
        <p className="text-sm md:text-base mt-2">
          Pastikan kamu cek dengan detail ya
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex w-full sm:w-3/4 md:w-1/2 mx-auto justify-center gap-2 md:gap-3">
        <button
          onClick={() => setActiveTab("emergency")}
          className={`w-full rounded-md py-2 px-2 text-sm font-semibold border border-[#183B56] md:text-base transition-colors hover:cursor-pointer ${
            activeTab === "emergency"
              ? "bg-[#183B56] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Emergency/Darurat
        </button>

        <button
          onClick={() => setActiveTab("analytic")}
          className={`w-full rounded-md py-2 px-2 text-sm font-semibold border border-[#183B56] md:text-base transition-colors hover:cursor-pointer ${
            activeTab === "analytic"
              ? "bg-[#183B56] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Analisis
        </button>
      </div>

      {/* Content */}
      <div className="w-full min-h-[300px]">
        {activeTab === "emergency" && (
          <div className="bg-[#F5F7FA] shadow-lg rounded-b-lg min-h-[300px]">
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                {/* Header */}
                <div className="grid grid-cols-5 border-b text-center font-semibold text-sm md:text-base">
                  <div className="py-3 px-2">Tanggal</div>
                  <div className="py-3 px-2">Kasus Darurat</div>
                  <div className="py-3 px-2">Data Masukan</div>
                  <div className="py-3 px-2">Kronologi</div>
                  <div className="py-3 px-2">File Laporan</div>
                </div>

                {/* Data riwayat nantinya */}
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytic" && (
          <div className="bg-[#F5F7FA] shadow-lg rounded-b-lg min-h-[300px]">
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                {/* Header */}
                <div className="grid grid-cols-5 border-b text-center font-semibold text-sm md:text-base">
                  <div className="py-3 px-2">Tanggal</div>
                  <div className="py-3 px-2">Tipe Analisis</div>
                  <div className="py-3 px-2">Data Masukan</div>
                  <div className="py-3 px-2">Hasil</div>
                  <div className="py-3 px-2">Dokumen Analisis</div>
                </div>

                {/* Data riwayat nantinya */}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
