import { useState } from "react";
import foto1 from "../assets/Education/carousel/carousel1.webp";
import foto2 from "../assets/Education/carousel/carousel2.webp";
import foto3 from "../assets/Education/carousel/carousel3.webp";
import foto4 from "../assets/Education/carousel/carousel4.webp";

const fotos = [foto1, foto2, foto3, foto4];

export default function CarouselEdu() {
  const [index, setIndex] = useState(0);

  function nextImage() {
    setIndex((prev) => (prev + 1) % fotos.length);
  }

  return (
    <div className="mx-auto w-65">
      <button
        onClick={nextImage}
        className="w-full cursor-pointer overflow-hidden rounded-xl"
        aria-label="Tampilkan gambar berikutnya"
      >
        <img
          src={fotos[index]}
          alt={`Foto edukasi ${index + 1}`}
          className="h-auto w-full object-cover"
        />
      </button>

      <div className="mt-4 flex justify-center gap-2">
        {fotos.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Tampilkan gambar ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              index === i ? "w-6 bg-blue-600" : "w-2.5 bg-gray-300"
            }`}
          />
        ))}
      </div>

      <p className="mt-2 text-center text-sm text-gray-500">
        {index + 1} / {fotos.length}
      </p>
    </div>
  );
}
