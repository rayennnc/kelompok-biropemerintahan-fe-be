//src/components/blocks/kontak.tsx

import { MapPin, Phone } from "lucide-react";
import { KontakProps } from "@/types";

// Helper untuk ekstrak src dari iframe string
function extractSrcFromIframe(input: string): string {
  const match = input.match(/src=["']([^"']+)["']/);
  return match ? match[1] : input; // fallback ke string asli
}

export default function Kontak({
  judul,
  alamat,
  nomorKontak,
  googleMapsUrl,
}: KontakProps) {
  const rawMapSrc = googleMapsUrl.includes("<iframe")
    ? extractSrcFromIframe(googleMapsUrl)
    : googleMapsUrl;

  const isValidMapUrl = rawMapSrc.includes("google.com/maps");

  return (
    <section className="relative">
      {/* Background lembut */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" aria-hidden />

      <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            {judul}
          </h1>
          <p className="mt-2 text-gray-500 text-sm md:text-base">
            Hubungi kami atau kunjungi lokasi berikut.
          </p>
        </div>

        {/* Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kartu info */}
          <div className="bg-white/90 backdrop-blur rounded-xl shadow-sm ring-1 ring-gray-200 p-6 md:p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Alamat</h2>
                  <p className="mt-1 text-gray-600 leading-relaxed">{alamat}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600 ring-1 ring-green-100">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Telepon</h2>
                  <a
                    href={`tel:${nomorKontak}`}
                    className="mt-1 inline-flex text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                  >
                    {nomorKontak}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Peta */}
          <div className="rounded-xl overflow-hidden shadow-sm ring-1 ring-gray-200 bg-white">
            {isValidMapUrl ? (
              <iframe
                src={rawMapSrc}
                className="w-full h-[320px] md:h-full min-h-[320px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi pada peta"
              />
            ) : (
              <div className="w-full h-[320px] md:h-full min-h-[320px] bg-gray-50 flex items-center justify-center text-gray-500">
                Peta belum tersedia
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
