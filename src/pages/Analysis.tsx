import { Link } from "react-router-dom";

import AnalysisHook from "../components/AnalysisHook";
import Phone from "../assets/Analysis/phone.png";
import Chat from "../assets/Analysis/chat.png";
import Screenshot from "../assets/Analysis/screenshot.png";

export default function Analysis() {
  return (
    <div className="mx-auto w-full max-w-[1160px] px-4 py-20 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div id="hero-section" className="mt-10 sm:mt-15">
        <AnalysisHook />
      </div>

      <div
        id="body-section"
        className="mt-8 flex w-full flex-col items-center rounded-[28px] bg-white/50 px-4 py-8 shadow-xl sm:mt-10 sm:rounded-[40px] sm:px-6 sm:py-10 lg:rounded-[50px] lg:px-10"
      >
        <div id="title" className="my-4 text-center sm:my-6">
          <h1 className="text-xl font-bold text-black sm:text-2xl lg:text-[25px]">
            Apa yang sedang kamu alami?
          </h1>
          <p className="mx-auto mt-2 max-w-2xl px-2 text-sm text-[#667085] sm:text-base">
            Pilih kondisi yang ingin kamu analisis sesuai dengan apa yang kamu
            alami.
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-12 lg:flex-row lg:items-stretch lg:gap-8 xl:gap-12">
          <div className="relative flex w-full max-w-[320px] flex-1 flex-col items-center">
            <div className="relative z-10 -mb-8 flex h-16 w-16 items-center justify-center rounded-xl bg-[#a6d7f5] shadow-lg lg:-mb-10 lg:h-20 lg:w-20 lg:rounded-2xl">
              <img
                src={Phone}
                alt="Ikon telepon"
                className="h-8 w-8 object-contain lg:h-10 lg:w-10"
              />
            </div>

            <div className="relative flex w-full flex-1 flex-col items-center justify-between gap-6 rounded-[15px] bg-[#47a8e4] px-6 pb-6 pt-16 sm:px-8 lg:gap-8 lg:px-10 lg:pt-20">
              <p className="text-center text-sm font-bold text-white sm:text-base">
                Periksa riwayat dan indikasi penipuan dari nomor telepon tidak
                dikenal
              </p>
              <Link
                to="/analysis/phone"
                className="whitespace-nowrap rounded-full bg-[#a6d7f5] px-5 py-2 text-sm text-[#2e4a5c] transition hover:bg-[#5E83A5] hover:text-white sm:text-base"
              >
                Selanjutnya
              </Link>
            </div>
          </div>
          <div className="relative flex w-full max-w-[320px] flex-1 flex-col items-center">
            <div className="relative z-10 -mb-8 flex h-16 w-16 items-center justify-center rounded-xl bg-[#a6d7f5] shadow-lg lg:-mb-10 lg:h-20 lg:w-20 lg:rounded-2xl">
              <img
                src={Chat}
                alt="Ikon chat"
                className="h-8 w-8 object-contain lg:h-10 lg:w-10"
              />
            </div>

            <div className="relative flex w-full flex-1 flex-col items-center justify-between gap-6 rounded-[15px] bg-[#47a8e4] px-6 pb-6 pt-16 sm:px-8 lg:gap-8 lg:px-10 lg:pt-20">
              <p className="text-center text-sm font-bold text-white sm:text-base">
                Periksa riwayat dan indikasi penipuan dari pesan chat yang
                mencurigakan
              </p>
              <Link
                to="/analysis/chat"
                className="whitespace-nowrap rounded-full bg-[#a6d7f5] px-5 py-2 text-sm text-[#2e4a5c] transition hover:bg-[#5E83A5] hover:text-white sm:text-base"
              >
                Selanjutnya
              </Link>
            </div>
          </div>
          <div className="relative flex w-full max-w-[320px] flex-1 flex-col items-center">
            <div className="relative z-10 -mb-8 flex h-16 w-16 items-center justify-center rounded-xl bg-[#a6d7f5] shadow-lg lg:-mb-10 lg:h-20 lg:w-20 lg:rounded-2xl">
              <img
                src={Screenshot}
                alt="Ikon tangkapan layar"
                className="h-8 w-8 object-contain lg:h-10 lg:w-10"
              />
            </div>

            <div className="relative flex w-full flex-1 flex-col items-center justify-between gap-6 rounded-[15px] bg-[#47a8e4] px-6 pb-6 pt-16 sm:px-8 lg:gap-8 lg:px-10 lg:pt-20">
              <p className="text-center text-sm font-bold text-white sm:text-base">
                Periksa riwayat dan indikasi penipuan dari tangkapan layar yang
                kamu kirim
              </p>
              <Link
                to="/analysis/screenshot"
                className="whitespace-nowrap rounded-full bg-[#a6d7f5] px-5 py-2 text-sm text-[#2e4a5c] transition hover:bg-[#5E83A5] hover:text-white sm:text-base"
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
