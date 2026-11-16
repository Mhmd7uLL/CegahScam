import { formatDraftTime } from "../lib/draft";

type DraftRestoredNoticeProps = {
  savedAt: number | null;
  onDiscard: () => void;
};

export default function DraftRestoredNotice({
  savedAt,
  onDiscard,
}: DraftRestoredNoticeProps) {
  return (
    <div
      role="status"
      className="mb-4 flex flex-col gap-2.5 rounded-xl border border-[#D9E6F2] bg-[#F4F8FC] px-4 py-3 text-[12.5px] text-[#4A6076] sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E2EEF9] text-[#2E5A88]">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <p className="leading-relaxed">
          <span className="font-semibold text-[#22384E]">
            Isian Anda dipulihkan otomatis.
          </span>{" "}
          Tersimpan {formatDraftTime(savedAt)}. File bukti perlu diunggah ulang.
        </p>
      </div>

      <button
        type="button"
        onClick={onDiscard}
        className="shrink-0 self-start rounded-lg border border-[#CFDDEA] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#44617B] transition hover:bg-[#EEF4FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A56DB]/40 sm:self-auto"
      >
        Mulai kosong
      </button>
    </div>
  );
}
