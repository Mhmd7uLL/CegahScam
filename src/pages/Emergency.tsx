import { Link } from "react-router-dom";

import robot1 from "../assets/Emergency/robot1.webp";
import robot2 from "../assets/Emergency/robot2.webp";
import EmergencyHook from "../components/EmergencyHook";

export default function Emergency() {
  return (
    <div className="mx-auto w-full pb-20 pt-32 lg:pt-36">
      <div
        id="hero-section"
        className="mx-auto flex w-full max-w-6xl flex-col justify-center px-4"
      >
        <EmergencyHook />
        <div className="mx-auto my-6 flex w-full max-w-[800px] items-center justify-between gap-2 rounded-[24px] bg-white/40 px-3 py-4 shadow-xl sm:gap-4 sm:rounded-[50px] sm:px-8">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5E83A5] text-[12px] text-white">
              1
            </p>
            <p className="text-[11px] font-bold text-[#5E83A5] sm:text-sm">
              Pilih Kasus
            </p>
          </div>
          <div className="h-px flex-1 bg-[#667085]/50"></div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="flex h-6 w-6 items-center justify-center rounded-full bg-[#667085] text-[12px] text-white">
              2
            </p>
            <p className="text-[11px] text-[#667085] sm:text-sm">Isi Data</p>
          </div>
          <div className="h-px flex-1 bg-[#667085]/50"></div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="flex h-6 w-6 items-center justify-center rounded-full bg-[#667085] text-[12px] text-white">
              3
            </p>
            <p className="text-[11px] text-[#667085] sm:text-sm">
              Hasil Laporan
            </p>
          </div>
        </div>
      </div>

      <div
        id="body-section"
        className="reveal mx-auto mt-8 flex w-full max-w-6xl flex-col items-center rounded-[30px] bg-white/50 px-4 py-8 shadow-xl sm:px-6 lg:mt-10 lg:min-h-150 lg:rounded-[50px]"
      >
        <div id="title" className="my-6 text-center sm:my-10">
          <h1 className="text-[23px] font-bold text-black sm:text-[25px]">
            Apa yang sedang terjadi?
          </h1>
          <p className="mt-1 text-sm text-[#3F4E5E] sm:text-base">
            Pilih kondisi sesuai yang kamu alami.
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-12 md:flex-row md:items-start md:justify-center md:gap-5 lg:gap-10">
          <div className="relative flex w-full max-w-[280px] flex-col items-center pt-30 sm:pt-35">
            <img
              src={robot1}
              alt="Maskot data bocor"
              className="absolute top-0 z-10 h-45 w-45 animate-float object-contain sm:h-50 sm:w-50"
            />
            <div className="relative flex h-auto min-h-60 w-full flex-col items-center justify-between gap-5 rounded-[15px] bg-[#47a8e4] px-6 pb-6 pt-20 shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-xl">
              <p className="text-center font-bold text-white">
                Apakah data pribadi atau akun kamu bocor ke orang lain?
              </p>
              <Link
                to="/emergency/data"
                className="rounded-full bg-white px-5 py-2 text-[#1A56DB] transition hover:bg-[#5E83A5] hover:text-white"
              >
                Selanjutnya
              </Link>
            </div>
          </div>
          <div className="relative flex w-full max-w-[280px] flex-col items-center pt-30 sm:pt-35">
            <img
              src={robot2}
              alt="Maskot kehilangan uang"
              className="absolute top-0 z-10 h-45 w-45 animate-float-slow object-contain sm:h-50 sm:w-50"
            />
            <div className="relative flex h-auto min-h-60 w-full flex-col items-center justify-between gap-5 rounded-[15px] bg-[#47a8e4] px-6 pb-6 pt-20 shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-xl">
              <p className="text-center font-bold text-white">
                Apakah kamu kehilangan uang karena penipuan?
              </p>
              <Link
                to="/emergency/financial"
                className="rounded-full bg-white px-5 py-2 text-[#6a7a9e] transition hover:bg-[#5E83A5] hover:text-white"
              >
                Selanjutnya
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
