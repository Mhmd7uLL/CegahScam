import EmergencyHook from "../../components/EmergencyHook";
import checklist from "../../assets/Icon/Checkboxes.svg";
import robotInfo from "../../assets/Emergency/robotInfo.webp";

export default function FinancialReport() {
    return (
    <div className="mx-auto py-20">
      <div
        id="hero-section"
        className="flex flex-col justify-center w-290 h-80 mt-15"
      >
        <EmergencyHook />
        <div className="flex flex-row justify-around items-center mx-auto shadow-xl rounded-[50px] w-200 h-80 my-5">
          <div className="flex flex-col gap-2 items-center text-center">
            <p className="bg-[#667085] w-6 h-6 text-white rounded-full">1</p>
            <p className="text-[#667085]">Pilih kasus</p>
          </div>
          ----
          <div className="flex flex-col gap-2 items-center text-center">
            <p className="bg-[#667085] w-6 h-6 text-white rounded-full">2</p>
            <p className="text-[#667085]">Input Data</p>
          </div>
          ----
          <div className="flex flex-col gap-2 items-center text-center">
            <p className="bg-[#5E83A5] w-6 h-6 text-white rounded-full">3</p>
            <p className="text-[#5E83A5] font-bold">Hasil Laporan</p>
          </div>
        </div>
      </div>

      <div
        id="body-input"
        className="flex flex-col bg-white/50 shadow-xl w-290 h-290 mt-10 rounded-[50px]"
      >
        <div
          id="title"
          className="w-240 mx-auto mt-10"
        >
          <div className="flex flex-row gap-3 items-center">
            <img src={checklist} className="w-7 h-7" />
            <h1 className="font-bold text-black text-[25px]">
              Laporan Berhasil dibuat
            </h1>
          </div>
          <p className="ml-10">
            Berdasarkan bukti, kronologi sudah berhasil disusun dengan Ai tanpa
            merubah kronologi asli, hubungi intansi terkait yang disarankan
            untuk melapor.
          </p>
        </div>

        <div id="kronologi-section" className="flex flex-col gap-3 mx-auto my-10 w-220">
            <h1 className="font-bold text-black text-[25px]">Kronologi</h1>
            <div className="w-220 h-100 bg-[#9FB6CA] rounded-[25px]"></div>
            <button className="bg-[#ADCEFF] w-40 py-2 rounded-[40px] text-white font-bold shadow-md hover:cursor-pointer hover:bg-[#85B6FF]">Unduh PDF</button>
        </div>

        <div id="solusi-section" className="flex flex-col gap-3 mx-auto w-220">
            <h1 className="font-bold text-black text-[25px]">Langkah penanganan darurat</h1>
            <div className="flex flex-col gap-5">
                <div>
                    <div className="flex font-bold gap-3">
                        <p className="flex items-center justify-center text-white text-sm w-6 h-6 bg-[#52789A] rounded-full">1</p>
                        <p>Hubungi Call Center Bank Pengirim</p>
                    </div>
                    <p className="ml-9 mb-3">Telepon CS resmi bank kamu sekarang untuk meminta penguncian sementara rekening penipu dan mengamankan akun pribadi kamu.</p>
                    <button className="ml-9 bg-[#ADCEFF] w-40 py-2 rounded-[40px] text-white font-bold shadow-md hover:cursor-pointer hover:bg-[#85B6FF]">Call CS Bank</button>
                </div>
                <div>
                    <div className="flex font-bold gap-3">
                        <p className="flex items-center justify-center text-white text-sm w-6 h-6 bg-[#52789A] rounded-full">2</p>
                        <p>Amankan Akses M-Banking & PIN</p>
                    </div>
                    <p className="ml-9">Ganti PIN M-Banking, password Internet Banking, dan PIN ATM pribadi kamu dari perangkat yang aman.</p>
                </div>
                <div>
                    <div className="flex font-bold gap-3">
                        <p className="flex items-center justify-center text-white text-sm w-6 h-6 bg-[#52789A] rounded-full">3</p>
                        <p>Bawa Draf Laporan ke Kepolisian & Portal Resmi</p>
                    </div>
                    <p className="ml-9 mb-3">Unduh draf kronologi resmi (PDF) dari halaman ini untuk dilampirkan saat membuat Laporan Polisi (STPL) di Polsek/Polres atau melapor ke CekRekening.id.</p>
                    <button className="ml-9 bg-[#ADCEFF] w-50 py-2 rounded-[40px] text-white font-bold shadow-md hover:cursor-pointer hover:bg-[#85B6FF]">Lapor CekRekening.id</button>
                </div>
            </div>
        </div>
        <img src={robotInfo} className="absolute w-90 h-70 right-25 bottom-45"/>
      </div>
    </div>
  );
}