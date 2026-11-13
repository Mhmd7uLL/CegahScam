import type { MouseEvent } from "react";
import { Link } from "react-router-dom";

type BackLinkProps = {
  to: string;
  label: string;
  confirmMessage?: string;
};

export default function BackLink({ to, label, confirmMessage }: BackLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (confirmMessage && !window.confirm(confirmMessage)) {
      event.preventDefault();
    }
  }

  return (
    <Link
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
  );
}
