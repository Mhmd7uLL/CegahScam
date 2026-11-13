import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AnalysisHook from "../../components/AnalysisHook";
import BackLink from "../../components/BackLink";
import { apiUrl } from "../../lib/api";
import { clearDraft, readDraft, writeDraft } from "../../lib/draft";
import LoadingOverlay from "../../components/LoadingOverlay";

type ScreenshotDraft = {
  platform: string;
};

const DRAFT_KEY = "analysis-screenshot";

export default function Screenshot() {
  const [draft] = useState(() => readDraft<ScreenshotDraft>(DRAFT_KEY));
  const [fileBukti, setFileBukti] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [platform, setPlatform] = useState(draft?.platform ?? "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isDirty = Boolean(fileBukti || platform);
  const leaveWarning = isDirty
    ? "Yakin mau kembali? Isian kamu belum dikirim dan hanya tersimpan sementara di perangkat ini. File bukti perlu diunggah ulang saat kamu kembali."
    : undefined;

  useEffect(() => {
    writeDraft<ScreenshotDraft>(DRAFT_KEY, { platform });
  }, [platform]);

  const handlePilihFile = (file?: File) => {
    if (!file) return;

    const formatValid = ["image/jpeg", "image/png", "webp"];

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

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!fileBukti) {
      setError("File bukti pesan harus diunggah.");
      setLoading(false);
      return;
    }

    const fd = new FormData();
    fd.append("platform", platform);
    fd.append(
      "fileBukti",
      fileBukti
    );

    try{
        const res = await fetch(apiUrl("/api/analysis/screenshot"), {
          method: "POST",
          body: fd,
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Terjadi kesalahan saat mengirim laporan.");
        }
        clearDraft(DRAFT_KEY);
        navigate("/analysis/resultscreenshot", { state: { result: data } });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setError(error instanceof Error ? error.message : "Terjadi kesalahan saat mengirim laporan.");   

    } finally {
      setLoading(false);
    }
  }
    


  return (
    <>
      {loading && <LoadingOverlay message="Sedang membaca screenshot..." />}
      <div className="mx-auto w-full pb-20 pt-[88px] sm:pt-24 lg:pt-32">
      <div
        id="hero-section"
        className="relative mx-auto flex w-full max-w-[1160px] flex-col justify-center px-4"
      >
        <div className="z-10 mb-4 sm:absolute sm:left-4 sm:top-0 sm:mb-0">
          <BackLink
            to="/analysis"
            label="pilihan analisis"
            confirmMessage={leaveWarning}
          />
        </div>
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
        <form className="form-body" onSubmit={submitForm}>
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
              <label 
              className="form-choice"
              onClick={() => setPlatform("whatsapp")}
              >
                <input
                  type="radio"
                  name="kanalMedia"
                  value="whatsapp"
                  defaultChecked={platform === "whatsapp"}
                />
                WhatsApp
              </label>
              <label 
              className="form-choice"
              onClick={() => setPlatform("instagram")}
              >
                <input
                  type="radio"
                  name="kanalMedia"
                  value="instagram"
                  defaultChecked={platform === "instagram"}
                />
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
                  Unggah file bukti pesan (format JPG, PNG, WEBP maks 15 MB)
                </span>
              </span>
            </legend>

            <input
              id="bukti-file"
              type="file"
              accept=".jpg,.jpeg,.png,.webp, image/jpeg,image/png,image/webp"
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
                  : "border-[#B9C8DA] bg-[#C9D7E3]/60 hover:border-[#52789A]"
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

  {error && (
            <div className="mt-4 rounded-md bg-[#FEE2E2] p-4 text-sm text-[#B91C1C]">
              {error}
            </div>
          )}

          <button
          type="submit"
          disabled={loading}
          className="form-submit disabled:cursor-not-allowed disabled:bg-[#A5C6FF]/50 disabled:text-white/50">
           {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Menganalisis...
            </>
          ) : (
            "Analisis Screenshot"
          )}
          </button>
        </form>
      </div>
      </div>
    </>
  );
}
