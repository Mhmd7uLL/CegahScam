import { useState } from "react";
import { Link } from "react-router-dom";
import EmergencyHook from "../../components/EmergencyHook";

export default function DataBreach() {
  const [fileBukti, setFileBukti] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showInputLainnya, setShowInputLainnya] = useState(false);

  const handlePilihFile = (file?: File) => {
    if (!file) return;

    const formatValid = ["image/jpeg", "image/png", "application/pdf"];

    if (!formatValid.includes(file.type)) {
      alert("Format file harus JPG, PNG, atau PDF.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert("Ukuran file maksimal 50 MB.");
      return;
    }

    setFileBukti(file);
  };

  return (
    <div className="mx-auto py-20">
      <div
        id="hero-section"
        className="flex flex-col justify-center w-290 h-80 mt-15"
      >
        <EmergencyHook />
        <div className="flex flex-row justify-around items-center mx-auto bg-white/20 shadow-xl rounded-[50px] w-200 h-80 my-5">
          <div className="flex flex-col gap-2 items-center text-center">
            <p className="bg-[#667085] w-6 h-6 text-white rounded-full">1</p>
            <p className="text-[#667085]">Pilih kasus</p>
          </div>
          ----
          <div className="flex flex-col gap-2 items-center text-center">
            <p className="bg-[#5E83A5] w-6 h-6 text-white rounded-full">2</p>
            <p className="text-[#5E83A5] font-bold">Input Data</p>
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
            Kamu bisa tanya ke AI yang kamu alami
          </h1>
        </div>
        <form className="mx-auto flex w-full max-w-220 flex-col gap-3 text-[#26384A]">
          <fieldset className="flex flex-col gap-1">
            <legend className="flex items-center gap-2 font-semibold mb-2">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#52789A]  text-white">
                1
              </span>
              <span>
                Jenis data/akun yang bocor
                <span className="ml-1 font-normal text-slate-400">
                  (pilih yang sesuai)
                </span>
              </span>
            </legend>
            <div className="ml-7 flex flex-col gap-1">
              <label className="flex items-center gap-1 leading-4 text-slate-600">
                <input
                  type="checkbox"
                  name="jenisData"
                  value="data-pribadi"
                  className="h-3 w-3 accent-[#52789A]"
                />
                Data pribadi (nama, email, nomor telepon, dll)
              </label>

              <label className="flex items-center gap-1 leading-4 text-slate-600">
                <input
                  type="checkbox"
                  name="jenisData"
                  value="media-sosial"
                  className="h-3 w-3 accent-[#52789A]"
                />
                Akun media sosial
              </label>

              <label className="flex items-center gap-1 leading-4 text-slate-600">
                <input
                  type="checkbox"
                  name="jenisData"
                  value="perbankan"
                  className="h-3 w-3 accent-[#52789A]"
                />
                Akun perbankan / finansial
              </label>

              <label className="flex items-center gap-1 leading-4 text-slate-600">
                <input
                  type="checkbox"
                  name="jenisData"
                  value="kartu"
                  className="h-3 w-3 accent-[#52789A]"
                />
                Data kartu kredit / debit
              </label>

              <label className="flex items-center gap-1 leading-4 text-slate-600">
                <input
                  type="checkbox"
                  name="jenisData"
                  value="email"
                  className="h-3 w-3 accent-[#52789A]"
                />
                Akun email
              </label>
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-1">
            <legend className="flex items-center gap-2 font-semibold mb-2">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#52789A]  text-white">
                2
              </span>
              Tanggal Kejadian
            </legend>

            <input
              type="date"
              name="tanggalKejadian"
              className="ml-7 w-full max-w-xs h-10 rounded border border-slate-300 bg-transparent px-1.5 py-1  text-slate-600"
            />
          </fieldset>

          <fieldset className="flex flex-col gap-1">
            <legend className="flex items-center gap-2 font-semibold mb-2">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#52789A]  text-white">
                3
              </span>
              <span>
                Kanal media kejadian
                <span className="ml-1 font-normal text-slate-400">
                  (pilih yang sesuai)
                </span>
              </span>
            </legend>

            <div className="ml-7 flex flex-col gap-1">
              <label className="flex items-center gap-1 leading-4 text-slate-600">
                <input
                  type="radio"
                  name="kanalMedia"
                  value="whatsapp"
                  className="h-3 w-3 accent-[#52789A]"
                />
                WhatsApp
              </label>

              <label className="flex items-center gap-1 leading-4 text-slate-600">
                <input
                  type="radio"
                  name="kanalMedia"
                  value="instagram"
                  className="h-3 w-3 accent-[#52789A]"
                />
                Instagram
              </label>
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-1">
            <legend className="flex items-center gap-2 font-semibold mb-2">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#52789A]  text-white">
                4
              </span>
              <span>
                Apa yang dilakukan pelaku?
                <span className="ml-1 font-normal text-slate-400">
                  (pilih yang sesuai)
                </span>
              </span>
            </legend>

            <div className="ml-7 flex flex-col gap-1">
              <label className="flex items-center gap-1 leading-4 text-slate-600">
                <input
                  type="checkbox"
                  name="tindakanPelaku"
                  value="link"
                  className="h-3 w-3 accent-[#52789A]"
                />
                Mengirim link mencurigakan
              </label>

              <label className="flex items-center gap-1 leading-4 text-slate-600">
                <input
                  type="checkbox"
                  name="tindakanPelaku"
                  value="data-pribadi"
                  className="h-3 w-3 accent-[#52789A]"
                />
                Meminta data pribadi
              </label>

              <label className="flex items-center gap-1 leading-4 text-slate-600">
                <input
                  type="checkbox"
                  name="tindakanPelaku"
                  value="otp"
                  className="h-3 w-3 accent-[#52789A]"
                />
                Meminta OTP/PIN/Password
              </label>

              <label className="flex items-center gap-1 leading-4 text-slate-600">
                <input
                  type="checkbox"
                  name="tindakanPelaku"
                  value="menyamar"
                  className="h-3 w-3 accent-[#52789A]"
                />
                Mengaku sebagai pihak tertentu
              </label>

              <label className="flex items-center gap-1 leading-4 text-slate-600">
                <input
                  type="checkbox"
                  name="tindakanPelaku"
                  value="lainnya"
                  checked={showInputLainnya}
                  onChange={(e) => setShowInputLainnya(e.target.checked)}
                  className="h-3 w-3 accent-[#52789A]"
                />
                Lainnya
              </label>
              {showInputLainnya && (
                <input
                  type="text"
                  name="tindakanLainnya"
                  placeholder="Tulis yang dilakukan pelaku"
                  className="ml-4 w-[calc(100%-1.75rem)] rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#52789A]"
                />
              )}
            </div>
          </fieldset>

          <fieldset className="flex w-full flex-col gap-2">
            <legend className="mb-3 flex items-start gap-2">
              <span className="flex font-bold h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#52789A] text-white">
                5
              </span>

              <span className="flex flex-col gap-1">
                <span className="font-semibold text-[#26384A]">
                  Bukti percakapan
                </span>

                <span className="text-xs font-normal text-slate-400">
                  Unggah file bukti transfer (format JPG, PNG, PDF max 50 MB)
                </span>
              </span>
            </legend>

            {/* Input file tersembunyi */}
            <input
              id="bukti-file"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
              className="hidden"
              onChange={(e) => handlePilihFile(e.target.files?.[0])}
            />

            {/* Area upload */}
            <label
              htmlFor="bukti-file"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handlePilihFile(e.dataTransfer.files[0]);
              }}
              className={`flex min-h-50 ml-7 w-[calc(100%-1.75rem)] cursor-pointer flex-col items-center justify-center gap-3 rounded-[30px] border-2 border-dashed p-4 transition-colors duration-200 ${
                isDragging
                  ? "border-[#52789A] bg-[#D9E7F2]"
                  : "border-transparent bg-[#C9D7E3]"
              }`}
            >
              {/* Ikon upload */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-[#52789A]"
                aria-hidden="true"
              >
                <path d="M5 20h14v-2H5v2zm7-18-5.5 5.5 1.42 1.42L11 6.83V16h2V6.83l3.08 3.09 1.42-1.42L12 2z" />
              </svg>

              <span className="text-sm font-semibold text-[#9AAEBD]">
                Drag and drop your files here
              </span>

              <span className="rounded-full bg-[#A5C6FF] px-7 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#8DB5F7]">
                Browse file
              </span>

              {fileBukti && (
                <span className="max-w-full truncate text-xs text-[#52789A]">
                  File dipilih: {fileBukti.name}
                </span>
              )}
            </label>
          </fieldset>

          <fieldset className="flex flex-col gap-1">
            <legend className="flex items-center gap-2 font-semibold mb-2">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#52789A]  text-white">
                6
              </span>
              Detail Kronologi
              <span className="ml-1 font-normal text-slate-400">
                (Opsional)
              </span>
            </legend>
            <input
              type="text"
              placeholder="Contoh : waktu itu ketika saya ...."
              className="ml-7 border-[0.5px] py-2 rounded-lg px-2"
            ></input>
          </fieldset>

          <fieldset className="flex flex-col gap-1">
            <legend className="flex items-center gap-2 font-semibold mb-2">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#52789A]  text-white">
                7
              </span>
              Status Akses Perangkat
            </legend>
            <div className="ml-7 flex flex-row flex-wrap gap-x-5 gap-y-2">
              <label className="flex items-center gap-1 text-slate-600">
                <input
                  type="radio"
                  name="statusAkses"
                  value="bisaAkses"
                  className="accent-[#52789A]"
                />
                Masih Bisa diakses
              </label>
              <label className="flex items-center gap-1 text-slate-600">
                <input
                  type="radio"
                  name="statusAkses"
                  value="tidakBisaAkses"
                  className="accent-[#52789A]"
                />
                Tidak bisa diakses
              </label>
              <label className="flex items-center gap-1 text-slate-600">
                <input
                  type="radio"
                  name="statusAkses"
                  value="diketahuiLain"
                  className="accent-[#52789A]"
                />
                Diketahui pihak lain
              </label>
              <label className="flex items-center gap-1 text-slate-600">
                <input
                  type="radio"
                  name="statusAkses"
                  value="tidakTahu"
                  className="accent-[#52789A]"
                />
                Tidak tahu
              </label>
            </div>
          </fieldset>

          {/* 
          Hilangkan komen ini nanti kalau sudah BE dibuat
          <button
            type="submit"
            className="my-10 mx-auto w-4/5 bg-white py-2 rounded-full shadow-xl font-bold text-[#5E83A5] hover:bg-[#5E83A5] hover:text-white hover:cursor-pointer"
          >
            Kirim Laporan
          </button> */}

          <Link
            to="/report/data"
            className="text-center my-10 mx-auto w-4/5 bg-white py-2 rounded-full shadow-xl font-bold text-[#5E83A5] hover:bg-[#5E83A5] hover:text-white hover:cursor-pointer"
          >
            Kirim Laporan
          </Link>
        </form>
      </div>
    </div>
  );
}
