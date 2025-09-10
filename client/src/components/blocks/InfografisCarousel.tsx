"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { StrapiImage } from "../StrapiImage";

interface InfografisCarouselProps {
  items: any[];
  judul: string;
}

export default function InfografisCarousel({ items, judul }: InfografisCarouselProps) {
  // Aktifkan loop + autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000, stopOnInteraction: true })] // delay 3 detik
  );

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-blue-900 tracking-tight">{judul}</h2>
          <a
            href="/infografis"
            className="text-blue-700 hover:text-blue-900 text-base font-medium"
          >
            Infografis Lainnya →
          </a>
        </div>

        <div className="relative">
          {/* Tombol navigasi kiri */}
          <button
            onClick={scrollPrev}
            aria-label="Sebelumnya"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white border border-blue-100 text-blue-700 rounded-full shadow hover:bg-blue-50 transition"
          >
            <span className="text-2xl font-bold">‹</span>
          </button>

          {/* Tombol navigasi kanan */}
          <button
            onClick={scrollNext}
            aria-label="Berikutnya"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white border border-blue-100 text-blue-700 rounded-full shadow hover:bg-blue-50 transition"
          >
            <span className="text-2xl font-bold">›</span>
          </button>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 px-12">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={`/infografis/${item.seoUrl}`}
                  className="block min-w-[260px] max-w-[260px] aspect-square bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden transition-shadow duration-300 hover:shadow-xl"
                >
                  <StrapiImage
                    src={item.thumbnail?.formats?.medium?.url || item.thumbnail?.url}
                    alt={item.thumbnail?.alternativeText || item.judul}
                    width={item.thumbnail?.formats?.medium?.width || 400}
                    height={item.thumbnail?.formats?.medium?.height || 400}
                    className="w-full h-full object-cover rounded-t-xl"
                    loading="lazy"
                  />
                  <div className="p-4 flex flex-col h-full">
                    <span className="text-xs text-blue-700 font-semibold mb-2">
                      {new Date(item.tanggal_postingan).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <h3 className="text-lg font-semibold text-blue-700 hover:underline mb-2 line-clamp-2">
                      {item.judul}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {item.konten}
                    </p>
                    <div className="mt-auto">
                      <span className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                        Selengkapnya →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
