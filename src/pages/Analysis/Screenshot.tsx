import { Link } from "react-router-dom";
import { useState } from "react";
import AnalysisHook from "../../components/AnalysisHook";

export default function Screenshot() {
  const [fileBukti, setFileBukti] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

      <div id="body-input" className="reveal form-card">
        <div id="title" className="form-title">
          <h1>Silahkan isi pertanyaan berikut</h1>
        </div>
        <form className="form-body">
          <fieldset id="bank-ewallet" className="form-fieldset">
            <legend className="form-legend">
              <span className="form-badge">1</span>
              <span>
                Pilih Platform / Aplikasi yang digunakan untuk transaksi
                <span className="ml-1 font-normal text-slate-400">
                  (pilih yang sesuai)
                </span>
              </span>
            </legend>
            <div className="form-choices">
              <label className="form-choice">
                <input type="radio" name="kanalMedia" value="whatsapp" />
                WhatsApp
              </label>
              <label className="form-choice">
                <input type="radio" name="kanalMedia" value="instagram" />
                Instagram
              </label>
            </div>
          </fieldset>

          <fieldset id="bukti-upload" className="form-fieldset">
            <legend className="form-legend items-start">
              <span className="form-badge mt-0.5">2</span>

              <span className="flex flex-col gap-1">
                <span>Bukti Pesan</span>

                <span className="text-xs font-normal text-slate-400">
                  Unggah file bukti pesan (format JPG, PNG, PDF maks 50 MB)
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
              className={`form-upload ${
                isDragging
                  ? "border-[#52789A] bg-[#D9E7F2]"
                  : "border-[#B9C8DA] bg-[#C9D7E3]/60 hover:border-[#52789A]"
              }`}
            >
              {/* Ikon upload */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-[#52789A]"
                aria-hidden="true"
              >
                <path d="M5 20h14v-2H5v2zm7-18-5.5 5.5 1.42 1.42L11 6.83V16h2V6.83l3.08 3.09 1.42-1.42L12 2z" />
              </svg>

              <span className="text-sm font-semibold text-[#52789A]">
                Tarik dan lepas file di sini
              </span>

              <span className="rounded-full bg-[#A5C6FF] px-7 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#8DB5F7]">
                Pilih File
              </span>

              {fileBukti && (
                <span className="max-w-full truncate text-xs text-[#52789A]">
                  File dipilih: {fileBukti.name}
                </span>
              )}
            </label>
          </fieldset>

          <Link to="/analysis/resultscreenshot" className="form-submit">
            Kirim Laporan
          </Link>
        </form>
      </div>
    </div>
  );
}
