import pict1 from "../assets/Education/pict1-edu.webp";
import pict2 from "../assets/Education/pict2-edu.webp";
import pict3 from "../assets/Education/pict3-edu.webp";
import pict4 from "../assets/Education/pict4-edu.webp";
import foto1 from "../assets/Education/carousel/carousel1.webp";
import foto2 from "../assets/Education/carousel/carousel2.webp";
import foto3 from "../assets/Education/carousel/carousel3.webp";
import foto4 from "../assets/Education/carousel/carousel4.webp";
import eduRobot from "../assets/Education/edu-robot.webp";

import CarouselEdu from "../components/CarouselEdu";

export default function Education() {
  return (
    <div className="mx-auto py-20">
      <div
        id="hero-section"
        className="mx-auto mt-8 flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:justify-evenly lg:gap-80 lg:px-8 lg:py-10"
      >
        <div>
          <div className="max-[600px]:text-center">
            <h1 className="text-[30px] lg:text-[40px] font-bold leading-5">
              Yuk Kenali Scam
            </h1>
            <h1 className="text-[30px] lg:text-[40px] font-bold">
              Sebelum Terjadi
            </h1>
          </div>
          <div className="max-[600px]:text-center max-[600px]:text-[12px]">
            <p>Pelajari cara penipuan bekerja,</p>
            <p>tanda-tanda yang perlu diperhatikan, dan langkah</p>
            <p> sederhana untuk melindungi diri.</p>
          </div>
        </div>
        <div className="flex flex-row">
          <div>
            <img
              src={pict1}
              className="h-24 w-24 sm:h-30 sm:w-30 lg:h-40 lg:w-40"
            />
            <img
              src={pict3}
              className="h-24 w-24 sm:h-30 sm:w-30 lg:h-40 lg:w-40"
            />
          </div>
          <div className="mt-5">
            <img
              src={pict2}
              className="h-24 w-24 sm:h-30 sm:w-30 lg:h-40 lg:w-40"
            />
            <img
              src={pict4}
              className="h-24 w-24 sm:h-30 sm:w-30 lg:h-40 lg:w-40"
            />
          </div>
        </div>
      </div>

      <div id="body1-section" className="mt-5">
        <div
          id="body1-title"
          className="text-center mb-5 lg:mb-12 max-[600px]:mx-auto max-[600px]:w-full max-[600px]:max-w-[360px]"
        >
          <h1 className="text-[30px] lg:text-[40px] font-bold text-[#111827]">
            Modus Scam Terkini
          </h1>
          <p className="max-[600px]:text-[12px]">
            Pelajari bagaimana pelaku menggunakan pesan, akun palsu, link
            mencurigakan, dan berbagai cara lain untuk memperdaya korban.
          </p>
        </div>
        <div
          id="body1-content"
          className="w-full flex flex-col gap-4 lg:gap-10"
        >
          <div className="mx-auto grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:w-fit lg:grid-cols-3 lg:gap-10 lg:px-0">
            <div className="mx-auto w-full rounded-xl bg-white px-5 py-3 text-start lg:mx-0 lg:w-50 lg:px-6">
              <div className="text-[#1A56DB] font-bold text-[50px]">01</div>
              <h1 className="font-bold my-3">Impersonation</h1>
              <p className="text-[13px] pb-2">
                Pelaku berpura-pura menjadi pihak resmi, customer service,
                teman, atau institusi tertentu untuk mendapatkan kepercayaan
                korban.
              </p>
            </div>
            <div className="mx-auto w-full rounded-xl bg-white px-5 py-3 text-start lg:mx-0 lg:w-50 lg:px-6">
              <div className="text-[#1A56DB] font-bold text-[50px]">02</div>
              <h1 className="font-bold my-3">Urgency</h1>
              <p className="text-[13px]">
                Pelaku menciptakan situasi mendesak agar korban tidak memiliki
                waktu untuk berpikir atau melakukan verifikasi.
              </p>
            </div>
            <div className="mx-auto w-full rounded-xl bg-white px-5 py-3 text-start lg:mx-0 lg:w-50 lg:px-6">
              <div className="text-[#1A56DB] font-bold text-[50px]">03</div>
              <h1 className="font-bold my-3">Threat</h1>
              <p className="text-[13px]">
                Pelaku menggunakan rasa takut atau ancaman agar korban mengikuti
                instruksi yang diberikan.
              </p>
            </div>
          </div>
          <div className="mx-auto grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:w-fit lg:grid-cols-3 lg:gap-10 lg:px-0">
            <div className="mx-auto w-full rounded-xl bg-white px-5 py-3 text-start lg:mx-0 lg:w-50 lg:px-6">
              <div className="text-[#1A56DB] font-bold text-[50px]">04</div>
              <h1 className="font-bold my-3">Fake Customer Service</h1>
              <p className="text-[13px] pb-2">
                Pelaku menyamar sebagai customer service dari bank, platform,
                atau layanan tertentu untuk mendapatkan informasi atau membuat
                korban melakukan tindakan.
              </p>
            </div>
            <div className="mx-auto w-full rounded-xl bg-white px-5 py-3 text-start lg:mx-0 lg:w-50 lg:px-6">
              <div className="text-[#1A56DB] font-bold text-[50px]">05</div>
              <h1 className="font-bold my-3">Fake Investment</h1>
              <p className="text-[13px]">
                Pelaku menawarkan investasi dengan cara yang dapat membuat
                korban tertarik untuk memberikan uang atau informasi.
              </p>
            </div>
            <div className="mx-auto w-full rounded-xl bg-white px-5 py-3 text-start lg:mx-0 lg:w-50 lg:px-6">
              <div className="text-[#1A56DB] font-bold text-[50px]">06</div>
              <h1 className="font-bold my-3">Phising</h1>
              <p className="text-[13px]">
                Pelaku menyamar sebagai pihak terpercaya untuk mengarahkan
                korban melakukan tindakan tertentu atau memberikan informasi
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="body2-section" className="my-20">
        <div
          id="body2-title"
          className="text-center mb-5 lg:mb-12 w-full max-w-7xl"
        >
          <h1 className="text-[30px] lg:text-[40px] font-bold text-[#111827]">
            Kamus Keamanan Digital
          </h1>
          <p className="max-[600px]:text-[12px]">
            Kenali istilah penting seputar penipuan digital agar kamu lebih
            waspada dan terlindungi.
          </p>
        </div>
        <div
          id="body2-content"
          className="w-full flex flex-col gap-4 lg:gap-10"
        >
          <div
            id="body2-row1"
            className="mx-auto grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:w-fit lg:grid-cols-3 lg:gap-10 lg:px-0"
          >
            <div className="mx-auto w-full rounded-xl bg-white px-5 py-3 text-center lg:mx-0 lg:w-50 lg:px-6">
              <h1 className="font-bold my-3">Scam</h1>
              <p className="text-[13px] pb-2">
                Penipuan digital untuk mendapatkan uang atau data pribadi dengan
                cara menipu korban.
              </p>
            </div>
            <div className="mx-auto w-full rounded-xl bg-white px-5 py-3 text-center lg:mx-0 lg:w-50 lg:px-6">
              <h1 className="font-bold my-3">Phising</h1>
              <p className="text-[13px]">
                Jenis scam yang menggunakan pesan, email, atau situs palsu untuk
                mencuri informasi pribadi.
              </p>
            </div>
            <div className="mx-auto w-full rounded-xl bg-white px-5 py-3 text-center lg:mx-0 lg:w-50 lg:px-6">
              <h1 className="font-bold my-3">Social Engineering</h1>
              <p className="text-[13px]">
                Teknik manipulasi psikologis untuk membuat korban memberikan
                informasi rahasia.
              </p>
            </div>
          </div>
          <div
            id="body2-row2"
            className="mx-auto grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:w-fit lg:grid-cols-3 lg:gap-10 lg:px-0"
          >
            <div className="mx-auto w-full rounded-xl bg-white px-5 py-3 text-center lg:mx-0 lg:w-50 lg:px-6">
              <h1 className="font-bold my-3">OTP (One Time Password)</h1>
              <p className="text-[13px] pb-2">
                Kode verifikasi satu kali untuk mengamankan akun. Jangan pernah
                membagikannya kepada siapa pun.
              </p>
            </div>
            <div className="mx-auto w-full rounded-xl bg-white px-5 py-3 text-center lg:mx-0 lg:w-50 lg:px-6">
              <h1 className="font-bold my-3">Malware</h1>
              <p className="text-[13px]">
                Perangkat lunak berbahaya yang dapat merusak perangkat atau
                mencuri data.
              </p>
            </div>
            <div className="mx-auto w-full rounded-xl bg-white px-5 py-3 text-center lg:mx-0 lg:w-50 lg:px-6">
              <h1 className="font-bold my-3">Data Breach</h1>
              <p className="text-[13px]">
                Kebocoran data pribadi atau sensitif yang bisa disalahgunakan
                oleh pihak tidak bertanggung jawab.
              </p>
            </div>
          </div>
          <div
            id="body2-row3"
            className="mx-auto grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:w-fit lg:grid-cols-3 lg:gap-10 lg:px-0"
          >
            <div className="mx-auto w-full rounded-xl bg-white px-5 py-3 text-center lg:mx-0 lg:w-50 lg:px-6">
              <h1 className="font-bold my-3">Link Mencurigakan</h1>
              <p className="text-[13px] pb-2">
                Tautan yang dapat mengarahkan ke situs palsu atau menginstal
                malware di perangkat.
              </p>
            </div>
            <div className="mx-auto w-full rounded-xl bg-white px-5 py-3 text-center lg:mx-0 lg:w-50 lg:px-6">
              <h1 className="font-bold my-3">Investasi Bodong</h1>
              <p className="text-[13px]">
                Penawaran investasi palsu dengan iming-iming keuntungan besar
                dalam waktu singkat.
              </p>
            </div>
            <div className="mx-auto w-full rounded-xl bg-white px-5 py-3 text-center lg:mx-0 lg:w-50 lg:px-6">
              <h1 className="font-bold my-3">Smishing</h1>
              <p className="text-[13px]">
                Penipuan melalui pesan singkat yang berisi link palsu atau
                permintaan informasi pribadi untuk menipu korban.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="body3-section" className="my-20">
        <div
          id="body2-title"
          className="text-center lg:mb-12 max-[600px]:mx-auto max-[600px]:w-full max-[600px]:max-w-[360px]"
        >
          <h1 className="text-[30px] lg:text-[40px] font-bold text-[#111827]">
            Pola Chat Scam yang sering terjadi
          </h1>
          <p>
            Beberapa pola chat perilaku penipuan/scam dan phising yang
            seringkali Terjadi
          </p>
        </div>

        <div
          id="body2-carousel"
          className="hidden max-[600px]:block text-center"
        >
          <CarouselEdu />
          <p className="text-[10px]">
            Klik pada gambar untuk melihat contoh selanjutnya
          </p>
        </div>

        <div
          id="body2-evidence"
          className="hidden flex-row justify-center gap-5 min-[601px]:flex"
        >
          <img src={foto1} className="w-50" />
          <img src={foto2} className="w-50" />
          <img src={foto3} className="w-50" />
          <img src={foto4} className="w-50" />
        </div>
      </div>

      <div id="quotes-section" className="mb-30 lg:mt-40 flex flex-row">
        <div className="mx-auto w-90 rounded-lg bg-[#1A56DB] px-5 py-8 lg:w-full lg:px-20 lg:py-25">
          <h1 className="text-lg font-bold text-white lg:text-xl">
            “Satu ons pencegahan lebih berharga daripada satu pon pengobatan.”
          </h1>
          <p className="text-base font-bold text-[#111827] lg:text-xl">
            - Benjamin Franklin
          </p>
        </div>
        <img
          src={eduRobot}
          className="absolute w-40 right-0 bottom-70 lg:w-85 lg:right-35 lg:bottom-100"
        />
      </div>
    </div>
  );
}
