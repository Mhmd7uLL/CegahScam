import { Link } from "react-router-dom";
import AnalysisHook from "../../components/AnalysisHook";

export default function Phone() {
  return (
    <div className="mx-auto py-20">
      <div
        id="hero-section"
        className="flex flex-col justify-center w-290 h-70 mt-15"
      >
        <AnalysisHook />
        <div className="flex flex-row justify-around items-center mx-auto bg-white/32 shadow-xl rounded-[50px] w-200 h-40 my-5">
          <div className="flex flex-col gap-2 items-center text-center">
            <p className="bg-[#667085] w-6 h-6 text-white rounded-full">1</p>
            <p className="text-[#667085]">Pilih Kasus</p>
          </div>
          ----
          <div className="flex flex-col gap-2 items-center text-center">
            <p className="bg-[#5E83A5] w-6 h-6 text-white rounded-full">2</p>
            <p className="text-[#5E83A5] font-bold">Isi Data</p>
          </div>
          ----
          <div className="flex flex-col gap-2 items-center text-center">
            <p className="bg-[#667085] w-6 h-6 text-white rounded-full">3</p>
            <p className="text-[#667085]">Hasil Laporan</p>
          </div>
        </div>
      </div>

      <div
        id="body-input"
        className="flex flex-col bg-white/50 shadow-xl w-290 h-auto mt-10 rounded-[50px]"
      >
        <div id="title" className="text-center my-10">
          <h1 className="font-bold text-black text-[25px]">
            Masukkan nomor telepon yang ingin diperiksa
          </h1>
        </div>
        <form className="mx-auto flex w-full max-w-220 flex-col gap-3 text-[#26384A]">
          <fieldset id="nomor-telepon" className="flex flex-col gap-1">
            <legend className="flex items-center gap-2 font-semibold mb-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#52789A] text-white">
                1
              </span>
              Nomor Telepon
            </legend>
            <input
              type="tel"
              name="nomorTelepon"
              placeholder="Contoh: 0812 3456 7890"
              className="ml-7 w-[calc(100%-1.75rem)] rounded-lg border-[0.5px] px-2 py-2"
            />
          </fieldset>

          <Link
            to="/analysis/result"
            className="text-center my-10 mx-auto w-4/5 bg-white py-2 rounded-full shadow-xl font-bold text-[#5E83A5] hover:bg-[#5E83A5] hover:text-white hover:cursor-pointer"
          >
            Kirim Laporan
          </Link>
        </form>
      </div>
    </div>
  );
}
