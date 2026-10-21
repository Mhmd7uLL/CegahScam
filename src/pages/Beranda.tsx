import { Link } from "react-router-dom";
import { useState } from "react";

// icon/picture assets
import body1 from "../assets/Beranda/body-1.webp";
import body2 from "../assets/Beranda/body-2.webp";
import heroIcon from "../assets/Beranda/heroicon.webp";
import cursor from "../assets/Icon/Cursor.svg";
import files from "../assets/Icon/Files.svg";
import handHeart from "../assets/Icon/HandHeart.svg";

export default function Beranda() {
  const [openFAQ, setOpenFAQ] = useState("FAQ1");

  return (
    <div className="flex flex-col items-center gap-20 py-20">
      <div id="Hero-section" className="relative w-290 h-120 mt-15">
        <div className="flex flex-row items-center justify-between ps-30 h-full bg-white/50 shadow-md rounded-[50px]">
          <div className="flex flex-col gap-15">
            <div className="flex flex-col">
              <h1 className="text-[40px] font-bold text-[#446685]">
                Mau Mencegah?<br></br>Lagi Curiga?<br></br>Atau Sudah Kena?
              </h1>
              <p className="text-[15px]">Dari rasa ragu sampai tahu harus berbuat apa</p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/darurat"
                className="bg-[#ADCEFF] text-white hover:bg-[#85B6FF] py-2 px-5 rounded-2xl hover:cursor-pointer shadow-lg"
              >
                Darurat
              </Link>
              <Link
                to="/analisis"
                className="bg-[#ADCEFF] text-white hover:bg-[#85B6FF] py-2 px-5 rounded-2xl hover:cursor-pointer shadow-lg"
              >
                Analisa
              </Link>
              <Link
                to="/edukasi"
                className="bg-[#ADCEFF] text-white hover:bg-[#85B6FF] py-2 px-5 rounded-2xl hover:cursor-pointer shadow-lg"
              >
                Edukasi
              </Link>
            </div>
          </div>
          <img src={heroIcon} />
        </div>
      </div>

      <div id="body1-section" className="w-290 min-h-120">
        <div className="flex flex-row justify-around">
          <img src={body1} />
          <div className="flex flex-col justify-center items-start gap-10">
            <div>
              <h1 className="font-bold text-[40px] text-[#446685]">
                Apakah anda<br></br>terkena scam?
              </h1>
              <p className="text-[15px]">
                Kamu bisa langsung laporkan<br></br>ke pihak berwajib
              </p>
            </div>
            <button className="bg-[#ADCEFF] text-white hover:bg-[#85B6FF] py-2 px-5 rounded-2xl hover:cursor-pointer shadow-lg">
              Laporkan
            </button>
          </div>
        </div>
      </div>

      <div id="body2-section" className="w-290 min-h-105">
        <div className="flex flex-col gap-12 justify-center items-center">
          <h1 className="font-bold text-[40px] text-[#446685]">
            Langkah Pelaporan
          </h1>
          <div className="grid grid-cols-3 gap-40">
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

      <div id="body3-section" className="w-290 max-w-290 px-6">
        <div className="flex flex-col gap-10">
          <h1 className="mb-12 text-center text-4xl font-bold text-[#446685]">
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
                  to="/analisis"
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
                  to="/edukasi"
                  className="w-35 rounded-[40px] bg-[#47a8e4] py-2 text-center font-bold text-white transition duration-200 hover:bg-[#85B6FF]"
                >
                  Edukasi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="body4-section" className="w-290 min-h-120">
        <div className="flex flex-col gap-10 justify-center items-center">
          <h1 className="font-bold text-[40px] text-[#446685]">
            Pertanyaan yang sering diajukan
          </h1>
          <div className="flex flex-row justify-center gap-5">
            <div className="flex flex-col">
              <button
                onClick={() => setOpenFAQ("FAQ1")}
                className={`flex flex-row bg-white w-75 py-3 px-5 rounded-t-[15px] ${
                  openFAQ === "FAQ1"
                    ? "font-bold"
                    : "font-normal rounded-[15px]"
                }`}
              >
                <p className="text-[#1A56DB] font-bold pe-5">{openFAQ === "FAQ1" ? "-" : "+"}</p>
                <h1 className="text-[#1A56DB]">Apa itu CegahScam?</h1>
              </button>
              {openFAQ === "FAQ1" && (
                <div className="bg-white w-75 py-3 px-5 rounded-b-[15px]">
                  CegahScam adalah platform yang membantu pengguna mengenali,
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
                <p className="text-[#1A56DB] font-bold pe-5">{openFAQ === "FAQ2" ? "-" : "+"}</p>
                <h1 className="text-[#1A56DB]">
                  Apakah CegahScam langsung melaporkan kasus saya?
                </h1>
              </button>
              {openFAQ === "FAQ2" && (
                <div className="bg-white w-75 py-3 px-5 rounded-b-[15px]">
                  CegahScam adalah platform yang membantu pengguna mengenali,
                  menganalisis, dan menangani risiko penipuan digital.
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
                <p className="text-[#1A56DB] font-bold pe-5">{openFAQ === "FAQ3" ? "-" : "+"}</p>
                <h1 className="text-[#1A56DB]">
                  CegahScam bisa digunakan untuk kasus apa saja?
                </h1>
              </button>
              {openFAQ === "FAQ3" && (
                <div className="bg-white w-75 py-3 px-5 rounded-b-[15px]">
                  CegahScam adalah platform yang membantu pengguna mengenali,
                  menganalisis, dan menangani risiko penipuan digital.
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
                <p className="text-[#1A56DB] font-bold pe-5">{openFAQ === "FAQ4" ? "-" : "+"}</p>
                <h1 className="text-[#1A56DB]">
                  Apa saja yang bisa dianalisis?
                </h1>
              </button>
              {openFAQ === "FAQ4" && (
                <div className="bg-white w-75 py-3 px-5 rounded-b-[15px]">
                  CegahScam adalah platform yang membantu pengguna mengenali,
                  menganalisis, dan menangani risiko penipuan digital.
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
                <p className="text-[#1A56DB] font-bold pe-5">{openFAQ === "FAQ5" ? "-" : "+"}</p>
                <h1 className="text-[#1A56DB]">
                  Kapan saya harus menggunakan Emergency?
                </h1>
              </button>
              {openFAQ === "FAQ5" && (
                <div className="bg-white w-75 py-3 px-5 rounded-b-[15px]">
                  CegahScam adalah platform yang membantu pengguna mengenali,
                  menganalisis, dan menangani risiko penipuan digital.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
