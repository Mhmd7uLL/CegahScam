import { useEffect, useRef, useState } from "react";

type ConsentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
};

export default function ConsentModal({
  isOpen,
  onClose,
  onContinue,
}: ConsentModalProps) {
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [hasReadPrivacy, setHasReadPrivacy] = useState(false);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const documentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("termsConditions");

  const handleScroll = () => {
    const element = documentRef.current;

    if (!element) return;

    const isBottom =
      element.scrollTop + element.clientHeight >= element.scrollHeight - 5;

    if (isBottom) {
      if (activeSection === "termsConditions") {
        setHasReadTerms(true);
      } else {
        setHasReadPrivacy(true);
      }
    }
  };

  const [isAtBottom, setIsAtBottom] = useState(false);

  // Reset seluruh persetujuan ketika modal dibuka
  useEffect(() => {
    if (isOpen) {
      setActiveSection("termsConditions");

      setHasReadTerms(false);
      setHasReadPrivacy(false);

      setAgreeTerms(false);
      setAgreePrivacy(false);
    }
  }, [isOpen]);

  // Reset posisi scroll setiap kali tab berubah
  useEffect(() => {
    if (!isOpen) return;

    const element = documentRef.current;

    if (!element) return;

    element.scrollTop = 0;

    // Jika konten tidak membutuhkan scroll,
    // otomatis tandai dokumen sudah dibaca.
    if (element.scrollHeight <= element.clientHeight + 5) {
      if (activeSection === "termsConditions") {
        setHasReadTerms(true);
      } else {
        setHasReadPrivacy(true);
      }
    }
  }, [isOpen, activeSection]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 md:p-5">
      {/* Modal */}
      <div className="w-full max-w-2xl max-h-[90vh] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5">
          <div>
            <h2 className="text-xl font-semibold text-[#183B56]">
              Persetujuan Pengguna
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Silakan baca ketentuan CegahScam sebelum melanjutkan.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup persetujuan"
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex gap-2 px-5 py-3">
          <button
            type="button"
            onClick={() => setActiveSection("termsConditions")}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === "termsConditions"
                ? "bg-[#183B56] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Terms & Conditions
            {hasReadTerms && " ✓"}
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("privacyPolicy")}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === "privacyPolicy"
                ? "bg-[#183B56] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Privacy Policy
            {hasReadPrivacy && " ✓"}
          </button>
        </div>

        {/* Document Content */}
        <div
          ref={documentRef}
          onScroll={handleScroll}
          className="flex-1 min-h-0 overflow-y-auto p-5"
        >
          {activeSection === "termsConditions" && (
            <section className="space-y-5 text-sm text-gray-700 leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-[#183B56] mb-2">
                  1. Ketentuan Umum
                </h3>
                <p>
                  Selamat datang di CegahScam. CegahScam merupakan layanan
                  digital yang bertujuan membantu pengguna mengenali dan
                  memahami potensi penipuan digital. Dengan membuat akun dan
                  menggunakan layanan CegahScam, pengguna dianggap telah membaca
                  dan menyetujui syarat dan ketentuan yang berlaku.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#183B56] mb-2">
                  2. Ketentuan Informasi Pengguna
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Pengguna wajib memberikan informasi yang benar, akurat, dan
                    tidak menyesatkan ketika melakukan pendaftaran.
                  </li>
                  <li>
                    Pengguna bertanggung jawab menjaga kerahasiaan informasi
                    autentikasi akun masing-masing.
                  </li>
                  <li>
                    Pengguna dilarang menggunakan identitas atau informasi akun
                    milik orang lain tanpa izin yang sah.
                  </li>
                  <li>
                    Pengguna wajib memberitahukan pengelola apabila mengetahui
                    adanya penggunaan akun tanpa izin.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#183B56] mb-2">
                  3. Pengiriman dan Penggunaan Informasi
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Pengguna bertanggung jawab atas informasi yang dikirimkan
                    melalui layanan CegahScam.
                  </li>
                  <li>
                    Pengguna dilarang mengirimkan informasi palsu, manipulatif,
                    mengandung ancaman, atau bertujuan merugikan pihak lain.
                  </li>
                  <li>
                    Pengguna tidak diperkenankan menyebarkan data pribadi milik
                    orang lain tanpa izin atau dasar hukum yang sah.
                  </li>
                  <li>
                    Pengguna wajib memastikan bahwa informasi yang disampaikan
                    tidak melanggar hak privasi maupun hak hukum pihak lain.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#183B56] mb-2">
                  4. Hak Pembatasan dan Penangguhan Layanan
                </h3>
                <p className="mb-2">
                  CegahScam berhak membatasi, menangguhkan, atau menghentikan
                  akses pengguna apabila ditemukan indikasi penyalahgunaan
                  layanan, termasuk:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Penggunaan layanan untuk melakukan penipuan atau tindakan
                    yang melanggar hukum.
                  </li>
                  <li>
                    Pengiriman informasi yang sengaja dibuat untuk menyesatkan
                    pengguna lain.
                  </li>
                  <li>
                    Pengumpulan, pengungkapan, atau penyebaran data pribadi
                    pihak lain secara tidak sah.
                  </li>
                  <li>
                    Percobaan mengakses, mengubah, atau mengganggu sistem dan
                    data tanpa kewenangan.
                  </li>
                </ul>
                <p className="mt-2">
                  Pembatasan dilakukan secara proporsional dengan
                  mempertimbangkan tingkat pelanggaran dan ketentuan hukum yang
                  berlaku. Pengguna tetap dapat mengajukan keberatan melalui
                  kontak resmi CegahScam.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#183B56] mb-2">
                  5. Hak dan Kewajiban Terkait Data
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Pengguna wajib memberikan informasi yang relevan dan akurat
                    sesuai kebutuhan layanan.
                  </li>
                  <li>
                    Pengguna berhak meminta akses, perbaikan, pembaruan,
                    penghapusan, dan pembatasan pemrosesan data pribadi sesuai
                    ketentuan yang berlaku.
                  </li>
                  <li>
                    Pengguna dapat menarik kembali persetujuan pemrosesan data
                    pribadi apabila persetujuan digunakan sebagai dasar
                    pemrosesannya.
                  </li>
                  <li>
                    Pengguna dilarang menggunakan hak akses untuk memperoleh,
                    mengubah, atau menyebarkan data milik pihak lain tanpa
                    kewenangan.
                  </li>
                </ul>
                <p className="mt-2">
                  Permintaan pengguna akan ditangani sesuai ketentuan
                  pelindungan data pribadi dan tidak menghilangkan kewajiban
                  pengelola untuk menyimpan data apabila diwajibkan oleh hukum.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#183B56] mb-2">
                  6. Tanggung Jawab dan Batasan Layanan
                </h3>
                <p>
                  Informasi dan hasil analisis yang disediakan CegahScam
                  merupakan sarana pendukung untuk meningkatkan kewaspadaan
                  terhadap potensi penipuan digital. Hasil analisis tidak
                  menjamin secara mutlak bahwa suatu nomor, tautan, atau
                  informasi tertentu aman maupun berbahaya. Pengguna tetap
                  bertanggung jawab melakukan pemeriksaan lebih lanjut sebelum
                  mengambil keputusan.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#183B56] mb-2">
                  7. Perubahan Ketentuan
                </h3>
                <p>
                  CegahScam dapat memperbarui syarat dan ketentuan apabila
                  terdapat perubahan layanan, kebijakan pengelolaan data, atau
                  ketentuan hukum. Perubahan akan diinformasikan melalui media
                  komunikasi yang tersedia.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#183B56] mb-2">
                  8. Kontak
                </h3>
                <p>
                  Pertanyaan, pengaduan, atau keberatan terkait ketentuan
                  layanan dapat disampaikan melalui kontak resmi CegahScam:
                </p>
                <p className="font-medium mt-2">
                  Email: [Email Resmi CegahScam]
                </p>
              </div>
            </section>
          )}

          {activeSection === "privacyPolicy" && (
            <section className="space-y-5 text-sm text-gray-700 leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-[#183B56] mb-2">
                  1. Pendahuluan
                </h3>
                <p>
                  CegahScam menghargai privasi dan berkomitmen melindungi data
                  pribadi pengguna. Kebijakan ini menjelaskan bagaimana data
                  pribadi diperoleh, digunakan, disimpan, dibagikan, dan dihapus
                  selama pengguna menggunakan layanan CegahScam. Pengelolaan
                  data dilakukan secara transparan, terbatas, dan berdasarkan
                  dasar pemrosesan yang sah.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#183B56] mb-2">
                  2. Jenis Data yang Dikumpulkan
                </h3>

                <p className="font-medium mb-2">A. Data Identitas dan Akun</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Username atau nama pengguna.</li>
                  <li>Alamat email.</li>
                  <li>
                    Informasi autentikasi akun, seperti kata sandi yang disimpan
                    dalam bentuk hash.
                  </li>
                </ul>

                <p className="font-medium mt-3 mb-2">
                  B. Data yang Dikirimkan Pengguna
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Nomor telepon atau tautan yang dilaporkan.</li>
                  <li>Isi laporan atau informasi terkait dugaan penipuan.</li>
                  <li>
                    Gambar atau dokumen yang dikirimkan apabila fitur tersebut
                    tersedia.
                  </li>
                </ul>

                <p className="font-medium mt-3 mb-2">
                  C. Data Teknis dan Aktivitas
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Alamat IP apabila dicatat oleh sistem.</li>
                  <li>Informasi perangkat dan browser.</li>
                  <li>
                    Waktu akses dan aktivitas yang berkaitan dengan keamanan
                    akun.
                  </li>
                  <li>Catatan teknis untuk pemeliharaan layanan.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#183B56] mb-2">
                  3. Alur Pengelolaan Data Pribadi
                </h3>

                <p className="font-medium mb-2">
                  A. Pemerolehan dan Pengumpulan Data
                </p>
                <p>
                  Data diperoleh ketika pengguna melakukan pendaftaran,
                  memperbarui informasi akun, atau mengirimkan informasi melalui
                  layanan CegahScam. Data teknis tertentu juga dapat tercatat
                  ketika pengguna mengakses layanan.
                </p>

                <p className="font-medium mt-3 mb-2">
                  B. Pengolahan dan Penggunaan Data
                </p>
                <p className="mb-2">
                  Data yang diperoleh digunakan untuk tujuan berikut:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Membuat dan mengelola akun pengguna.</li>
                  <li>Melakukan autentikasi dan menjaga keamanan akun.</li>
                  <li>Memproses informasi yang dikirimkan pengguna.</li>
                  <li>
                    Mendukung analisis informasi terkait potensi penipuan.
                  </li>
                  <li>Menangani laporan, keluhan, dan permintaan pengguna.</li>
                  <li>Memelihara keamanan serta kualitas layanan.</li>
                </ul>

                <p className="font-medium mt-3 mb-2">C. Penyimpanan Data</p>
                <p>
                  Data disimpan melalui infrastruktur penyimpanan dan basis data
                  yang digunakan CegahScam. Akses terhadap data dibatasi
                  berdasarkan kebutuhan pengelolaan layanan. Informasi
                  autentikasi seperti kata sandi harus dilindungi menggunakan
                  mekanisme yang sesuai dan tidak disimpan sebagai teks biasa.
                </p>

                <p className="font-medium mt-3 mb-2">
                  D. Pengungkapan dan Pembagian Data
                </p>
                <p>
                  Data pribadi tidak diperjualbelikan kepada pihak lain. Data
                  dapat diproses atau dibagikan secara terbatas kepada penyedia
                  infrastruktur, hosting, basis data, atau layanan pendukung
                  yang diperlukan untuk menjalankan CegahScam. Pengungkapan juga
                  dapat dilakukan apabila diwajibkan oleh hukum atau diperlukan
                  untuk memenuhi permintaan resmi pihak berwenang sesuai
                  ketentuan yang berlaku.
                </p>

                <p className="font-medium mt-3 mb-2">
                  E. Retensi dan Penghapusan Data
                </p>
                <p>
                  Data disimpan selama masih diperlukan untuk memenuhi tujuan
                  pengumpulan, menjalankan layanan, menjaga keamanan, atau
                  memenuhi kewajiban hukum. Apabila tujuan pemrosesan telah
                  berakhir atau terdapat permintaan penghapusan yang dapat
                  dipenuhi, data akan dihapus atau dimusnahkan sesuai prosedur
                  dan ketentuan yang berlaku.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#183B56] mb-2">
                  4. Dasar Pemrosesan Data
                </h3>
                <p className="mb-2">
                  Pemrosesan data pribadi dilakukan berdasarkan dasar hukum yang
                  sesuai dengan tujuan masing-masing, antara lain:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Persetujuan pengguna untuk pemrosesan yang memerlukan
                    persetujuan.
                  </li>
                  <li>
                    Pemenuhan perjanjian atau penyediaan layanan yang diminta
                    pengguna.
                  </li>
                  <li>Pemenuhan kewajiban hukum.</li>
                  <li>
                    Kepentingan sah pengelola dengan tetap memperhatikan hak dan
                    kepentingan pengguna.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#183B56] mb-2">
                  5. Hak Pengguna atas Data Pribadi
                </h3>
                <p className="mb-2">
                  Pengguna memiliki hak atas data pribadi sesuai ketentuan
                  pelindungan data yang berlaku, termasuk:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Memperoleh informasi mengenai identitas pengelola dan tujuan
                    pemrosesan data.
                  </li>
                  <li>
                    Melengkapi, memperbarui, dan memperbaiki data yang tidak
                    akurat.
                  </li>
                  <li>Memperoleh akses dan salinan data pribadi.</li>
                  <li>
                    Mengakhiri pemrosesan, meminta penghapusan, atau pemusnahan
                    data sesuai ketentuan hukum.
                  </li>
                  <li>
                    Menarik kembali persetujuan pemrosesan data yang sebelumnya
                    diberikan.
                  </li>
                  <li>
                    Mengajukan keberatan terhadap keputusan yang hanya
                    didasarkan pada pemrosesan otomatis sesuai ketentuan.
                  </li>
                  <li>
                    Meminta penundaan atau pembatasan pemrosesan data secara
                    proporsional.
                  </li>
                  <li>
                    Mengajukan gugatan dan memperoleh ganti rugi apabila terjadi
                    pelanggaran sesuai ketentuan hukum.
                  </li>
                </ul>
                <p className="mt-2">
                  Permintaan terkait hak tersebut dapat disampaikan melalui
                  kontak resmi CegahScam. Pengelola akan melakukan verifikasi
                  identitas dan menindaklanjuti permintaan sesuai ketentuan yang
                  berlaku.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#183B56] mb-2">
                  6. Perlindungan dan Keamanan Data
                </h3>
                <p>
                  CegahScam berupaya melindungi data pribadi dari akses,
                  penggunaan, perubahan, pengungkapan, maupun penghapusan yang
                  tidak sah. Langkah perlindungan dapat mencakup pembatasan hak
                  akses, pengamanan autentikasi, pengelolaan kredensial, serta
                  pemantauan aktivitas yang berkaitan dengan keamanan sistem.
                </p>
                <p className="mt-2">
                  Apabila terjadi kegagalan pelindungan data pribadi, pengelola
                  akan melakukan penanganan dan pemberitahuan sesuai ketentuan
                  hukum yang berlaku.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#183B56] mb-2">
                  7. Perubahan Kebijakan Privasi
                </h3>
                <p>
                  CegahScam dapat memperbarui kebijakan privasi apabila terdapat
                  perubahan tujuan, jenis data, cara pemrosesan, layanan, atau
                  ketentuan hukum. Perubahan yang berdampak pada pengguna akan
                  diinformasikan melalui media komunikasi yang tersedia.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#183B56] mb-2">
                  8. Kontak dan Permintaan Privasi
                </h3>
                <p>
                  Untuk mengajukan pertanyaan, permintaan akses, perbaikan,
                  pembatasan pemrosesan, penarikan persetujuan, maupun
                  penghapusan data, pengguna dapat menghubungi:
                </p>
                <p className="font-medium mt-2">
                  Email: cegahScam@mail.com (dummy)
                </p>
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 space-y-4">
          {!(hasReadTerms && hasReadPrivacy) && (
            <p className="text-xs text-gray-500 text-center">
              Silakan baca kedua dokumen hingga bagian akhir
            </p>
          )}

          <label className="flex items-start gap-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              disabled={!hasReadTerms}
              className="mt-1 accent-[#183B56] disabled:opacity-40"
            />

            <span>
              Saya telah membaca dan menyetujui
              <strong> Syarat dan Ketentuan Layanan CegahScam.</strong>
            </span>
          </label>

          <label className="flex items-start gap-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={agreePrivacy}
              onChange={(e) => setAgreePrivacy(e.target.checked)}
              disabled={!hasReadPrivacy}
              className="mt-1 accent-[#183B56] disabled:opacity-40"
            />

            <span>
              Saya telah membaca dan memahami
              <strong> Kebijakan Privasi CegahScam.</strong>
            </span>
          </label>

          <button
            type="button"
            onClick={onContinue}
            disabled={!agreeTerms || !agreePrivacy}
            className="w-full rounded-lg bg-[#183B56] py-3 text-white font-medium
      disabled:bg-gray-300 disabled:cursor-not-allowed
      hover:enabled:bg-[#244D70] transition"
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}
