import { Link } from "react-router-dom";

const links = [
  { to: "/", label: "Beranda" },
  { to: "/analysis", label: "Analisis" },
  { to: "/emergency", label: "Darurat" },
  { to: "/education", label: "Edukasi" },
];

export default function Footer() {
  return (
    <footer className="mt-16 w-full bg-linear-to-r from-[#E5EAF3] to-[#C8D4E7] text-[#26384A] lg:mt-24">
      <div className="bg-[#66738A] px-4 py-2.5 text-center text-[11px] font-medium leading-relaxed text-white sm:text-[13px]">
        INFORMASI : Data yang anda masukkan akan otomatis terhapus demi keamanan
        privasi bersama
      </div>

      <div className="mx-auto w-full max-w-[1080px] px-5 py-8 sm:px-6 lg:py-10">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <div className="flex flex-col items-center gap-1.5 sm:items-start">
            <Link
              to="/"
              className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <img
                src="/logo2.png"
                alt="Logo CegahScam"
                className="h-6 w-auto shrink-0 lg:h-8"
              />
              <h4 className="text-[15px] font-bold lg:text-base">
                Cegah<span className="text-[#1E40AF]">Scam</span>
              </h4>
            </Link>

            <p className="text-[11px] font-semibold italic sm:text-[13px]">
              "Kenali. Pahami. Hadapi."
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-[11px] font-semibold text-[#3F4652] sm:justify-end sm:text-[13px]">
            {links.map((link, index) => (
              <span key={link.to} className="flex items-center gap-x-1.5">
                {index > 0 && <span aria-hidden="true">·</span>}
                <Link
                  to={link.to}
                  className="transition-colors duration-200 hover:text-[#1E40AF]"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>

        <hr className="my-5 border-[#AAB5C5]" />

        <p className="text-center text-[10px] leading-relaxed text-[#343B48] sm:text-left sm:text-[12px]">
          © 2026 CegahScam. Hak cipta dilindungi. • Kebijakan Privasi
        </p>
      </div>
    </footer>
  );
}
