export type OfficialContact = {
  name: string;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  instagram?: string | null;
  twitter?: string | null;
};

type OfficialContactsCardProps = {
  contacts?: OfficialContact[] | null;
  primary?: OfficialContact | null;
  emptyText?: string;
  title?: string;
};

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function toWaNumber(value: string) {
  const digits = onlyDigits(value);
  return digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
}

function instagramUrl(value: string) {
  const handle = value.trim().replace(/^@/, "").replace(/\s+/g, "");
  return handle ? `https://instagram.com/${handle}` : undefined;
}

function twitterHandles(value: string) {
  return value
    .split("/")
    .map((item) => item.trim().replace(/^@/, "").replace(/\s+/g, ""))
    .filter(Boolean);
}

export default function OfficialContactsCard({
  contacts,
  primary,
  emptyText = "Belum ada kontak resmi dari hasil analisis.",
  title = "Kontak Resmi",
}: OfficialContactsCardProps) {
  const list = (contacts?.length ? contacts : primary ? [primary] : []).filter(
    (item): item is OfficialContact => Boolean(item && item.name),
  );

  return (
    <div className="flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-lg shadow-[#8FA9C4]/20">
      <p className="text-[13px] font-semibold text-[#446685]">{title}</p>

      {list.length === 0 ? (
        <p className="text-[12px] leading-relaxed text-[#98A2B3]">{emptyText}</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {list.map((contact, index) => {
            const phoneDigits = onlyDigits(contact.phone ?? "");
            const waDigits = onlyDigits(contact.whatsapp ?? "");
            const igUrl = contact.instagram
              ? instagramUrl(contact.instagram)
              : undefined;
            const xHandles = contact.twitter
              ? twitterHandles(contact.twitter)
              : [];

            return (
              <li
                key={`${contact.name}-${index}`}
                className="flex flex-col gap-2 border-t border-[#E7EEF6] pt-3 first:border-t-0 first:pt-0"
              >
                <p className="text-[13px] font-bold leading-snug text-[#26384A]">
                  {contact.name}
                </p>

                {contact.phone && (
                  <a
                    href={`tel:${phoneDigits}`}
                    className="flex items-center gap-2 text-[12px] font-semibold text-[#446685] hover:text-[#1E40AF]"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FDECEC] text-[#E5484D]">
                      <PhoneIcon className="h-3 w-3" />
                    </span>
                    <span className="wrap-break-words">{contact.phone}</span>
                  </a>
                )}

                {contact.whatsapp && waDigits.length >= 8 && (
                  <a
                    href={`https://wa.me/${toWaNumber(contact.whatsapp)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-[12px] font-semibold text-[#1F7A53] hover:underline"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E7F6EF] text-[#1F7A53]">
                      <WhatsAppIcon className="h-3 w-3" />
                    </span>
                    <span className="wrap-break-words">{contact.whatsapp}</span>
                  </a>
                )}

                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 text-[12px] font-medium text-[#446685] hover:text-[#1E40AF]"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#3385FF]">
                      <MailIcon className="h-3 w-3" />
                    </span>
                    <span className="wrap-break-words">{contact.email}</span>
                  </a>
                )}

                {igUrl && (
                  <a
                    href={igUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-[12px] font-medium text-[#446685] hover:text-[#1E40AF]"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FDEBF3] text-[#C13584]">
                      <InstagramIcon className="h-3 w-3" />
                    </span>
                    <span className="wrap-break-words">{contact.instagram}</span>
                  </a>
                )}

                {xHandles.length > 0 && (
                  <div className="flex items-start gap-2 text-[12px] font-medium text-[#446685]">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EDEFF2] text-[#26384A]">
                      <XIcon className="h-3 w-3" />
                    </span>
                    <span className="flex flex-wrap gap-x-2 gap-y-1">
                      {xHandles.map((handle) => (
                        <a
                          key={handle}
                          href={`https://x.com/${handle}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-[#1E40AF] hover:underline"
                        >
                          @{handle}
                        </a>
                      ))}
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.9-4.44 9.9-9.9S17.5 2 12.04 2Zm0 18.02c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.1 8.1 0 0 1-1.24-4.35c0-4.48 3.65-8.12 8.13-8.12s8.12 3.64 8.12 8.12-3.64 8.21-8.12 8.21Zm4.47-6.08c-.24-.12-1.45-.71-1.67-.79-.22-.08-.39-.12-.55.13-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.45-1.35-1.69-.14-.24-.01-.38.11-.5.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.53 3H21l-7.19 8.21L22 21h-6.56l-5.14-6.72L4.4 21H1l7.69-8.78L2 3h6.72l4.65 6.15L17.53 3Zm-1.15 16h1.92L7.7 4.92H5.64L16.38 19Z" />
    </svg>
  );
}
