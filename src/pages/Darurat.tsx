import { Link } from "react-router-dom"

import robot1 from "../assets/Darurat/robot1.webp"
import robot2 from "../assets/Darurat/robot2.webp"
import EmergencyHook from "../components/EmergencyHook";

export default function Darurat() {
  return (
    <div className="mx-auto py-20">
      <div
        id="hero-section"
        className="flex flex-col justify-center w-290 h-80 mt-15"
      >
        <EmergencyHook />
        <div className="flex flex-row justify-around items-center mx-auto shadow-xl rounded-[50px] w-200 h-80 my-5">
          <div className="flex flex-col gap-2 items-center text-center">
            <p className="bg-[#5E83A5] w-6 h-6 text-white rounded-full">1</p>
            <p className="text-[#5E83A5] font-bold">Pilih kasus</p>
          </div>
          ----
          <div className="flex flex-col gap-2 items-center text-center">
            <p className="bg-[#667085] w-6 h-6 text-white rounded-full">2</p>
            <p className="text-[#667085]">Input Data</p>
          </div>
          ----
          <div className="flex flex-col gap-2 items-center text-center">
            <p className="bg-[#667085] w-6 h-6 text-white rounded-full">3</p>
            <p className="text-[#667085]">Hasil Laporan</p>
          </div>
        </div>
      </div>

      <div
        id="body-section"
        className="flex flex-col items-center bg-white/50 shadow-xl w-290 h-150 mt-10 rounded-[50px]"
      >
        <div id="title" className="text-center my-10">
          <h1 className="font-bold text-black text-[25px]">Apa yang sedang terjadi?</h1>
          <p>Pilih kondisi sesuai yang kamu alami.</p>
        </div>
        
        <div className="flex flex-row gap-25">
            <div className="relative flex flex-col items-center pt-35">
                <img src={robot1} className="absolute top-0 z-10 w-50 h-50 object-contain"/>
                <div className="relative flex flex-col gap-8 justify-center items-center bg-[#1A56DB] w-70 px-10 pt-20 pb-6 rounded-[15px]">
                    <p className="text-white text-center font-bold">Apakah kamu mengirim data pribadi kamu ke orang lain?</p>
                    <Link to="/daruratData" className="bg-white text-[#1A56DB] py-2 px-5 rounded-full hover:bg-[#5E83A5] hover:text-white hover:cursor-pointer">Selanjutnya</Link>
                </div>
            </div>
            <div className="relative flex flex-col items-center pt-35">
                <img src={robot2} className="absolute top-0 z-10 w-50 h-50 object-contain"/>
                <div className="relative flex flex-col gap-8 justify-center items-center bg-[#1A56DB] w-70 px-10 pt-20 pb-6 rounded-[15px]">
                    <p className="text-white text-center font-bold">Apakah kamu mengirim data pribadi kamu ke orang lain?</p>
                    <Link to="/daruratFinansial" className="bg-white text-[#1A56DB] py-2 px-5 rounded-full hover:bg-[#5E83A5] hover:text-white hover:cursor-pointer">Selanjutnya</Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
