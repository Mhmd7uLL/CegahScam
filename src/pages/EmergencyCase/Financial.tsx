import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EmergencyHook from "../../components/EmergencyHook";

export default function Financial() {
  const [fileBukti, setFileBukti] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showInputLainnya, setShowInputLainnya] = useState(false);
  const navigate = useNavigate();
  const [jenisBank, setJenisBank] = useState("") ;
  const [kanalMedia, setKanalMedia] = useState("");
  const [tanggalKejadian, setTanggalKejadian] = useState("");
  const [tujuanTransaksi, setTujuanTransaksi] = useState<string[]>([]);
  const [namaInstitusi, setNamaInstitusi] = useState("");
  const [nomorRekening, setNomorRekening] = useState("");
  const [namaPemilikRekening, setNamaPemilikRekening] = useState("");
  const [nominalKerugian, setNominalKerugian] = useState("");
  const [detailKronologi, setDetailKronologi] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleTujuanTransaksi = (value: string) => 
    setTujuanTransaksi((prev) => 
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  

  const handlePilihFile = (file?: File) => {
    if (!file) return;

    const formatValid = ["image/jpeg", "image/png", "image/webp"];

    if (!formatValid.includes(file.type)) {
      alert("Format file harus JPG, PNG, atau WEBP.");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      alert("Ukuran file maksimal 15 MB.");
      return;
    }

    setFileBukti(file);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!jenisBank ){
      setError("Jenis bank/dompet digital korban harus diisi.");
      setLoading(false);
      return;
    }

    if (!kanalMedia) {
      setError("Kanal media kejadian harus diisi.");
      setLoading(false);
      return;
    } 

    if (!tanggalKejadian) {
      setError("Tanggal kejadian harus diisi.");
      setLoading(false);
      return;
    }

    if(tujuanTransaksi.length === 0) {
      setError("Tujuan transaksi harus diisi.");
      setLoading(false);
      return;
    }

    if(!namaInstitusi) {
      setError("Nama institusi harus diisi.");
      setLoading(false);
      return;
    }

    if(nomorRekening.length === 0) {
      setError("Nomor rekening harus diisi.");
      setLoading(false);
      return;
    }

    if(!nominalKerugian) {
      setError("Nominal kerugian harus diisi.");
      setLoading(false);
      return;
    }

    if(detailKronologi.length === 0) {
      setError("Detail kronologi harus diisi.");
      setLoading(false);
      return;
    }

    if(!fileBukti) {
      setError("File bukti harus diunggah.");
      setLoading(false);
      return;
    }

    const fd = new FormData();
    fd.append("file", fileBukti!);
    fd.append("jenisBank", jenisBank);
    fd.append("kanalMedia", kanalMedia);
    fd.append("tanggalKejadian", tanggalKejadian);
    fd.append("tujuanTransaksi", tujuanTransaksi.join(","));
    fd.append("namaInstitusi", namaInstitusi);
    fd.append("nomorRekening", nomorRekening);
    fd.append("namaPemilikRekening", namaPemilikRekening);
    fd.append("nominalKerugian", nominalKerugian);
    fd.append("detailKronologi", detailKronologi);

    try {
      const response = await fetch("http://localhost:3000/api/emergency/financial", {
        method: "POST",
        body: fd,
      });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Terjadi kesalahan saat mengirim laporan.");
    }
    navigate("/report/financial", { state: { reportId: data.reportId } });
    } catch (error) {
      console.error("Error submitting report:", error);
      setError("Terjadi kesalahan saat mengirim laporan.");
      setLoading(false);
    } finally {
      setLoading(false);  
    }

  }

  return (
    <div className="mx-auto w-full pb-20 pt-24 lg:pt-36">
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

      <div id="body-input" className="reveal form-card">
        <div id="title" className="form-title">
          <h1>Laporkan kerugian finansial kamu</h1>
        </div>
        <form className="form-body" onSubmit={handleSubmit}>
          <fieldset id="bank-ewallet" className="form-fieldset">
            <legend className="form-legend">
              <span className="form-badge">
                1
              </span>
              Bank/Dompet Digital Korban
              <span className="ml-1 font-normal text-slate-400">
                (pilih yang sesuai)
              </span>
            </legend>
            <div className="form-choices">
              <label className="form-choice">
                <input
                  type="radio"
                  name="bankKorban"
                  value="bca"
                  className="accent-[#52789A]"
                  onChange={(e) => setJenisBank(e.target.value)}
                />
                BCA
              </label>
              <label className="form-choice">
                <input
                  type="radio"
                  name="bankKorban"
                  value="bri"
                  className="accent-[#52789A]"
                  onChange={(e) => setJenisBank(e.target.value)}
                />
                BRI
              </label>
              <label className="form-choice">
                <input
                  type="radio"
                  name="bankKorban"
                  value="bni"
                  className="accent-[#52789A]"
                  onChange={(e) => setJenisBank(e.target.value)}
                />
                BNI
              </label>
              <label className="form-choice">
                <input
                  type="radio"
                  name="bankKorban"
                  value="mandiri"
                  className="accent-[#52789A]"
                  onChange={(e) => setJenisBank(e.target.value)}
                />
                Mandiri
              </label>
              <label className="form-choice">
                <input
                  type="radio"
                  name="bankKorban"
                  value="dana"
                  className="accent-[#52789A]"
                  onChange={(e) => setJenisBank(e.target.value)}
                />
                DANA
              </label>
              <label className="form-choice">
                <input
                  type="radio"
                  name="bankKorban"
                  value="ovo"
                  className="accent-[#52789A]"
                  onChange={(e) => setJenisBank(e.target.value)}
                />
                OVO
              </label>
              <label className="form-choice">
                <input
                  type="radio"
                  name="bankKorban"
                  value="gopay"
                  className="accent-[#52789A]"
                  onChange={(e) => setJenisBank(e.target.value)}
                />
                GOPAY
              </label>
            </div>
          </fieldset>

          <fieldset id="kanal-media" className="form-fieldset">
            <legend className="form-legend">
              <span className="form-badge">
                2
              </span>
              <span>
                Kanal media kejadian
                <span className="ml-1 font-normal text-slate-400">
                  (pilih yang sesuai)
                </span>
              </span>
            </legend>

            <div className="flex flex-col gap-1">
              <label className="form-choice">
                <input
                  type="radio"
                  name="kanalMedia"
                  value="whatsapp"
                  className="accent-[#52789A]"
                  onChange={(e) => setKanalMedia(e.target.value)}
                />
                WhatsApp
              </label>

              <label className="form-choice">
                <input
                  type="radio"
                  name="kanalMedia"
                  value="instagram"
                  className="accent-[#52789A]"
                  onChange={(e) => setKanalMedia(e.target.value)}
                />
                Instagram
              </label>
            </div>
          </fieldset>

          <fieldset id="tanggal" className="form-fieldset">
            <legend className="form-legend">
              <span className="form-badge">
                3
              </span>
              Tanggal Kejadian
            </legend>

            <input
              type="date"
              name="tanggalKejadian"
              className="form-input max-w-[220px]"
              onChange={(e) => setTanggalKejadian(e.target.value)}
            />
          </fieldset>

          <fieldset id="tujuan-transaksi" className="form-fieldset">
            <legend className="form-legend">
              <span className="form-badge">
                4
              </span>
              <span>
                Tujuan Transaksi
                <span className="ml-1 font-normal text-slate-400">
                  (pilih yang sesuai)
                </span>
              </span>
            </legend>

            <div className="flex flex-col gap-1">
              <label className="form-choice">
                <input
                  type="checkbox"
                  name="tujuanTransaksi"
                  value="link"
                  className="accent-[#52789A]"
                  checked={tujuanTransaksi.includes("link")}
                />
                Pembelian barang/jasa
              </label>

              <label className="form-choice">
                <input
                  type="checkbox"
                  name="tujuanTransaksi"
                  value="data-pribadi"
                  className="accent-[#52789A]"
                  checked={tujuanTransaksi.includes("data-pribadi")}  
                  onChange={() => toggleTujuanTransaksi("data-pribadi")}
                />
                Biaya administrasi
              </label>

              <label className="form-choice">
                <input
                  type="checkbox"
                  name="tujuanTransaksi"
                  value="otp"
                  className="accent-[#52789A]"
                  checked={tujuanTransaksi.includes("otp")}
                  onChange={() => toggleTujuanTransaksi("otp")}
                />
                Hadiah/promo
              </label>

              <label className="form-choice">
                <input
                  type="checkbox"
                  name="tujuanTransaksi"
                  value="menyamar"
                  className="accent-[#52789A]"
                  checked={tujuanTransaksi.includes("menyamar")}
                  onChange={() => toggleTujuanTransaksi("menyamar")}
                />
                Pinjaman
              </label>

              <label className="form-choice">
                <input
                  type="checkbox"
                  name="tujuanTransaksi"
                  value="lainnya"
                  checked={showInputLainnya}
                  onChange={(e) => setShowInputLainnya(e.target.checked)}
                  className="accent-[#52789A]"
                />
                Lainnya
              </label>
              {showInputLainnya && (
                <input
                  type="text"
                  name="transaksiLainnya"
                  placeholder="Tulis yang dilakukan pelaku"
                  className="form-input"
                  value={tujuanTransaksi.find((item) => item === "lainnya") || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                      if (!tujuanTransaksi.includes("lainnya")) {
                        toggleTujuanTransaksi("lainnya");
                      }
                      setTujuanTransaksi((prev) =>
                        prev.filter((item) => item !== "lainnya")
                      );
                    }
                  }}
                />
              )}
            </div>
          </fieldset>

          <fieldset id="informasi-scammer" className="form-fieldset">
            <legend className="form-legend">
              <span className="form-badge">
                5
              </span>
              Informasi Penipu
            </legend>
            <label className="flex flex-col gap-3 text-sm font-semibold text-[#26384A]">
              <span>a. Nama institusi</span>

              <input
                type="text"
                name="namaInstitusi"
                placeholder="Contoh: PT.xxx, Bank xxx"
                className="form-input font-normal"
                onChange={(e) => setNamaInstitusi(e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-3 text-sm font-semibold text-[#26384A]">
              <span>b. Nomor rekening tujuan</span>

              <input
                type="text"
                name="nomorRekening"
                placeholder="Contoh: 123 456 789 0123"
                className="form-input font-normal"
                onChange={(e) => setNomorRekening(e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-3 text-sm font-semibold text-[#26384A]">
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
                className="form-input font-normal"
                onChange={(e) => setNamaPemilikRekening(e.target.value)}
              />
            </label>
          </fieldset>

          <fieldset id="nominal-rugi" className="form-fieldset">
            <legend className="form-legend">
              <span className="form-badge">
                6
              </span>
              Nominal Kerugian
            </legend>
            <input
              type="number"
              placeholder="Contoh : Rp 50.000.000"
              className="form-input"
              onChange={(e) => setNominalKerugian(e.target.value)}
            />
          </fieldset>

          <fieldset id="kronologi" className="form-fieldset">
            <legend className="form-legend">
              <span className="form-badge">
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
              className="form-input"
              onChange={(e) => setDetailKronologi(e.target.value)}
            />
          </fieldset>

          <fieldset id="bukti-upload" className="form-fieldset">
            <legend className="form-legend items-start">
              <span className="form-badge mt-0.5">8</span>

              <span className="flex flex-col gap-1">
                <span className="font-semibold text-[#26384A]">
                  Bukti percakapan
                </span>

                <span className="text-xs font-normal text-slate-400">
                  Unggah file bukti transfer (format JPG, PNG, WEB maks 15 MB)
                </span>
              </span>
            </legend>

            <input
              id="bukti-file"
              type="file"
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => handlePilihFile(e.target.files?.[0])}
            />

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
                  : "border-transparent bg-[#C9D7E3]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-[#52789A]"
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

      
          {error && (
            <div className="mt-4 rounded-md bg-[#FEE2E2] p-4 text-sm text-[#B91C1C]">
              {error}
            </div>
          )}

          <button 
          type="submit"
          disabled={loading}
          className="rounded-full bg-[#5E83A5] px-7 py-2.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#4D7090]"
          >
            {loading ? "Mengirim..." : "Kirim Laporan"}
          </button>
        </form>
      </div>
    </div>
    
  );
}
