import {useNavigate} from "react-router-dom";
import AnalysisHook from "../../components/AnalysisHook";
import { useState } from "react";



export default function Phone() {

  const [nomorTelp, setNomorTelp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try{
      const res = await fetch("http://localhost:3000/api/analysis/phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nomorTelepon: nomorTelp })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Terjadi kesalahan saat mengirim laporan.");
      }
      navigate("/analysis/resultphone", { state: { result: data } });
        console.log("Laporan berhasil dikirim:", data);
        }
          
    catch (error) {
      console.error("Terjadi kesalahan:", error);
      setError(error instanceof Error ? error.message : "Terjadi kesalahan saat mengirim laporan.");
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
          <h1>Masukkan nomor telepon yang ingin diperiksa</h1>
        </div>
        <form className="form-body" onSubmit={submitForm}>
          <fieldset id="nomor-telepon" className="form-fieldset">
            <legend className="form-legend">
              <span className="form-badge">1</span>
              Nomor Telepon
            </legend>
            <input
              type="tel"
              inputMode="tel"
              name="nomorTelepon"
              placeholder="Contoh: 0812 3456 7890"
              className="form-input"
              value={nomorTelp}
              onChange={(e) => setNomorTelp(e.target.value)}
            />
          </fieldset>

          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

  

          <button 
          type="submit" 
          disabled={loading}
          className="form-submit disabled:cursor-not-allowed disabled:bg-[#5E83A5]/50">
            {loading ? "Mengirim..." : "Kirim Laporan"}
          </button>
        </form>
      </div>
    </div>
  );
}
