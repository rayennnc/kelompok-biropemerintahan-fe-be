import Link from "next/link";
import { getPostsByCategory } from "@/data/loaders";
import { StrapiImage } from "@/components/StrapiImage";
import FadeUpOnScroll from "@/components/FadeUpOnScroll";

export default async function BeritaListPage() {
  const res = await getPostsByCategory("berita");
  const items = res?.data || [];

  return (
    <main className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Berita</h1>

        {items.length === 0 && (
          <p className="text-gray-500">Tidak ada berita tersedia.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item: any, idx: number) => {
            const thumbUrl =
              item.thumbnail?.formats?.medium?.url ||
              item.thumbnail?.formats?.small?.url ||
              item.thumbnail?.url;

            return (
              <FadeUpOnScroll key={item.id} delay={idx * 0.05}>
                <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col group">
                  {/* Gambar */}
                  {thumbUrl && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <StrapiImage
                        src={thumbUrl}
                        alt={item.thumbnail?.alternativeText || item.judul}
                        fill
                        className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Overlay gradient saat hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  )}

                  {/* Konten */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Label kategori */}
                    {item.category?.nama && (
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-2 transition-transform duration-300 group-hover:scale-105">
                        {item.category.nama}
                      </span>
                    )}

                    {/* Judul */}
                    <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      <Link
                        href={`/berita/${item.seoUrl}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {item.judul}
                      </Link>
                    </h2>

                    {/* Tanggal */}
                    {item.tanggal_postingan && (
                      <div className="text-gray-500 text-xs mb-3">
                        {new Date(item.tanggal_postingan).toLocaleDateString(
                          "id-ID",
                          { day: "numeric", month: "long", year: "numeric" }
                        )}
                      </div>
                    )}

                    {/* Ringkasan */}
                    {item.konten && (
                      <p className="text-gray-700 text-sm line-clamp-3 flex-1">
                        {item.konten.slice(0, 150)}...
                      </p>
                    )}

                    {/* Tombol baca selengkapnya */}
                    <div className="mt-4">
                      <Link
                        href={`/berita/${item.seoUrl}`}
                        className="relative text-blue-600 text-sm font-medium after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
                      >
                        Baca Selengkapnya →
                      </Link>
                    </div>
                  </div>
                </article>
              </FadeUpOnScroll>
            );
          })}
        </div>
      </div>
    </main>
  );
}
