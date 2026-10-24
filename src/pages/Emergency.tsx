import { Link } from "react-router-dom";

import robot1 from "../assets/Emergency/robot1.webp";
import robot2 from "../assets/Emergency/robot2.webp";
import EmergencyHook from "../components/EmergencyHook";

export default function Emergency() {
  return (
    <div className="mx-auto py-20">
      <div
        id="hero-section"
        className="mx-auto mt-15 flex min-h-80 w-full max-w-6xl flex-col justify-center px-4"
      >
        <EmergencyHook />
        <div className="mx-auto my-5 flex h-auto min-h-40 w-full max-w-3xl flex-row items-center justify-around gap-2 rounded-[30px] bg-white/32 px-3 py-5 shadow-xl">
          <div className="flex flex-col gap-2 items-center text-center">
            <p className="bg-[#5E83A5] w-6 h-6 text-white rounded-full">1</p>
            <p className="text-[#5E83A5] font-bold">Pilih Kasus</p>
          </div>
          <div className="h-px flex-1 bg-[#667085]"></div>
          <div className="flex flex-col gap-2 items-center text-center">
            <p className="bg-[#667085] w-6 h-6 text-white rounded-full">2</p>
            <p className="text-[#667085]">Isi Data</p>
          </div>
          <div className="h-px flex-1 bg-[#667085]"></div>
          <div className="flex flex-col gap-2 items-center text-center">
            <p className="bg-[#667085] w-6 h-6 text-white rounded-full">3</p>
            <p className="text-[#667085]">Hasil Laporan</p>
          </div>
        </div>
      </div>

      <div
        id="body-section"
        className="mx-auto mt-10 flex min-h-[600px] w-full max-w-6xl flex-col items-center rounded-[30px] bg-white/50 px-4 py-6 shadow-xl lg:rounded-[50px]"
      >
        <div id="title" className="text-center my-10">
          <h1 className="font-bold text-black text-[25px]">
            Apa yang sedang terjadi?
          </h1>
          <p>Pilih kondisi sesuai yang kamu alami.</p>
        </div>

        <div className="flex w-full flex-col items-center gap-16 md:flex-row md:items-start md:justify-center md:gap-5">
          <div className="relative flex w-full max-w-70 flex-col items-center pt-35">
            <img
              src={robot1}
              className="absolute top-0 z-10 w-50 h-50 object-contain"
            />
            <div className="relative flex h-[248px] w-full flex-col items-center justify-between rounded-[15px] bg-[#47a8e4] px-6 pb-6 pt-20">
              <p className="text-center font-bold text-white">
                Apakah data pribadi atau akun kamu bocor ke orang lain?
              </p>
              <Link
                to="/emergency/data"
                className="bg-white text-[#1A56DB] py-2 px-5 rounded-full hover:bg-[#5E83A5] hover:text-white hover:cursor-pointer"
              >
                Selanjutnya
              </Link>
            </div>
          </div>
          <div className="relative flex w-full max-w-70 flex-col items-center pt-35">
            <img
              src={robot2}
              className="absolute top-0 z-10 w-50 h-50 object-contain"
            />
            <div className="relative flex h-[248px] w-full flex-col items-center justify-between rounded-[15px] bg-[#47a8e4] px-6 pb-6 pt-20">
              <p className="text-center font-bold text-white">
                Apakah kamu kehilangan uang karena penipuan?
              </p>
              <Link
                to="/emergency/financial"
                className="bg-white text-[#6a7a9e] py-2 px-5 rounded-full hover:bg-[#5E83A5] hover:text-white hover:cursor-pointer"
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
