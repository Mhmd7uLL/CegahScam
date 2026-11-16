import { useEffect, useId, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";

type BackLinkProps = {
  to: string;
  label: string;
  /** Bila diisi, tombol kembali akan menampilkan dialog konfirmasi. */
  confirmMessage?: string;
  confirmTitle?: string;
  confirmAction?: string;
  cancelAction?: string;
  /** Dipanggil setelah pengguna memastikan ingin kembali. */
  onConfirmLeave?: () => void;
};

export default function BackLink({
  to,
  label,
  confirmMessage,
  confirmTitle = "Kembali ke halaman sebelumnya?",
  confirmAction = "Ya, kembali",
  cancelAction = "Lanjut mengisi",
  onConfirmLeave,
}: BackLinkProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const titleId = useId();
  const descriptionId = useId();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    cancelRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!confirmMessage) return;

    // Biarkan perilaku bawaan untuk klik dengan modifier (buka tab baru).
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
    linkRef.current?.focus();
  }

  function confirmLeave() {
    setOpen(false);
    onConfirmLeave?.();
    navigate(to);
  }

  return (
    <>
      <Link
        ref={linkRef}
        to={to}
        onClick={handleClick}
        aria-label={`Kembali ke ${label}`}
        title={`Kembali ke ${label}`}
        className="group inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE6EF] bg-white text-[13px] font-semibold text-[#5E83A5] shadow-sm shadow-[#8FA9C4]/10 transition duration-200 hover:border-[#C3D3E2] hover:bg-[#F7FAFD] hover:text-[#1A56DB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A56DB]/40 sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span className="hidden sm:inline">Kembali</span>
      </Link>

      {confirmMessage &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-[#0F2233]/45 p-4 backdrop-blur-[2px] sm:items-center"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeDialog();
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              className="w-full max-w-[440px] rounded-2xl border border-[#E3EAF2] bg-white p-6 shadow-2xl shadow-[#0F2233]/25 sm:p-7"
            >
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FDF3E2] text-[#B26A00]">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                  </svg>
                </span>

                <div className="min-w-0">
                  <h2
                    id={titleId}
                    className="text-[15px] font-bold leading-snug text-[#1F3245]"
                  >
                    {confirmTitle}
                  </h2>
                  <p
                    id={descriptionId}
                    className="mt-1.5 text-[13px] leading-relaxed text-[#5B6B7C]"
                  >
                    {confirmMessage}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
                <button
                  ref={cancelRef}
                  type="button"
                  onClick={closeDialog}
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-[#DCE6EF] bg-white px-4 text-[13px] font-semibold text-[#456179] transition hover:bg-[#F7FAFD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A56DB]/40"
                >
                  {cancelAction}
                </button>
                <button
                  type="button"
                  onClick={confirmLeave}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-[#1F3A5F] px-4 text-[13px] font-semibold text-white transition hover:bg-[#172C49] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A56DB]/40"
                >
                  {confirmAction}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
