import { Link } from "react-router-dom";
import AnalysisHook from "../../components/AnalysisHook";

export default function Phone() {
  return (
    <div className="mx-auto w-full pb-20 pt-32 lg:pt-36">
      <div
        id="hero-section"
        className="mx-auto flex w-full max-w-[1160px] flex-col justify-center px-4"
      >
        <AnalysisHook />
        <div className="mx-auto my-6 flex w-full max-w-[800px] items-center justify-between gap-2 rounded-[24px] bg-white/40 px-3 py-4 shadow-xl sm:gap-4 sm:rounded-[50px] sm:px-8">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="flex h-6 w-6 items-center justify-center rounded-full bg-[#667085] text-[12px] text-white">
              1
            </p>
            <p className="text-[11px] text-[#667085] sm:text-sm">Pilih Kasus</p>
          </div>
          <div className="h-px flex-1 bg-[#667085]/50" />
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5E83A5] text-[12px] text-white">
              2
            </p>
            <p className="text-[11px] font-bold text-[#5E83A5] sm:text-sm">
              Isi Data
            </p>
          </div>
          <div className="h-px flex-1 bg-[#667085]/50" />
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
        id="body-input"
        className="reveal mx-auto mt-8 flex w-full max-w-[1160px] flex-col rounded-[30px] bg-white/50 px-4 py-2 shadow-xl sm:rounded-[40px] sm:px-6 lg:mt-10 lg:rounded-[50px]"
      >
        <div id="title" className="my-6 text-center sm:my-10">
          <h1 className="text-[23px] font-bold text-black sm:text-[25px]">
            Masukkan nomor telepon yang ingin diperiksa
          </h1>
        </div>
        <form className="mx-auto flex w-full max-w-[720px] flex-col gap-3 pb-6 text-[#26384A]">
          <fieldset id="nomor-telepon" className="flex flex-col gap-1">
            <legend className="mb-2 flex items-center gap-2 font-semibold">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#52789A] text-white">
                1
              </span>
              Nomor Telepon
            </legend>
            <input
              type="tel"
              name="nomorTelepon"
              placeholder="Contoh: 0812 3456 7890"
              className="ml-7 w-[calc(100%-1.75rem)] rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-[#52789A]"
            />
          </fieldset>

          <Link
            to="/analysis/resultphone"
            className="mx-auto my-8 w-4/5 rounded-full bg-white py-2 text-center font-bold text-[#5E83A5] shadow-xl transition duration-200 hover:bg-[#5E83A5] hover:text-white sm:my-10"
          >
            Kirim Laporan
          </Link>
        </form>
      </div>
    </div>
  );
}
