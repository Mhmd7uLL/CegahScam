import { useState } from "react";
import { Link } from "react-router-dom";

import pict1 from "../assets/Education/pict1-edu.webp";
import pict2 from "../assets/Education/pict2-edu.webp";
import pict3 from "../assets/Education/pict3-edu.webp";
import foto1 from "../assets/Education/carousel/carousel1.webp";
import foto2 from "../assets/Education/carousel/carousel2.webp";
import foto3 from "../assets/Education/carousel/carousel3.webp";
import foto4 from "../assets/Education/carousel/carousel4.webp";
import eduRobot from "../assets/Education/edu-robot.webp";
import Robot from "../components/Robot";

const modus = [
  {
    title: "Impersonation",
    body: "Pelaku berpura-pura menjadi pihak resmi, customer service, teman, atau institusi tertentu untuk mendapatkan kepercayaan korban.",
  },
  {
    title: "Urgency",
    body: "Pelaku menciptakan situasi mendesak agar korban tidak memiliki waktu untuk berpikir atau melakukan verifikasi.",
  },
  {
    title: "Threat",
    body: "Pelaku menggunakan rasa takut atau ancaman agar korban mengikuti instruksi yang diberikan.",
  },
  {
    title: "Fake Customer Service",
    body: "Pelaku menyamar sebagai customer service dari bank, platform, atau layanan tertentu untuk mendapatkan informasi atau membuat korban melakukan tindakan tertentu.",
  },
  {
    title: "Fake Investment",
    body: "Pelaku menawarkan investasi dengan cara yang dapat membuat korban tertarik untuk memberikan uang atau informasi.",
  },
  {
    title: "Phishing",
    body: "Pelaku menyamar sebagai pihak terpercaya untuk mengarahkan korban melakukan tindakan tertentu atau memberikan informasi.",
  },
];

const glossary = [
  {
    term: "Scam",
    definition:
      "Penipuan digital untuk mendapatkan uang atau data pribadi dengan cara menipu korban.",
  },
  {
    term: "Phishing",
    definition:
      "Jenis scam yang menggunakan pesan, email, atau situs palsu untuk mencuri informasi pribadi.",
  },
  {
    term: "Social Engineering",
    definition:
      "Teknik manipulasi psikologis untuk membuat korban memberikan informasi rahasia.",
  },
  {
    term: "OTP (One Time Password)",
    definition:
      "Kode verifikasi satu kali untuk mengamankan akun. Jangan pernah membagikannya kepada siapa pun.",
  },
  {
    term: "Malware",
    definition:
      "Perangkat lunak berbahaya yang dapat merusak perangkat atau mencuri data.",
  },
  {
    term: "Data Breach",
    definition:
      "Kebocoran data pribadi atau sensitif yang bisa disalahgunakan oleh pihak tidak bertanggung jawab.",
  },
  {
    term: "Link Mencurigakan",
    definition:
      "Tautan yang dapat mengarahkan ke situs palsu atau menginstal malware di perangkat.",
  },
  {
    term: "Investasi Bodong",
    definition:
      "Penawaran investasi palsu dengan iming-iming keuntungan besar dalam waktu singkat.",
  },
  {
    term: "Smishing",
    definition:
      "Penipuan melalui pesan singkat yang berisi link palsu atau permintaan informasi pribadi untuk menipu korban.",
  },
];

const chatExamples = [
  {
    image: foto1,
    alt: "Contoh pola chat scam 1",
    label: "Hadiah",
    title: "Hadiah palsu",
    description:
      "Pesan mengaku dari program loyalitas dan menjanjikan hadiah Rp2 juta. Korban diarahkan ke link verifikasi lalu diminta menyerahkan data rekening dan kode OTP.",
    flags: [
      "Nomor pengirim tidak dikenal.",
      "Hadiah datang tanpa pernah mengikuti program.",
      "Diminta mengisi OTP lewat sebuah link.",
    ],
    action:
      "Cek promo lewat aplikasi resmi. OTP tidak pernah diminta siapa pun, termasuk bank.",
  },
  {
    image: foto2,
    alt: "Contoh pola chat scam 2",
    label: "Bank",
    title: "Bank palsu",
    description:
      "Pelaku mengaku dari bank dan menyebut ada aktivitas mencurigakan. Korban diminta verifikasi dalam waktu singkat, lalu menyerahkan nomor kartu ATM, PIN, dan OTP.",
    flags: [
      "Bank tidak pernah meminta PIN atau OTP lewat chat.",
      "Nomor pengirim bukan kanal resmi.",
      "Ada ancaman rekening diblokir.",
    ],
    action:
      "Hubungi call center dari nomor di aplikasi resmi. Jangan klik link atau membalas pesan.",
  },
  {
    image: foto3,
    alt: "Contoh pola chat scam 3",
    label: "Marketplace",
    title: "Marketplace palsu",
    description:
      "Pesanan diklaim bermasalah dan korban diarahkan ke domain tiruan seperti t0koped1a.com untuk melakukan konfirmasi pembayaran.",
    flags: [
      "Domain tiruan: t0koped1a.com.",
      "Verifikasi dilakukan di luar aplikasi.",
      "Pesan dikirim dari nomor pribadi.",
    ],
    action:
      "Buka aplikasi marketplace langsung dan cek menu Pesanan. Jangan login lewat link.",
  },
  {
    image: foto4,
    alt: "Contoh pola chat scam 4",
    label: "Kurir",
    title: "Kurir palsu",
    description:
      "Paket diklaim gagal dikirim karena alamat tidak sesuai. Korban diminta membayar biaya admin lewat situs palsu cek-paket.sh0pee-expres.com.",
    flags: [
      "Domain tiruan: sh0pee-expres.com.",
      "Biaya tambahan diminta di luar aplikasi.",
      "Nomor pengirim tidak dikenal.",
    ],
    action:
      "Cek nomor resi di aplikasi belanja. Biaya kirim ulang yang sah muncul di aplikasi.",
  },
];

type SectionHeadingProps = {
  title: string;
  description: string;
};

function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="mb-8 lg:mb-10">
      <h2 className="max-w-2xl text-balance text-[26px] font-bold leading-tight tracking-tight text-[#446685] sm:text-[32px] lg:text-[40px]">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#52789A] lg:text-[15px]">
        {description}
      </p>
    </div>
  );
}

export default function Education() {
  const [query, setQuery] = useState("");
  const [activeChat, setActiveChat] = useState(0);

  const keyword = query.trim().toLowerCase();
  const filteredGlossary = keyword
    ? glossary.filter((item) =>
        `${item.term} ${item.definition}`.toLowerCase().includes(keyword),
      )
    : glossary;

  return (
    <div className="w-full pb-20 pt-32 lg:pt-36">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <section
          id="hero-section"
          className="grid min-h-[calc(100dvh_-_8rem)] items-center gap-10 lg:min-h-[calc(100dvh_-_9rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14"
        >
          <div>

            <h1 className="mt-5 text-balance text-[30px] font-bold leading-[1.1] tracking-tight text-[#446685] sm:text-[36px] lg:text-[40px]">
              Yuk kenali scam,
              <span className="block text-[#446685]">sebelum terjadi.</span>
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#52789A]">
              Pelajari cara penipuan bekerja, tanda-tanda yang perlu
              diperhatikan, dan langkah sederhana untuk melindungi diri.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#modus"
                className="rounded-full bg-[#446685] px-6 py-3 text-center text-sm font-semibold text-white shadow-lg transition hover:bg-[#35536C]"
              >
                Mulai dari modus terkini
              </a>
              <Link
                to="/analysis"
                className="rounded-full border border-[#446685]/25 bg-white/60 px-6 py-3 text-center text-sm font-semibold text-[#446685] transition hover:border-[#446685]/50 hover:bg-white"
              >
                Periksa pesan mencurigakan
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[460px]">
            <div className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-[#A5C6FF]/25 blur-2xl" />

            <div className="grid grid-cols-5 grid-rows-2 gap-3">
              <figure className="relative col-span-3 row-span-2 overflow-hidden rounded-2xl border border-white/70 shadow-lg">
                <img
                  src={pict1}
                  alt="Panggilan masuk dari nomor tak dikenal di ponsel"
                  className="h-full w-full object-cover"
                />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-[#111827]/70 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                  Panggilan tak dikenal
                </figcaption>
              </figure>

              <figure className="relative col-span-2 aspect-square overflow-hidden rounded-2xl border border-white/70 shadow-lg">
                <img
                  src={pict3}
                  alt="Pesan peringatan palsu yang masuk ke ponsel"
                  className="h-full w-full object-cover"
                />
                <figcaption className="absolute bottom-2 left-2 rounded-full bg-[#111827]/70 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                  Peringatan palsu
                </figcaption>
              </figure>

              <figure className="relative col-span-2 aspect-square overflow-hidden rounded-2xl border border-white/70 shadow-lg">
                <img
                  src={pict2}
                  alt="Ilustrasi pelaku membawa data pribadi korban"
                  className="h-full w-full object-cover"
                />
                <figcaption className="absolute bottom-2 left-2 rounded-full bg-[#111827]/70 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                  Data dicuri
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="modus" className="mt-20 scroll-mt-32 lg:mt-24">
          <SectionHeading
            title="Modus Scam Terkini"
            description="Pelajari bagaimana pelaku menggunakan pesan, akun palsu, link mencurigakan, dan berbagai cara lain untuk memperdaya korban."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modus.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/70 bg-white/65 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#A5C6FF] hover:bg-white hover:shadow-lg sm:p-6"
              >
                <h3 className="text-[17px] font-bold leading-snug text-[#446685]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#52789A]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="pola" className="mt-20 scroll-mt-32 lg:mt-24">
          <SectionHeading
            title="Pola Chat Scam yang Sering Terjadi"
            description="Beberapa pola chat penipuan, scam, dan phishing yang sering terjadi."
          />

          <div>
            <div className="flex flex-wrap gap-x-6 border-b border-[#446685]/15">
              {chatExamples.map((item, index) => {
                const isActive = activeChat === index;

                return (
                  <button
                    key={item.alt}
                    type="button"
                    onClick={() => setActiveChat(index)}
                    aria-pressed={isActive}
                    className={`relative -mb-px pb-3 text-sm font-semibold transition ${
                      isActive
                        ? "text-[#446685]"
                        : "text-[#52789A] hover:text-[#446685]"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#446685]" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-[220px_1fr] sm:gap-8">
              <div className="mx-auto w-full max-w-[220px] overflow-hidden rounded-xl shadow-lg sm:h-full">
                <img
                  src={chatExamples[activeChat].image}
                  alt={chatExamples[activeChat].alt}
                  className="aspect-[9/18] w-full object-cover object-top sm:h-full"
                />
              </div>

              <div className="flex flex-col rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                <h3 className="text-xl font-bold text-[#446685]">
                  {chatExamples[activeChat].title}
                </h3>
                <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#52789A]">
                  {chatExamples[activeChat].description}
                </p>

                <div className="mt-5">
                  <p className="text-[13px] font-bold text-[#446685]">
                    Tanda bahaya
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {chatExamples[activeChat].flags.map((flag) => (
                      <li
                        key={flag}
                        className="flex gap-2.5 text-[13px] leading-relaxed text-[#52789A]"
                      >
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#E11D48]" />
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-5">
                  <p className="text-[13px] font-bold text-[#446685]">
                    Yang perlu dilakukan
                  </p>
                  <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-[#52789A]">
                    {chatExamples[activeChat].action}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="glosarium" className="mt-20 scroll-mt-32 lg:mt-24">
          <SectionHeading
            title="Kamus Keamanan Digital"
            description="Kenali istilah penting seputar penipuan digital agar kamu lebih waspada dan terlindungi."
          />

          <div className="rounded-3xl border border-white/70 bg-white/55 p-5 shadow-sm sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-sm">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#52789A]"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari istilah, misalnya OTP"
                  aria-label="Cari istilah keamanan digital"
                  className="w-full rounded-full border border-[#446685]/20 bg-white/80 py-2.5 pl-10 pr-4 text-sm text-[#446685] outline-none transition placeholder:text-[#52789A]/70 focus:border-[#3385FF] focus:ring-2 focus:ring-[#3385FF]/20"
                />
              </div>

              <p className="text-[12px] text-[#52789A]">
                Menampilkan{" "}
                <span className="font-semibold text-[#446685]">
                  {filteredGlossary.length}
                </span>{" "}
                dari {glossary.length} istilah
              </p>
            </div>

            {filteredGlossary.length > 0 ? (
              <div className="mt-6 grid gap-x-10 sm:grid-cols-2">
                {filteredGlossary.map((item) => (
                  <div
                    key={item.term}
                    className="border-t border-[#446685]/12 py-4"
                  >
                    <h3 className="text-[15px] font-bold text-[#446685]">
                      {item.term}
                    </h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-[#52789A]">
                      {item.definition}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-6 rounded-xl bg-white/70 px-4 py-8 text-center text-sm text-[#52789A]">
                Belum ada istilah yang cocok. Coba kata kunci lain.
              </p>
            )}
          </div>
        </section>

        <section id="penutup" className="mt-20 lg:mt-24">
          <div className="relative overflow-hidden rounded-[28px] bg-[#111827] px-6 py-10 text-white shadow-xl sm:px-10 lg:px-14 lg:py-14">
            <div className="relative z-10 max-w-2xl">
              <blockquote className="text-[24px] font-bold leading-snug sm:text-[30px] lg:text-[34px]">
                “Satu ons pencegahan lebih berharga daripada satu pon
                pengobatan.”
              </blockquote>
              <p className="mt-4 text-sm text-white/60">— Benjamin Franklin</p>
            </div>

            <Robot
              src={eduRobot}
              alt="Maskot CegahScam"
              motion="float"
              interactive
              className="relative z-10 mx-auto mt-8 w-40 object-contain lg:absolute lg:bottom-0 lg:right-12 lg:mt-0 lg:w-56"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
