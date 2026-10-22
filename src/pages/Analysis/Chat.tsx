import { Link } from "react-router-dom";
import { useState } from "react";
import AnalysisHook from "../../components/AnalysisHook";

export default function Chat() {
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
            Silahkan isi pertanyaan berikut
          </h1>
        </div>
        <form className="mx-auto flex w-full max-w-220 flex-col gap-3 text-[#26384A]">

          <fieldset id="kronologi" className="flex flex-col gap-1">
            <legend className="flex items-center gap-2 font-semibold mb-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#52789A]  text-white">
                1
              </span>
              Masukan Pesan
            </legend>
            <textarea
              name="chat-message"
              rows={4}
              placeholder="Masukan Pesan"
              className="ml-7 border-[0.5px] py-2 rounded-lg px-2"
              onInput={(e) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
}}
            ></textarea>
          </fieldset>

          <fieldset id="bukti-upload" className="flex w-full flex-col gap-2">
            <legend className="mb-3 flex items-start gap-2">
              <span className="flex font-bold h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#52789A] text-white">
                8
              </span>

              <span className="flex flex-col gap-1">
                <span className="font-semibold text-[#26384A]">
                  Bukti Pesan
                </span>

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

          {/* 
          Hilangkan komen ini nanti kalau sudah BE dibuat
          <button
            type="submit"
            className="my-10 mx-auto w-4/5 bg-white py-2 rounded-full shadow-xl font-bold text-[#5E83A5] hover:bg-[#5E83A5] hover:text-white hover:cursor-pointer"
          >
            Kirim Laporan
          </button> */}

          <Link
            to="/report/financial"
            className="text-center my-10 mx-auto w-4/5 bg-white py-2 rounded-full shadow-xl font-bold text-[#5E83A5] hover:bg-[#5E83A5] hover:text-white hover:cursor-pointer"
          >
            Kirim Laporan
          </Link>
        </form>
      </div>
    </div>
    
  );
}
