"use client";

import { StrapiImage } from "../StrapiImage";

interface BeritaListProps {
  items: any[];
  judul?: string;
}

export default function BeritaList({ items, judul = "Berita Terkini" }: BeritaListProps) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-blue-100 pb-3">
          <h2 className="text-3xl font-bold text-blue-900 tracking-tight">{judul}</h2>
          <a
            href="/berita"
            className="text-blue-700 hover:text-blue-900 text-base font-medium transition-colors duration-200"
          >
            Berita Lainnya →
          </a>
        </div>

        {/* Grid Berita */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl shadow-md border border-blue-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                {/* Kategori badge */}
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded shadow z-10">
                  Berita
                </span>
                {item.thumbnail?.url && (
                  <StrapiImage
                    src={item.thumbnail?.formats?.medium?.url || item.thumbnail?.url}
                    alt={item.thumbnail?.alternativeText || item.judul}
                    width={item.thumbnail?.formats?.medium?.width || 400}
                    height={item.thumbnail?.formats?.medium?.height || 300}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Konten */}
              <div className="p-5 flex flex-col h-[180px]">
                {/* Tanggal */}
                <span className="text-gray-500 text-sm mb-2 flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="inline-block text-blue-600"
                  >
                    <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 13A6 6 0 118 2a6 6 0 010 12zm.5-6V4a.5.5 0 00-1 0v4a.5.5 0 00.146.354l2.5 2.5a.5.5 0 10.708-.708L8.5 8z" />
                  </svg>
                  {new Date(item.tanggal_postingan).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>

                {/* Judul */}
                <a
                  href={`/berita/${item.seoUrl}`}
                  className="text-lg font-semibold text-blue-800 group-hover:text-blue-900 hover:underline mb-2 line-clamp-2 transition-colors duration-200"
                >
                  {item.judul}
                </a>

                {/* Link Selengkapnya */}
                <div className="mt-auto">
                  <a
                    href={`/berita/${item.seoUrl}`}
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                  >
                    Baca Selengkapnya
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
