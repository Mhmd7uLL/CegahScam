import { Link } from "react-router-dom";
import { useState } from "react";
import EmergencyHook from "../../components/EmergencyHook";

export default function Financial() {
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
    <div className="mx-auto w-full pb-20 pt-32 lg:pt-36">
      <div
        id="hero-section"
        className="mx-auto flex w-full max-w-[1160px] flex-col justify-center px-4"
      >
        <EmergencyHook />
        <div className="mx-auto my-6 flex w-full max-w-[800px] items-center justify-between gap-2 rounded-[24px] bg-white/30 px-3 py-4 shadow-xl sm:gap-4 sm:rounded-[50px] sm:px-8">
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
          <h1 className="text-[23px] font-bold leading-snug text-black sm:text-[25px]">
            Kamu bisa tanya ke AI tentang yang kamu alami
          </h1>
        </div>
        <form className="mx-auto flex w-full max-w-[720px] flex-col gap-3 pb-6 text-[#26384A]">
          <fieldset id="bank-ewallet" className="flex flex-col gap-1">
            <legend className="flex items-center gap-2 font-semibold mb-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#52789A]  text-white">
                1
              </span>
              Bank/Dompet Digital Korban
              <span className="ml-1 font-normal text-slate-400">
                (pilih yang sesuai)
              </span>
            </legend>
            <div className="ml-7 flex flex-row flex-wrap gap-x-5 gap-y-2">
              <label className="flex items-center gap-1 text-slate-600">
                <input
                  type="radio"
                  name="bankKorban"
                  value="bca"
                  className="accent-[#52789A]"
                />
                BCA
              </label>
              <label className="flex items-center gap-1 text-slate-600">
                <input
                  type="radio"
                  name="bankKorban"
                  value="bri"
                  className="accent-[#52789A]"
                />
                BRI
              </label>
              <label className="flex items-center gap-1 text-slate-600">
                <input
                  type="radio"
                  name="bankKorban"
                  value="bni"
                  className="accent-[#52789A]"
                />
                BNI
              </label>
              <label className="flex items-center gap-1 text-slate-600">
                <input
                  type="radio"
                  name="bankKorban"
                  value="mandiri"
                  className="accent-[#52789A]"
                />
                Mandiri
              </label>
              <label className="flex items-center gap-1 text-slate-600">
                <input
                  type="radio"
                  name="bankKorban"
                  value="dana"
                  className="accent-[#52789A]"
                />
                DANA
              </label>
              <label className="flex items-center gap-1 text-slate-600">
                <input
                  type="radio"
                  name="bankKorban"
                  value="ovo"
                  className="accent-[#52789A]"
                />
                OVO
              </label>
              <label className="flex items-center gap-1 text-slate-600">
                <input
                  type="radio"
                  name="bankKorban"
                  value="gopay"
                  className="accent-[#52789A]"
                />
                GOPAY
              </label>
            </div>
          </fieldset>

          <fieldset id="kanal-media" className="flex flex-col gap-1">
            <legend className="flex items-center gap-2 font-semibold mb-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#52789A]  text-white">
                2
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

          <fieldset id="tanggal" className="flex flex-col gap-1">
            <legend className="flex items-center gap-2 font-semibold mb-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#52789A]  text-white">
                3
              </span>
              Tanggal Kejadian
            </legend>

            <input
              type="date"
              name="tanggalKejadian"
              className="ml-7 w-full max-w-[220px] rounded border border-slate-300 bg-transparent px-2 py-1 text-slate-600"
            />
          </fieldset>

          <fieldset id="tujuan-transaksi" className="flex flex-col gap-1">
            <legend className="flex items-center gap-2 font-semibold mb-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#52789A]  text-white">
                4
              </span>
              <span>
                Tujuan Transaksi
                <span className="ml-1 font-normal text-slate-400">
                  (pilih yang sesuai)
                </span>
              </span>
            </legend>

            <div className="ml-7 flex flex-col gap-1">
              <label className="flex items-center gap-1 leading-4 text-slate-600">
                <input
                  type="checkbox"
                  name="tujuanTransaksi"
                  value="link"
                  className="h-3 w-3 accent-[#52789A]"
                />
                Pembelian barang/jasa
              </label>

              <label className="flex items-center gap-1 leading-4 text-slate-600">
                <input
                  type="checkbox"
                  name="tujuanTransaksi"
                  value="data-pribadi"
                  className="h-3 w-3 accent-[#52789A]"
                />
                Biaya administrasi
              </label>

              <label className="flex items-center gap-1 leading-4 text-slate-600">
                <input
                  type="checkbox"
                  name="tujuanTransaksi"
                  value="otp"
                  className="h-3 w-3 accent-[#52789A]"
                />
                Hadiah/promo
              </label>

              <label className="flex items-center gap-1 leading-4 text-slate-600">
                <input
                  type="checkbox"
                  name="tujuanTransaksi"
                  value="menyamar"
                  className="h-3 w-3 accent-[#52789A]"
                />
                Pinjaman
              </label>

              <label className="flex items-center gap-1 leading-4 text-slate-600">
                <input
                  type="checkbox"
                  name="tujuanTransaksi"
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
                  name="transaksiLainnya"
                  placeholder="Tulis yang dilakukan pelaku"
                  className="ml-4 w-[calc(100%-1.75rem)] rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#52789A]"
                />
              )}
            </div>
          </fieldset>

          <fieldset id="informasi-scammer" className="flex w-full flex-col gap-5">
            <legend className="flex items-center gap-2 font-semibold mb-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#52789A] text-sm text-white">
                5
              </span>
              Informasi Penipu
            </legend>
            {/* a. Nama Institusi */}
            <label className="ml-9 flex flex-col gap-2 text-sm font-semibold text-[#26384A] sm:ml-13">
              <span>a. Nama institusi</span>

              <input
                type="text"
                name="namaInstitusi"
                placeholder="Contoh: PT.xxx, Bank xxx"
                className="h-9 w-full rounded-md border border-[#666] bg-transparent px-2 text-sm font-normal outline-none focus:border-[#52789A] focus:ring-1 focus:ring-[#52789A]"
              />
            </label>

            {/* b. Nomor Rekening */}
            <label className="ml-9 flex flex-col gap-2 text-sm font-semibold text-[#26384A] sm:ml-13">
              <span>b. Nomor rekening tujuan</span>

              <input
                type="text"
                name="nomorRekening"
                placeholder="Contoh: 123 456 789 0123"
                className="h-9 w-full rounded-md border border-[#666] bg-transparent px-2 text-sm font-normal outline-none focus:border-[#52789A] focus:ring-1 focus:ring-[#52789A]"
              />
            </label>

            {/* c. Nama Pemilik Rekening */}
            <label className="ml-9 flex flex-col gap-2 text-sm font-semibold text-[#26384A] sm:ml-13">
              <span>
                c. Nama pemilik rekening penipu
                <span className="ml-1 font-normal text-slate-400">
                  (opsional jika ada bukti transfer)
                </span>
              </span>

              <input
                type="text"
                name="namaPemilikRekening"
                placeholder="Contoh: Fachri Nanda"
                className="h-9 w-full rounded-md border border-[#666] bg-transparent px-2 text-sm font-normal outline-none focus:border-[#52789A] focus:ring-1 focus:ring-[#52789A]"
              />
            </label>
          </fieldset>

          <fieldset id="nominal-rugi" className="flex flex-col gap-1">
            <legend className="flex items-center gap-2 font-semibold mb-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#52789A]  text-white">
                6
              </span>
              Nominal Kerugian
            </legend>
            <input
              type="number"
              placeholder="Contoh : Rp 50.000.000"
              className="ml-7 w-[calc(100%-1.75rem)] rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-[#52789A]"
            ></input>
          </fieldset>

          <fieldset id="kronologi" className="flex flex-col gap-1">
            <legend className="flex items-center gap-2 font-semibold mb-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#52789A]  text-white">
                7
              </span>
              Detail Kronologi
              <span className="ml-1 font-normal text-slate-400">
                (Opsional)
              </span>
            </legend>
            <input
              type="text"
              placeholder="Contoh : waktu itu ketika saya ...."
              className="ml-7 w-[calc(100%-1.75rem)] rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-[#52789A]"
            ></input>
          </fieldset>

          <fieldset id="bukti-upload" className="flex w-full flex-col gap-2">
            <legend className="mb-3 flex items-start gap-2">
              <span className="flex font-bold h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#52789A] text-white">
                8
              </span>

              <span className="flex flex-col gap-1">
                <span className="font-semibold text-[#26384A]">
                  Bukti percakapan
                </span>

                <span className="text-xs font-normal text-slate-400">
                  Unggah file bukti transfer (format JPG, PNG, PDF maks 50 MB)
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
            className="mx-auto my-8 w-4/5 rounded-full bg-white py-2 text-center font-bold text-[#5E83A5] shadow-xl transition duration-200 hover:bg-[#5E83A5] hover:text-white sm:my-10"
          >
            Kirim Laporan
          </Link>
        </form>
      </div>
    </div>
    
  );
}
