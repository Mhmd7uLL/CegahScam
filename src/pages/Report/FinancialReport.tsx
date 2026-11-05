import EmergencyHook from "../../components/EmergencyHook";
import Robot from "../../components/Robot";
import checklist from "../../assets/Icon/Checkboxes.svg";
import robotInfo from "../../assets/Emergency/robotInfo.webp";

export default function FinancialReport() {
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
            <p className="flex h-6 w-6 items-center justify-center rounded-full bg-[#667085] text-[12px] text-white">
              2
            </p>
            <p className="text-[11px] text-[#667085] sm:text-sm">Isi Data</p>
          </div>
          <div className="h-px flex-1 bg-[#667085]/50" />
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5E83A5] text-[12px] text-white">
              3
            </p>
            <p className="text-[11px] font-bold text-[#5E83A5] sm:text-sm">
              Hasil Laporan
            </p>
          </div>
        </div>
      </div>

      <div
        id="body-input"
        className="reveal mx-auto mt-8 flex w-full max-w-[1160px] flex-col rounded-[30px] bg-white/50 px-4 py-8 shadow-xl sm:rounded-[40px] sm:px-8 lg:mt-10 lg:rounded-[50px] lg:px-12"
      >
        <div
          id="title"
          className="mx-auto flex w-full max-w-[900px] items-start gap-4"
        >
          <div className="flex-1">
            <div className="flex flex-row items-center gap-3">
              <img src={checklist} alt="" className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
              <h1 className="text-[21px] font-bold leading-snug text-black sm:text-[25px]">
                Laporan berhasil dibuat
              </h1>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-[#3F4E5E] sm:ml-10 sm:text-base">
              Berdasarkan bukti, kronologi sudah berhasil disusun dengan AI tanpa
              mengubah kronologi asli. Hubungi instansi terkait yang disarankan
              untuk melapor.
            </p>
          </div>

          <Robot
            src={robotInfo}
            alt="Maskot CegahScam"
            motion="bob"
            interactive
            className="hidden h-24 w-auto shrink-0 object-contain sm:block lg:h-30"
          />
        </div>

        <div
          id="kronologi-section"
          className="mx-auto my-8 flex w-full max-w-[900px] flex-col gap-3 lg:my-10"
        >
          <h1 className="text-[21px] font-bold text-black sm:text-[25px]">
            Kronologi
          </h1>
          <div className="h-[220px] w-full rounded-[25px] bg-[#9FB6CA] sm:h-[320px] lg:h-100"></div>
          <button className="w-40 max-w-full rounded-[40px] bg-[#ADCEFF] py-2 font-bold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#85B6FF]">
            Unduh PDF
          </button>
        </div>

        <div
          id="solusi-section"
          className="mx-auto flex w-full max-w-[900px] flex-col gap-3"
        >
          <h1 className="text-[21px] font-bold text-black sm:text-[25px]">
            Langkah penanganan darurat
          </h1>
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex gap-3 font-bold">
                <p className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#52789A] text-sm text-white">
                  1
                </p>
                <p>Hubungi Call Center Bank Pengirim</p>
              </div>
              <p className="mt-1 text-[14px] leading-relaxed text-[#3F4E5E] sm:ml-9 sm:text-base">
                Telepon CS resmi bank kamu sekarang untuk meminta penguncian sementara rekening penipu dan mengamankan akun pribadi kamu.
              </p>
              <button className="mt-3 w-40 max-w-full rounded-[40px] bg-[#ADCEFF] py-2 font-bold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#85B6FF] sm:ml-9">
                Hubungi CS Bank
              </button>
            </div>
            <div>
              <div className="flex gap-3 font-bold">
                <p className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#52789A] text-sm text-white">
                  2
                </p>
                <p>Amankan Akses M-Banking &amp; PIN</p>
              </div>
              <p className="mt-1 text-[14px] leading-relaxed text-[#3F4E5E] sm:ml-9 sm:text-base">
                Ganti PIN M-Banking, password Internet Banking, dan PIN ATM pribadi kamu dari perangkat yang aman.
              </p>
            </div>
            <div>
              <div className="flex gap-3 font-bold">
                <p className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#52789A] text-sm text-white">
                  3
                </p>
                <p>Bawa Draf Laporan ke Kepolisian &amp; Portal Resmi</p>
              </div>
              <p className="mt-1 text-[14px] leading-relaxed text-[#3F4E5E] sm:ml-9 sm:text-base">
                Unduh draf kronologi resmi (PDF) dari halaman ini untuk dilampirkan saat membuat Laporan Polisi (STPL) di Polsek/Polres atau melapor ke CekRekening.id.
              </p>
              <button className="mt-3 w-50 max-w-full rounded-[40px] bg-[#ADCEFF] py-2 font-bold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#85B6FF] sm:ml-9">
                Lapor CekRekening.id
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
