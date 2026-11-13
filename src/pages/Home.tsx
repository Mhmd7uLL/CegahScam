import { Link } from "react-router-dom";
import { useState } from "react";

import body1 from "../assets/Home/body-1.webp";
import body2 from "../assets/Home/body-2.webp";
import heroIcon from "../assets/Home/heroicon.webp";
import whyRobot from "../assets/Education/edu-robot.webp";
import cursor from "../assets/Icon/Cursor.svg";
import files from "../assets/Icon/Files.svg";
import handHeart from "../assets/Icon/HandHeart.svg";
import Robot from "../components/Robot";

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState("FAQ1");

  return (
    <div className="flex w-full flex-col items-center gap-14 px-4 pb-20 pt-24 sm:gap-20 lg:pt-28">
      <div
        id="Hero-section"
        className="reveal relative flex w-full max-w-[1160px] items-center justify-center lg:min-h-[calc(100dvh-10rem)]"
      >
        <div className="grid w-full gap-6 rounded-[32px] bg-white/50 px-5 py-8 shadow-md sm:gap-8 sm:rounded-[44px] sm:px-8 lg:min-h-[420px] lg:grid-cols-[1fr_auto] lg:content-center lg:items-center lg:gap-x-0 lg:gap-y-14 lg:px-5 lg:py-3 lg:ps-16 lg:pr-10 xl:ps-28">
          <div className="order-1 text-center lg:col-start-1 lg:row-start-1 lg:text-left">
            <div className="text-[26px] font-bold leading-tight text-[#446685] sm:text-[32px] lg:text-[40px]">
              <p>Mau Mencegah?</p>
              <p>Lagi Curiga?</p>
              <p>Atau Sudah Kena?</p>
            </div>
            <p className="mt-2 text-[12px] text-[#3F4E5E] sm:text-[14px] lg:text-[15px]">
              Dari rasa ragu sampai tahu harus berbuat apa
            </p>
          </div>

          <Robot
            src={heroIcon}
            alt="Ilustrasi CegahScam"
            motion="float"
            interactive
            className="order-2 mx-auto w-45 object-contain sm:w-52 lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-[clamp(300px,55vh,500px)] lg:w-auto lg:justify-self-end"
          />

          <div className="order-3 grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto sm:flex-row sm:justify-center lg:col-start-1 lg:row-start-2 lg:justify-start">
            <Link
              to="/analysis"
              className="rounded-2xl bg-[#47a8e4] px-6 py-2.5 text-center text-sm font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#85B6FF] hover:shadow-xl sm:text-base"
            >
              Analisis
            </Link>
            <Link
              to="/education"
              className="rounded-2xl bg-[#47a8e4] px-6 py-2.5 text-center text-sm font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#85B6FF] hover:shadow-xl sm:text-base"
            >
              Edukasi
            </Link>
            <Link
              to="/emergency"
              className="col-span-2 w-[calc(50%_-_0.375rem)] justify-self-center rounded-2xl bg-[#47a8e4] px-6 py-2.5 text-center text-sm font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#85B6FF] hover:shadow-xl sm:order-first sm:w-auto sm:text-base"
            >
              Darurat
            </Link>
          </div>
        </div>
      </div>

      <div
        id="body1-section"
        className="reveal w-full max-w-6xl lg:min-h-120"
      >
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-16">
          <div className="contents lg:flex lg:flex-col lg:items-start lg:gap-10">
            <div className="order-1 text-center lg:order-none lg:text-left">
              <h1 className="text-[24px] font-bold leading-tight text-[#446685] sm:text-[32px] lg:text-[40px]">
                Apakah kamu<br></br>terkena penipuan?
              </h1>
              <p className="mt-2 text-[14px] text-[#3F4E5E] sm:text-[15px]">
                Kamu bisa langsung laporkan<br></br>ke pihak berwajib
              </p>
            </div>
            <Link
              to="/emergency"
              className="order-3 w-45 rounded-2xl bg-[#47a8e4] px-6 py-2.5 text-center font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#85B6FF] hover:shadow-xl lg:order-none lg:w-auto"
            >
              Laporkan
            </Link>
          </div>
          <Robot
            src={body1}
            alt="Ilustrasi penipuan"
            motion="sway"
            interactive
            className="order-2 w-45 object-contain sm:w-[340px] lg:order-first"
          />
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
        id="why-section"
        className="reveal w-full max-w-6xl"
      >
        <div className="relative overflow-hidden rounded-[32px] bg-white/50 px-5 py-10 shadow-md sm:rounded-[44px] sm:px-8 sm:py-12 lg:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#ADCEFF]/30 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#47a8e4]/10 blur-2xl"
          />

          <div className="relative flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-center lg:gap-12 lg:text-left">
            <div className="relative flex shrink-0 flex-col items-center">
              <div
                aria-hidden
                className="absolute bottom-6 left-1/2 h-24 w-32 -translate-x-1/2 rounded-full bg-[#ADCEFF]/50 blur-2xl"
              />
              <Robot
                src={whyRobot}
                alt="Maskot CegahScam"
                motion="bob"
                interactive
                className="relative h-36 w-auto object-contain drop-shadow-[0_16px_24px_rgba(82,120,154,0.22)] sm:h-44 lg:h-48"
              />
              <div className="relative -mt-2 rounded-2xl bg-white px-3 py-1.5 text-center text-[11px] font-semibold text-[#52789A] shadow-md shadow-[#8FA9C4]/30 sm:text-[12px]">
                <span
                  aria-hidden
                  className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 bg-white"
                />
                Aku temani sampai lapor!
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 lg:items-start">
              <h1 className="text-[24px] font-bold text-[#446685] sm:text-[32px] lg:text-[40px]">
                Kenapa CegahScam?
              </h1>
              <p className="mx-auto max-w-xl text-[13px] leading-relaxed text-[#3F4E5E] sm:text-base lg:mx-0">
                Kami tidak berhenti di peringatan. Kami bantu sampai laporanmu
                siap dikirim.
              </p>
            </div>
          </div>

          <div className="relative mt-8 grid w-full gap-4 sm:grid-cols-2 sm:gap-5">
            <div className="flex flex-col gap-3 rounded-[25px] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF2FA] text-[#1A56DB]">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <p className="text-[15px] font-bold text-[#26384A] sm:text-base">
                Satu alur, dari curiga sampai lapor
              </p>
              <p className="text-[13px] leading-relaxed text-[#3F4E5E] sm:text-sm">
                Periksa bukti, pahami risikonya, lalu ikuti langkah penanganan
                yang sudah disusun sesuai kasusmu.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-[25px] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF2FA] text-[#1A56DB]">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
                  <path d="M14 3v5h5" />
                  <path d="M9 13h6M9 17h6" />
                </svg>
              </span>
              <p className="text-[15px] font-bold text-[#26384A] sm:text-base">
                Laporan siap, tinggal salin
              </p>
              <p className="text-[13px] leading-relaxed text-[#3F4E5E] sm:text-sm">
                Kronologi dan draf laporan tersusun rapi. Salin, unduh PDF, atau
                teruskan langsung ke pihak berwenang.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-[25px] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF2FA] text-[#1A56DB]">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 6h11M9 12h11M9 18h11" />
                  <path d="m3 6 1.5 1.5L7 5" />
                  <path d="m3 12 1.5 1.5L7 11" />
                  <path d="m3 18 1.5 1.5L7 17" />
                </svg>
              </span>
              <p className="text-[15px] font-bold text-[#26384A] sm:text-base">
                Bukan sekadar peringatan
              </p>
              <p className="text-[13px] leading-relaxed text-[#3F4E5E] sm:text-sm">
                Setiap hasil analisis dilengkapi langkah penanganan dan kontak
                resmi, bukan cuma label bahaya.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-[25px] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF2FA] text-[#1A56DB]">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="5" y="10" width="14" height="10" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  <path d="M12 14v2" />
                </svg>
              </span>
              <p className="text-[15px] font-bold text-[#26384A] sm:text-base">
                Privasi jadi prioritas
              </p>
              <p className="text-[13px] leading-relaxed text-[#3F4E5E] sm:text-sm">
                Tanpa akun dan tanpa riwayat. Data yang kamu masukkan otomatis
                terhapus saat sesi berakhir.
              </p>
            </div>
          </div>

          <p className="relative mt-6 rounded-2xl bg-[#446685] px-5 py-4 text-center text-[13px] font-semibold leading-relaxed text-white sm:text-sm">
            Ujungnya bukan sekadar skor risiko, tapi draf laporan yang siap
            disalin dan diteruskan ke bank, kepolisian, atau kanal resmi.
          </p>
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
