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
              <img
                src="/logo2.png"
                alt="Logo CegahScam"
                className="h-4 lg:h-8 w-auto shrink-0"
              />

              <h4 className="font-bold">
                Cegah<span className="text-[#1E40AF]">Scam</span>
              </h4>
            </div>

            <p className="font-semibold italic max-[600px]:text-[10px]">
              "Kenali. Pahami. Hadapi."
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-end gap-x-1.5 font-semibold text-[#3F4652]">
            <Link
              to="/"
              className="hover:text-[#1E40AF] max-[600px]:text-[10px]"
            >
              Beranda
            </Link>
            <span>·</span>

            <Link
              to="/analysis"
              className="hover:text-[#1E40AF] max-[600px]:text-[10px]"
            >
              Analisis
            </Link>
            <span>·</span>

            <Link
              to="/emergency"
              className="hover:text-[#1E40AF] max-[600px]:text-[10px]"
            >
              Darurat
            </Link>
            <span>·</span>

            <Link
              to="/education"
              className="hover:text-[#1E40AF] max-[600px]:text-[10px]"
            >
              Edukasi
            </Link>
          </nav>
        </div>

        <hr className="my-2 border-[#AAB5C5]" />

        <p className="text-[#343B48] max-[600px]:text-[10px]">
          © 2026 CegahScam. Hak cipta dilindungi. • Kebijakan Privasi
        </p>
      </div>
    </footer>
  );
}
