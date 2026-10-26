import { Link } from "react-router-dom";
import { useState } from "react";

// icon/picture assets
import body1 from "../assets/Home/body-1.webp";
import body2 from "../assets/Home/body-2.webp";
import heroIcon from "../assets/Home/heroicon.webp";
import cursor from "../assets/Icon/Cursor.svg";
import files from "../assets/Icon/Files.svg";
import handHeart from "../assets/Icon/HandHeart.svg";

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState("FAQ1");

  return (
    <div className="flex flex-col items-center gap-20 py-20">
      <div id="Hero-section" className="relative w-80 lg:w-290 h-120 mt-15">
        <div className="flex flex-col-reverse lg:flex-row items-center lg:px-5 pt-5 lg:py-3 justify-between lg:ps-30 h-full bg-white/50 shadow-md rounded-[50px] max-[600px]:pb-8">
          <div className="flex flex-col gap-5 lg:gap-15">
            <div className="flex flex-col">
              <div className="text-[20px] font-bold text-[#446685] max-[600px]:w-50 lg:text-[40px] max-[600px]:text-center">
                <p>Mau Mencegah?</p>
                <p>Lagi Curiga?</p>
                <p>Atau Sudah Kena?</p>
              </div>
              <p className="text-[9px] lg:text-[15px] max-[600px]:text-center">
                Dari rasa ragu sampai tahu harus berbuat apa
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-3">
              <Link
                to="/emergency"
                className="bg-[#ADCEFF] text-white hover:bg-[#85B6FF] py-2 px-5 rounded-2xl hover:cursor-pointer shadow-lg text-center"
              >
                Darurat
              </Link>
              <Link
                to="/analysis"
                className="bg-[#ADCEFF] text-white hover:bg-[#85B6FF] py-2 px-5 rounded-2xl hover:cursor-pointer shadow-lg text-center"
              >
                Analisis
              </Link>
              <Link
                to="/education"
                className="bg-[#ADCEFF] text-white hover:bg-[#85B6FF] py-2 px-5 rounded-2xl hover:cursor-pointer shadow-lg text-center"
              >
                Edukasi
              </Link>
            </div>
          </div>
          <img src={heroIcon} className="max-[600px]:w-40" />
        </div>
      </div>

      <div id="body1-section" className="w-full max-w-6xl px-4 min-h-120">
        <div className="flex flex-col lg:flex-row justify-around lg:justify-center">
          <img src={body1} className="max-[600px]:w-70 max-[600px]:mx-auto" />
          <div className="flex flex-col justify-center items-center lg:items-start gap-10">
            <div>
              <h1 className="font-bold text-[20px] text-[#446685] lg:text-[40px] max-[600px]:text-center">
                Apakah kamu<br></br>terkena penipuan?
              </h1>
              <p className="text-[15px] max-[600px]:text-center">
                Kamu bisa langsung laporkan<br></br>ke pihak berwajib
              </p>
            </div>
            <Link
              to="/emergency"
              className="bg-[#ADCEFF] text-white hover:bg-[#85B6FF] py-2 px-5 rounded-2xl hover:cursor-pointer shadow-lg"
            >
              Laporkan
            </Link>
          </div>
        </div>
      </div>

      <div id="body2-section" className="w-full max-w-6xl px-4 min-h-120">
        <div className="flex flex-col gap-12 justify-center items-center">
          <h1 className="font-bold text-[30px] lg:text-[40px] text-[#446685]">
            Langkah Pelaporan
          </h1>
          <div className="grid gap-3 lg:gap-40 lg:grid-cols-3">
            <div className="flex flex-col gap-3 items-center py-4 bg-[#446685] w-60 rounded-[25px]">
              <p className="flex justify-center items-center mx-auto rounded-lg bg-white w-7 h-7">
                1
              </p>
              <img src={cursor} className="w-10 h-10" />
              <p className="text-white font-bold">Pilih Kasus</p>
            </div>
            <div className="flex flex-col gap-3 items-center py-4 bg-[#446685] w-60 rounded-[25px]">
              <p className="flex justify-center items-center mx-auto rounded-lg bg-white w-7 h-7">
                2
              </p>
              <img src={handHeart} className="w-10 h-10" />
              <p className="text-white font-bold">Penanganan</p>
            </div>
            <div className="flex flex-col gap-3 items-center py-4 bg-[#446685] w-60 rounded-[25px]">
              <p className="flex justify-center items-center mx-auto rounded-lg bg-white w-7 h-7">
                3
              </p>
              <img src={files} className="w-10 h-10" />
              <p className="text-white font-bold">Hasil Laporan</p>
            </div>
          </div>
        </div>
      </div>

      <div id="body3-section" className="w-full max-w-6xl px-4 min-h-120">
        <div className="flex flex-col gap-10">
          <h1 className="lg:mb-12 text-center text-[30px] lg:text-[40px] font-bold text-[#446685] max-[600px]:mx-auto max-[600px]:w-full max-[600px]:max-w-[360px]">
            Ingin periksa atau Belajar dulu?
          </h1>
          <div className="relative mx-auto flex min-h-[500px] w-full max-w-[900px] flex-col items-center gap-6 md:block">
            <div className="pointer-events-none absolute left-1/2 top-[35px] hidden aspect-square w-[430px] -translate-x-1/2 rounded-full border border-[#ADCEFF]/60 bg-[#ADCEFF]/10 md:block">
              <div className="absolute inset-[25px] rounded-full border border-[#ADCEFF]/50 bg-[#ADCEFF]/10">
                <div className="absolute inset-[40px] rounded-full border border-[#ADCEFF]/40 bg-[#ADCEFF]/10" />
              </div>
            </div>

            <div className="relative z-20 flex w-60 flex-col gap-3 md:absolute md:left-0 md:top-0">
              <div className="flex h-20 items-center justify-center rounded-[25px] bg-white text-[25px] font-bold text-[#5E83A5] shadow-sm">
                PERIKSA
              </div>

              <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-[25px] bg-white px-6 py-5 shadow-sm">
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

            <img
              src={body2}
              alt="Maskot-CegahScam"
              className="relative z-10 h-100 w-100 object-contain md:absolute md:left-1/2 md:top-[40px] md:h-[320px] md:w-[320px] md:-translate-x-1/2"
            />

            <div className="relative z-20 flex w-60 flex-col gap-3 md:absolute md:right-0 md:top-[210px]">
              <div className="flex h-20 items-center justify-center rounded-[25px] bg-white text-[25px] font-bold text-[#5E83A5] shadow-sm">
                BELAJAR
              </div>

              <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-[25px] bg-white px-6 py-5 shadow-sm">
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

      <div id="body4-section" className="w-full max-w-6xl px-4 min-h-120">
        <div className="flex flex-col gap-10 justify-center items-center">
          <h1 className="font-bold text-[30px] lg:text-[40px] text-[#446685] max-[600px]:w-full max-[600px]:max-w-[360px] max-[600px]:mx-auto max-[600px]:text-center">
            Pertanyaan yang sering diajukan
          </h1>
          <div className="flex flex-col lg:flex-row justify-center gap-5">
            <div className="flex flex-col">
              <button
                onClick={() => setOpenFAQ("FAQ1")}
                className={`flex flex-row bg-white w-75 py-3 px-5 rounded-t-[15px] ${
                  openFAQ === "FAQ1"
                    ? "font-bold"
                    : "font-normal rounded-[15px]"
                }`}
              >
                <p className="text-[#1A56DB] font-bold pe-5">
                  {openFAQ === "FAQ1" ? "-" : "+"}
                </p>
                <h1 className="text-[#1A56DB]">Apa itu CegahScam?</h1>
              </button>
              {openFAQ === "FAQ1" && (
                <div className="bg-white w-75 py-3 px-5 rounded-b-[15px]">
                  CegahScam adalah platform yang membantu kamu mengenali,
                  menganalisis, dan menangani risiko penipuan digital.
                </div>
              )}

              <button
                onClick={() => setOpenFAQ("FAQ2")}
                className={`flex flex-row bg-white w-75 py-3 px-5 mt-5 rounded-t-[15px] ${
                  openFAQ === "FAQ2"
                    ? "font-bold"
                    : "font-normal rounded-[15px]"
                }`}
              >
                <p className="text-[#1A56DB] font-bold pe-5">
                  {openFAQ === "FAQ2" ? "-" : "+"}
                </p>
                <h1 className="text-[#1A56DB]">
                  Apakah CegahScam langsung melaporkan kasus saya?
                </h1>
              </button>
              {openFAQ === "FAQ2" && (
                <div className="bg-white w-75 py-3 px-5 rounded-b-[15px]">
                  Tidak. CegahScam membantumu menyusun kronologi dan langkah
                  penanganan, lalu kamu sendiri yang melapor ke instansi resmi
                  yang disarankan.
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <button
                onClick={() => setOpenFAQ("FAQ3")}
                className={`flex flex-row bg-white w-75 py-3 px-5 rounded-t-[15px] ${
                  openFAQ === "FAQ3"
                    ? "font-bold"
                    : "font-normal rounded-[15px]"
                }`}
              >
                <p className="text-[#1A56DB] font-bold pe-5">
                  {openFAQ === "FAQ3" ? "-" : "+"}
                </p>
                <h1 className="text-[#1A56DB]">
                  CegahScam bisa digunakan untuk kasus apa saja?
                </h1>
              </button>
              {openFAQ === "FAQ3" && (
                <div className="bg-white w-75 py-3 px-5 rounded-b-[15px]">
                  Penipuan jual beli online, investasi bodong, pinjaman ilegal,
                  pembocoran data pribadi, pembajakan akun, sampai penipuan
                  lewat telepon dan chat.
                </div>
              )}
              <button
                onClick={() => setOpenFAQ("FAQ4")}
                className={`flex flex-row bg-white w-75 py-3 px-5 mt-5 rounded-t-[15px] ${
                  openFAQ === "FAQ4"
                    ? "font-bold"
                    : "font-normal rounded-[15px]"
                }`}
              >
                <p className="text-[#1A56DB] font-bold pe-5">
                  {openFAQ === "FAQ4" ? "-" : "+"}
                </p>
                <h1 className="text-[#1A56DB]">
                  Apa saja yang bisa dianalisis?
                </h1>
              </button>
              {openFAQ === "FAQ4" && (
                <div className="bg-white w-75 py-3 px-5 rounded-b-[15px]">
                  Nomor telepon, pesan chat, tautan mencurigakan, serta
                  tangkapan layar percakapan atau bukti transfer.
                </div>
              )}
              <button
                onClick={() => setOpenFAQ("FAQ5")}
                className={`flex flex-row bg-white w-75 py-3 px-5 mt-5 rounded-t-[15px] ${
                  openFAQ === "FAQ5"
                    ? "font-bold"
                    : "font-normal rounded-[15px]"
                }`}
              >
                <p className="text-[#1A56DB] font-bold pe-5">
                  {openFAQ === "FAQ5" ? "-" : "+"}
                </p>
                <h1 className="text-[#1A56DB]">
                  Kapan saya harus menggunakan Darurat?
                </h1>
              </button>
              {openFAQ === "FAQ5" && (
                <div className="bg-white w-75 py-3 px-5 rounded-b-[15px]">
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
