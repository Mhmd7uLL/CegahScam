import robot from "../assets/Emergency/robot1.webp";

type LoadingOverlayProps = {
  message?: string;
};

export default function LoadingOverlay({
  message = "Sedang menganalisis laporanmu...",
}: LoadingOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#26384A]/35 px-5 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="flex w-full max-w-sm flex-col items-center rounded-3xl bg-white px-8 py-8 text-center shadow-2xl shadow-[#26384A]/25">
        <div className="relative flex h-32 w-32 items-center justify-center">
          <div className="absolute inset-2 animate-spin rounded-full border-4 border-[#DCEAF8] border-t-[#5E83A5]" />
          <div className="absolute h-24 w-24 rounded-full bg-[#F0F6FB]" />
          <img
            src={robot}
            alt="Maskot CegahScam sedang memproses"
            className="relative h-24 w-auto animate-bounce object-contain drop-shadow-lg"
          />
        </div>
        <p className="mt-5 text-lg font-bold text-[#26384A]">{message}</p>
        <p className="mt-2 text-sm leading-relaxed text-[#667085]">
          Tunggu sebentar, kami sedang merapikan informasi yang kamu kirim.
        </p>
        <div className="mt-5 flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#5E83A5]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#85B6FF] [animation-delay:200ms]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#ADCEFF] [animation-delay:400ms]" />
        </div>
      </div>
    </div>
  );
}
