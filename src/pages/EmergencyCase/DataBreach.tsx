import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackLink from "../../components/BackLink";
import EmergencyHook from "../../components/EmergencyHook";
import { apiUrl } from "../../lib/api";
import { clearDraft, readDraft, writeDraft } from "../../lib/draft";
import LoadingOverlay from "../../components/LoadingOverlay";

type DataBreachDraft = {
  jenisData: string[];
  tanggalKejadian: string;
  kanalMedia: string;
  tindakanPelaku: string[];
  detailKronologi: string;
  statusAkses: string;
  showInputLainnya: boolean;
  tindakanLainnya: string;
};

const DRAFT_KEY = "emergency-data";

export default function DataBreach() {
  const [draft] = useState(() => readDraft<DataBreachDraft>(DRAFT_KEY));
  const [fileBukti, setFileBukti] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [jenisData, setJenisData] = useState<string[]>(draft?.jenisData ?? []);
  const [tanggalKejadian, setTanggalKejadian] = useState(draft?.tanggalKejadian ?? "");
  const [kanalMedia, setKanalMedia] = useState(draft?.kanalMedia ?? "");
  const [tindakanPelaku, setTindakanPelaku] = useState<string[]>(draft?.tindakanPelaku ?? []);
  const [detailKronologi, setDetailKronologi] = useState(draft?.detailKronologi ?? "");
  const [statusAkses, setStatusAkses] = useState(draft?.statusAkses ?? "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showInputLainnya, setShowInputLainnya] = useState(draft?.showInputLainnya ?? false);
  const [tindakanLainnya, setTindakanLainnya] = useState(draft?.tindakanLainnya ?? "");

  const isDirty = Boolean(
    fileBukti ||
      jenisData.length ||
      tanggalKejadian ||
      kanalMedia ||
      tindakanPelaku.length ||
      detailKronologi ||
      statusAkses ||
      showInputLainnya ||
      tindakanLainnya,
  );

  const leaveWarning = isDirty
    ? "Yakin mau kembali? Isian kamu belum dikirim dan hanya tersimpan sementara di perangkat ini. File bukti perlu dipilih ulang saat kamu kembali."
    : undefined;

  useEffect(() => {
    writeDraft<DataBreachDraft>(DRAFT_KEY, {
      jenisData,
      tanggalKejadian,
      kanalMedia,
      tindakanPelaku,
      detailKronologi,
      statusAkses,
      showInputLainnya,
      tindakanLainnya,
    });
  }, [
    jenisData,
    tanggalKejadian,
    kanalMedia,
    tindakanPelaku,
    detailKronologi,
    statusAkses,
    showInputLainnya,
    tindakanLainnya,
  ]);

  const toggleJenisData = (value: string) =>
    setJenisData((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );

  const toggleTindakanPelaku = (value: string) =>
    setTindakanPelaku((prev) =>
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

    if (file.size > 50 * 1024 * 1024) {
      alert("Ukuran file maksimal 50 MB.");
      return;
    }

    setFileBukti(file);
  };

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (jenisData.length === 0) {
      setError("Jenis data/akun yang bocor harus dipilih.");
      setLoading(false);
      return;
    }
    if (!tanggalKejadian) {
      setError("Tanggal kejadian harus diisi.");
      setLoading(false);
      return;
    }
    if (!kanalMedia) {
      setError("Kanal media kejadian harus dipilih.");
      setLoading(false);
      return;
    }
    if (tindakanPelaku.length === 0) {
      setError("Tindakan pelaku harus dipilih.");
      setLoading(false);
      return;
    }
    if (!fileBukti) {
      setError("File bukti percakapan harus diunggah.");
      setLoading(false);
      return;
    }

    const fd = new FormData();
    fd.append("jenisData", JSON.stringify(jenisData));
    fd.append("tanggalKejadian", tanggalKejadian);
    fd.append("kanalMedia", kanalMedia);
    fd.append("tindakanPelaku", JSON.stringify(tindakanPelaku));
    fd.append("detailKronologi", detailKronologi);
    fd.append("statusAkses", statusAkses);
    fd.append("fileBukti", fileBukti);

    try {
      const res = await fetch(apiUrl("/api/emergency/data"), {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Terjadi kesalahan saat mengirim laporan.");
      }
      clearDraft(DRAFT_KEY);
      navigate("/report/data", { state: { result: data } });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setError(error instanceof Error ? error.message : "Terjadi kesalahan saat mengirim laporan.");
    } finally {
      setLoading(false);
    }

  }

  return (
    <>
      {loading && <LoadingOverlay message="Sedang memproses laporan darurat..." />}
      <div className="mx-auto w-full pb-20 pt-[88px] sm:pt-24 lg:pt-32">
      <div
        id="hero-section"
        className="relative mx-auto flex w-full max-w-[1160px] flex-col justify-center px-4"
      >
        <div className="z-10 mb-4 sm:absolute sm:left-4 sm:top-0 sm:mb-0">
          <BackLink
            to="/emergency"
            label="pilihan kasus"
            confirmMessage={leaveWarning}
          />
        </div>
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
          <h1>Laporkan kebocoran data kamu</h1>
        </div>
        <form className="form-body" onSubmit={submitForm}>
          <fieldset className="form-fieldset">
            <legend className="form-legend">
              <span className="form-badge">
                1
              </span>
              <span>
                Jenis data/akun yang bocor
                <span className="ml-1 font-normal text-slate-400">
                  (pilih yang sesuai)
                </span>
              </span>
            </legend>
            <div className="flex flex-col gap-1">
              <label className="form-choice">
                <input
                  type="checkbox"
                  name="jenisData"
                  value="data-pribadi"
                  className="accent-[#52789A]"
                  id="data-pribadi"
                  checked={jenisData.includes("data-pribadi")}
                  onChange={() => toggleJenisData("data-pribadi")}
                />
                Data pribadi (nama, email, nomor telepon, dll)
              </label>

              <label className="form-choice">
                <input
                  type="checkbox"
                  name="jenisData"
                  value="media-sosial"
                  className="accent-[#52789A]"
                  id="media-sosial"
                  checked={jenisData.includes("media-sosial")}
                  onChange={() => toggleJenisData("media-sosial")}
                />
                Akun media sosial
              </label>

              <label className="form-choice">
                <input
                  type="checkbox"
                  name="jenisData"
                  value="perbankan"
                  className="accent-[#52789A]"
                  checked={jenisData.includes("perbankan")}
                  onChange={() => toggleJenisData("perbankan")}
                />
                Akun perbankan / finansial
              </label>

              <label className="form-choice">
                <input
                  type="checkbox"
                  name="jenisData"
                  value="kartu"
                  className="accent-[#52789A]"
                  checked={jenisData.includes("kartu")}
                  onChange={() => toggleJenisData("kartu")}
                />
                Data kartu kredit / debit
              </label>

              <label className="form-choice">
                <input
                  type="checkbox"
                  name="jenisData"
                  value="email"
                  className="accent-[#52789A]"
                  checked={jenisData.includes("email")}
                  onChange={() => toggleJenisData("email")}
                />
                Akun email
              </label>
            </div>
          </fieldset>

          <fieldset className="form-fieldset">
            <legend className="form-legend">
              <span className="form-badge">
                2
              </span>
              Tanggal Kejadian
            </legend>

            <input
              type="date"
              name="tanggalKejadian"
              lang="id-ID"
              className="form-input max-w-[220px]"
              value={tanggalKejadian}
              onChange={(e) => setTanggalKejadian(e.target.value)}
            />
          </fieldset>

          <fieldset className="form-fieldset">
            <legend className="form-legend">
              <span className="form-badge">
                3
              </span>
              <span>
                Kanal media kejadian
                <span className="ml-1 font-normal text-slate-400">
                  (pilih yang sesuai)
                </span>
              </span>
            </legend>

            <div className="flex flex-col gap-1">
              <label className="form-choice"
                onClick={() => setKanalMedia("whatsapp")}
              >
                <input
                  type="radio"
                  name="kanalMedia"
                  value="whatsapp"
                  className="accent-[#52789A]"
                  defaultChecked={kanalMedia === "whatsapp"}
                />
                WhatsApp
              </label>

              <label className="form-choice"
                onClick={() => setKanalMedia("instagram")}
              >
                <input
                  type="radio"
                  name="kanalMedia"
                  value="instagram"
                  className="accent-[#52789A]"
                  defaultChecked={kanalMedia === "instagram"}
                />
                Instagram
              </label>
            </div>
          </fieldset>

          <fieldset className="form-fieldset">
            <legend className="form-legend">
              <span className="form-badge">
                4
              </span>
              <span>
                Apa yang dilakukan pelaku?
                <span className="ml-1 font-normal text-slate-400">
                  (pilih yang sesuai)
                </span>
              </span>
            </legend>

            <div className="flex flex-col gap-1">
              <label className="form-choice"
              >
                <input
                  type="checkbox"
                  name="tindakanPelaku"
                  value="link"
                  className="accent-[#52789A]"
                  checked={tindakanPelaku.includes("link")}
                  onChange={() => toggleTindakanPelaku("link")}
                />
                Mengirim link mencurigakan
              </label>

              <label className="form-choice"
              >
                <input
                  type="checkbox"
                  name="tindakanPelaku"
                  value="data-pribadi"
                  className="accent-[#52789A]"

                  checked={tindakanPelaku.includes("data-pribadi")}
                  onChange={() => toggleTindakanPelaku("data-pribadi")}
                />
                Meminta data pribadi
              </label>

              <label className="form-choice"
              >
                <input
                  type="checkbox"
                  name="tindakanPelaku"
                  value="otp"
                  className="accent-[#52789A]"
                  checked={tindakanPelaku.includes("otp")}
                  onChange={() => toggleTindakanPelaku("otp")}
                />
                Meminta OTP/PIN/Password
              </label>

              <label className="form-choice"
              >
                <input
                  type="checkbox"
                  name="tindakanPelaku"
                  value="menyamar"
                  className="accent-[#52789A]"
                  checked={tindakanPelaku.includes("menyamar")}
                  onChange={() => toggleTindakanPelaku("menyamar")}
                />
                Mengaku sebagai pihak tertentu
              </label>

              <label className="form-choice"
  
              >
                <input
                  type="checkbox"
                  name="tindakanPelaku"
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
                  name="tindakanLainnya"
                  placeholder="Tulis yang dilakukan pelaku"
                  className="form-input"
                  defaultValue={draft?.tindakanLainnya ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                      setTindakanLainnya( value);
                    }
                  } }
                  onBlur={() => toggleTindakanPelaku(tindakanLainnya)}
                />
              )}
            </div>
          </fieldset>

          <fieldset className="form-fieldset">
            <legend className="form-legend items-start">
              <span className="form-badge">
                5
              </span>

              <span className="flex flex-col gap-1">
                <span className="font-semibold text-[#26384A]">
                  Bukti percakapan
                </span>

                <span className="text-xs font-normal text-slate-400">
                  Unggah file bukti percakapan (format JPG, PNG, WEBP maks 15 MB)
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

          <fieldset className="form-fieldset">
            <legend className="form-legend">
              <span className="form-badge">
                6
              </span>
              Detail Kronologi
              <span className="ml-1 font-normal text-slate-400">

              </span>
            </legend>
            <input
              type="text"
              placeholder="Contoh : waktu itu ketika saya ...."
              className="form-input"
              value={detailKronologi}
              onChange={(e) => setDetailKronologi(e.target.value)}
            />
          </fieldset>

          <fieldset className="form-fieldset">
            <legend className="form-legend">
              <span className="form-badge">
                7
              </span>
              Status Akses Perangkat
            </legend>
            <div className="form-choices">
              <label className="form-choice"
                htmlFor="bisaAkses"
              >
                <input
                  type="radio"
                  name="statusAkses"
                  value="bisaAkses"
                  className="accent-[#52789A]"
                  checked={statusAkses === "bisaAkses"}
                  onChange={() => setStatusAkses("bisaAkses")} 
                />
                Masih Bisa diakses
              </label>
              <label className="form-choice"
                htmlFor="tidakBisaAkses"
              >
                <input
                  type="radio"
                  name="statusAkses"
                  value="tidakBisaAkses"
                  className="accent-[#52789A]"
                  checked={statusAkses === "tidakBisaAkses"}
                  onChange={() => setStatusAkses("tidakBisaAkses")}
                />
                Tidak bisa diakses
              </label>
              <label className="form-choice"
                htmlFor="diketahuiLain"
              > 
                <input
                  type="radio"
                  name="statusAkses"
                  value="diketahuiLain"
                  className="accent-[#52789A]"
                  checked={statusAkses === "diketahuiLain"}
                  onChange={() => setStatusAkses("diketahuiLain")}
                />
                Diketahui pihak lain
              </label>
              <label className="form-choice"
                htmlFor="tidakTahu"
              >
                <input
                  type="radio"
                  name="statusAkses"
                  value="tidakTahu"
                  className="accent-[#52789A]"
                  checked={statusAkses === "tidakTahu"}
                  onChange={() => setStatusAkses("tidakTahu")}
                />
                Tidak tahu
              </label>
            </div>
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
            {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Menganalisis...
            </>
          ) : (
            "Analisis Darurat"
          )}
          </button>
        </form>
      </div>
      </div>
    </>
  );
}
        