import { Link } from "react-router-dom";
import { useState } from "react";

import body1 from "../assets/Home/body-1.webp";
import body2 from "../assets/Home/body-2.webp";
import heroIcon from "../assets/Home/heroicon.webp";
import cursor from "../assets/Icon/Cursor.svg";
import files from "../assets/Icon/Files.svg";
import handHeart from "../assets/Icon/HandHeart.svg";
import Robot from "../components/Robot";

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState("FAQ1");

  return (
    <div className="flex w-full flex-col items-center gap-14 px-4 pb-20 pt-32 sm:gap-20 lg:pt-36">
      <div
        id="Hero-section"
        className="reveal relative flex min-h-[calc(100dvh_-_11rem)] w-full max-w-[1160px] items-center justify-center lg:min-h-[calc(100dvh_-_12rem)]"
      >
        <div className="flex w-full flex-col items-center justify-between gap-8 rounded-[32px] bg-white/50 px-5 py-8 shadow-md sm:rounded-[44px] sm:px-8 lg:min-h-120 lg:flex-row lg:gap-0 lg:px-5 lg:py-3 lg:ps-16 lg:pr-10 xl:ps-28">
          <div className="flex flex-col items-center gap-6 text-center sm:gap-8 lg:items-start lg:gap-14 lg:text-left">
            <div className="flex flex-col">
              <div className="text-[26px] font-bold leading-tight text-[#446685] sm:text-[32px] lg:text-[40px]">
                <p>Mau Mencegah?</p>
                <p>Lagi Curiga?</p>
                <p>Atau Sudah Kena?</p>
              </div>
              <p className="mt-2 text-[12px] text-[#3F4E5E] sm:text-[14px] lg:text-[15px]">
                Dari rasa ragu sampai tahu harus berbuat apa
              </p>
            </div>
            <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to="/emergency"
                className="rounded-2xl bg-[#ADCEFF] px-6 py-2.5 text-center text-sm font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#85B6FF] hover:shadow-xl sm:text-base"
              >
                Darurat
              </Link>
              <Link
                to="/analysis"
                className="rounded-2xl bg-[#ADCEFF] px-6 py-2.5 text-center text-sm font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#85B6FF] hover:shadow-xl sm:text-base"
              >
                Analisis
              </Link>
              <Link
                to="/education"
                className="rounded-2xl bg-[#ADCEFF] px-6 py-2.5 text-center text-sm font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#85B6FF] hover:shadow-xl sm:text-base"
              >
                Edukasi
              </Link>
            </div>
          </div>
          <Robot
            src={heroIcon}
            alt="Ilustrasi CegahScam"
            motion="float"
            interactive
            className="w-45 object-contain sm:w-52 lg:w-auto"
          />
        </div>
      </div>

      <div
        id="body1-section"
        className="reveal w-full max-w-6xl lg:min-h-120"
      >
        <div className="flex flex-col-reverse items-center gap-8 lg:flex-row lg:justify-center lg:gap-16">
          <Robot
            src={body1}
            alt="Ilustrasi penipuan"
            motion="sway"
            interactive
            className="w-45 object-contain sm:w-[340px]"
          />
          <div className="flex flex-col items-center justify-center gap-8 lg:items-start lg:gap-10">
            <div className="text-center lg:text-left">
              <h1 className="text-[24px] font-bold leading-tight text-[#446685] sm:text-[32px] lg:text-[40px]">
                Apakah kamu<br></br>terkena penipuan?
              </h1>
              <p className="mt-2 text-[14px] text-[#3F4E5E] sm:text-[15px]">
                Kamu bisa langsung laporkan<br></br>ke pihak berwajib
              </p>
            </div>
            <Link
              to="/emergency"
              className="w-45 rounded-2xl bg-[#ADCEFF] px-6 py-2.5 text-center font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#85B6FF] hover:shadow-xl lg:w-auto"
            >
              Laporkan
            </Link>
          </div>
        </div>
      </div>

      <div
        id="body2-section"
        className="reveal w-full max-w-6xl lg:min-h-120"
      >
        <div className="flex flex-col items-center justify-center gap-8 sm:gap-12">
          <h1 className="text-center text-[24px] font-bold text-[#446685] sm:text-[32px] lg:text-[40px]">
            Langkah Pelaporan
          </h1>
          <div className="grid w-full gap-4 sm:grid-cols-3 sm:gap-6 lg:gap-10">
            <div className="flex w-full flex-col items-center gap-3 rounded-[25px] bg-[#446685] py-5 transition duration-200 hover:-translate-y-1 hover:shadow-xl">
              <p className="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-white text-sm font-bold text-[#446685]">
                1
              </p>
              <img src={cursor} alt="" className="h-10 w-10" />
              <p className="font-bold text-white">Pilih Kasus</p>
            </div>
            <div className="flex w-full flex-col items-center gap-3 rounded-[25px] bg-[#446685] py-5 transition duration-200 hover:-translate-y-1 hover:shadow-xl">
              <p className="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-white text-sm font-bold text-[#446685]">
                2
              </p>
              <img src={handHeart} alt="" className="h-10 w-10" />
              <p className="font-bold text-white">Penanganan</p>
            </div>
            <div className="flex w-full flex-col items-center gap-3 rounded-[25px] bg-[#446685] py-5 transition duration-200 hover:-translate-y-1 hover:shadow-xl">
              <p className="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-white text-sm font-bold text-[#446685]">
                3
              </p>
              <img src={files} alt="" className="h-10 w-10" />
              <p className="font-bold text-white">Hasil Laporan</p>
            </div>
          </div>
        </div>
      </div>

      <div
        id="body3-section"
        className="reveal w-full max-w-6xl lg:min-h-120"
      >
        <div className="flex flex-col gap-8 lg:gap-10">
          <h1 className="text-center text-[24px] font-bold text-[#446685] sm:text-[32px] lg:mb-12 lg:text-[40px]">
            Ingin periksa atau Belajar dulu?
          </h1>
          <div className="relative mx-auto flex w-full max-w-[900px] flex-col items-center gap-8 md:min-h-[500px] md:block md:gap-6">
            <div className="pointer-events-none absolute left-1/2 top-[35px] hidden aspect-square w-[430px] -translate-x-1/2 rounded-full border border-[#ADCEFF]/60 bg-[#ADCEFF]/10 md:block">
              <div className="absolute inset-[25px] rounded-full border border-[#ADCEFF]/50 bg-[#ADCEFF]/10">
                <div className="absolute inset-[40px] rounded-full border border-[#ADCEFF]/40 bg-[#ADCEFF]/10" />
              </div>
            </div>

            <div className="relative z-20 flex w-full max-w-[280px] flex-col gap-3 md:absolute md:left-0 md:top-0 md:w-60">
              <div className="flex h-16 items-center justify-center rounded-[25px] bg-white text-[22px] font-bold text-[#5E83A5] shadow-sm sm:h-20 sm:text-[25px]">
                PERIKSA
              </div>

              <div className="flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-[25px] bg-white px-6 py-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                <p className="text-center text-sm font-bold">
                  Cek pesan, link, nomor, atau gambar untuk mengetahui apakah
                  terlihat mencurigakan.
                </p>

                <Link
                  to="/analysis"
                  className="w-35 rounded-[40px] bg-[#47a8e4] py-2 text-center font-bold text-white transition duration-200 hover:bg-[#85B6FF]"
                >
                  Analisis
                </Link>
              </div>
            </div>

            <div className="relative z-10 md:absolute md:left-1/2 md:top-[40px] md:-translate-x-1/2">
              <Robot
                src={body2}
                alt="Maskot CegahScam"
                motion="bob"
                interactive
                className="h-45 w-45 object-contain sm:h-72 sm:w-72 md:h-[320px] md:w-[320px]"
              />
            </div>

            <div className="relative z-20 flex w-full max-w-[280px] flex-col gap-3 md:absolute md:right-0 md:top-[210px] md:w-60">
              <div className="flex h-16 items-center justify-center rounded-[25px] bg-white text-[22px] font-bold text-[#5E83A5] shadow-sm sm:h-20 sm:text-[25px]">
                BELAJAR
              </div>

              <div className="flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-[25px] bg-white px-6 py-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                <p className="text-center text-sm font-bold">
                  Pelajari berbagai modus penipuan yang sering terjadi dan tips
                  untuk melindungi diri.
                </p>

                <Link
                  to="/education"
                  className="w-35 rounded-[40px] bg-[#47a8e4] py-2 text-center font-bold text-white transition duration-200 hover:bg-[#85B6FF]"
                >
                  Edukasi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="body4-section"
        className="reveal w-full max-w-6xl lg:min-h-120"
      >
        <div className="flex flex-col items-center justify-center gap-8 sm:gap-10">
          <h1 className="text-center text-[24px] font-bold text-[#446685] sm:text-[32px] lg:text-[40px]">
            Pertanyaan yang sering diajukan
          </h1>
          <div className="flex w-full flex-col items-center justify-center gap-5 lg:flex-row lg:items-start">
            <div className="flex w-full max-w-[320px] flex-col">
              <button
                onClick={() => setOpenFAQ("FAQ1")}
                className={`flex w-full flex-row rounded-t-[15px] bg-white px-5 py-3 text-left transition-colors duration-200 ${
                  openFAQ === "FAQ1"
                    ? "font-bold"
                    : "rounded-[15px] font-normal"
                }`}
              >
                <p className="pe-5 font-bold text-[#1A56DB]">
                  {openFAQ === "FAQ1" ? "-" : "+"}
                </p>
                <h1 className="text-[#1A56DB]">Apa itu CegahScam?</h1>
              </button>
              {openFAQ === "FAQ1" && (
                <div className="w-full rounded-b-[15px] bg-white px-5 py-3 animate-fade-in">
                  CegahScam adalah platform yang membantu kamu mengenali,
                  menganalisis, dan menangani risiko penipuan digital.
                </div>
              )}

              <button
                onClick={() => setOpenFAQ("FAQ2")}
                className={`mt-5 flex w-full flex-row rounded-t-[15px] bg-white px-5 py-3 text-left transition-colors duration-200 ${
                  openFAQ === "FAQ2"
                    ? "font-bold"
                    : "rounded-[15px] font-normal"
                }`}
              >
                <p className="pe-5 font-bold text-[#1A56DB]">
                  {openFAQ === "FAQ2" ? "-" : "+"}
                </p>
                <h1 className="text-[#1A56DB]">
                  Apakah CegahScam langsung melaporkan kasus saya?
                </h1>
              </button>
              {openFAQ === "FAQ2" && (
                <div className="w-full rounded-b-[15px] bg-white px-5 py-3 animate-fade-in">
                  Tidak. CegahScam membantumu menyusun kronologi dan langkah
                  penanganan, lalu kamu sendiri yang melapor ke instansi resmi
                  yang disarankan.
                </div>
              )}
            </div>

            <div className="flex w-full max-w-[320px] flex-col">
              <button
                onClick={() => setOpenFAQ("FAQ3")}
                className={`flex w-full flex-row rounded-t-[15px] bg-white px-5 py-3 text-left transition-colors duration-200 ${
                  openFAQ === "FAQ3"
                    ? "font-bold"
                    : "rounded-[15px] font-normal"
                }`}
              >
                <p className="pe-5 font-bold text-[#1A56DB]">
                  {openFAQ === "FAQ3" ? "-" : "+"}
                </p>
                <h1 className="text-[#1A56DB]">
                  CegahScam bisa digunakan untuk kasus apa saja?
                </h1>
              </button>
              {openFAQ === "FAQ3" && (
                <div className="w-full rounded-b-[15px] bg-white px-5 py-3 animate-fade-in">
                  Penipuan jual beli online, investasi bodong, pinjaman ilegal,
                  pembocoran data pribadi, pembajakan akun, sampai penipuan
                  lewat telepon dan chat.
                </div>
              )}
              <button
                onClick={() => setOpenFAQ("FAQ4")}
                className={`mt-5 flex w-full flex-row rounded-t-[15px] bg-white px-5 py-3 text-left transition-colors duration-200 ${
                  openFAQ === "FAQ4"
                    ? "font-bold"
                    : "rounded-[15px] font-normal"
                }`}
              >
                <p className="pe-5 font-bold text-[#1A56DB]">
                  {openFAQ === "FAQ4" ? "-" : "+"}
                </p>
                <h1 className="text-[#1A56DB]">
                  Apa saja yang bisa dianalisis?
                </h1>
              </button>
              {openFAQ === "FAQ4" && (
                <div className="w-full rounded-b-[15px] bg-white px-5 py-3 animate-fade-in">
                  Nomor telepon, pesan chat, tautan mencurigakan, serta
                  tangkapan layar percakapan atau bukti transfer.
                </div>
              )}
              <button
                onClick={() => setOpenFAQ("FAQ5")}
                className={`mt-5 flex w-full flex-row rounded-t-[15px] bg-white px-5 py-3 text-left transition-colors duration-200 ${
                  openFAQ === "FAQ5"
                    ? "font-bold"
                    : "rounded-[15px] font-normal"
                }`}
              >
                <p className="pe-5 font-bold text-[#1A56DB]">
                  {openFAQ === "FAQ5" ? "-" : "+"}
                </p>
                <h1 className="text-[#1A56DB]">
                  Kapan saya harus menggunakan Darurat?
                </h1>
              </button>
              {openFAQ === "FAQ5" && (
                <div className="w-full rounded-b-[15px] bg-white px-5 py-3 animate-fade-in">
                  Gunakan menu Darurat jika kamu sudah mengalami kerugian atau
                  data pribadimu bocor, supaya langkah penanganan bisa segera
                  dilakukan.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
