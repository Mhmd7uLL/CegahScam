import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-linear-to-r from-[#E5EAF3] to-[#C8D4E7] text-[#26384A]">
      <div className="w-full bg-[#66738A] font-medium px-4 py-2 text-center text-white">
        INFORMASI : Data yang anda masukkan akan otomatis terhapus demi keamanan
        privasi bersama
      </div>

      <div className="mx-auto py-5 w-[80%] max-w-270">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-4 -skew-x-12 rounded-sm bg-[#4F46E5]" />

              <h4 className="font-bold">
                Cegah<span className="text-[#1E40AF]">Scam</span>
              </h4>
            </div>

            <p className="font-semibold italic">"Kenali. Pahami. Hadapi."</p>
          </div>

          <nav className="flex flex-wrap items-center justify-end gap-x-1.5 font-semibold text-[#3F4652]">
            <Link to="/" className="hover:text-[#1E40AF]">
              Beranda
            </Link>
            <span>·</span>

            <Link to="/analisis" className="hover:text-[#1E40AF]">
              Analisis
            </Link>
            <span>·</span>

            <Link to="/darurat" className="hover:text-[#1E40AF]">
              Darurat
            </Link>
            <span>·</span>

            <Link to="/edukasi" className="hover:text-[#1E40AF]">
              Edukasi
            </Link>
          </nav>
        </div>

        <hr className="my-2 border-[#AAB5C5]" />

        <p className="text-[#343B48]">
          © 2026 CegahScam. All rights reserved. • Kebijakan Privasi
        </p>
      </div>
    </footer>
  );
}
