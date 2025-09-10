import { PimpinanOPDBlockProps } from "@/types";
import { StrapiImage } from "@/components/StrapiImage";
import FadeUpOnScroll from "../FadeUpOnScroll";

export function PimpinanOPD({
  image,
  namalengkap,
  pangkat,
  jabatan,
}: Readonly<PimpinanOPDBlockProps>) {
  if (!image) return null;

  return (
    <section
      id="pimpinan-opd"
      className="bg-white py-16 px-4 text-center"
    >
      <div className="max-w-3xl mx-auto">
        {/* Bagian Judul */}
        <FadeUpOnScroll threshold={0} delay={0.1}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            PROFIL KEPALA DINAS
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            PROVINSI SULAWESI UTARA
          </p>
          <div className="w-24 h-1 bg-gray-300 mx-auto mb-12"></div>
        </FadeUpOnScroll>

        {/* Bagian Foto dan Detail */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:text-left gap-12">
          {/* Foto */}
          <FadeUpOnScroll threshold={0} delay={0.2}>
            <div className="w-64 h-80 flex-shrink-0 relative">
              <StrapiImage
                src={image.url}
                alt={image.alternativeText || namalengkap}
                fill
                className="object-cover"
              />
            </div>
          </FadeUpOnScroll>

          {/* Detail Informasi - animasi per field */}
          <div className="flex-1 space-y-6">
            <FadeUpOnScroll threshold={0} delay={0.3}>
              <div>
                <p className="text-xl text-gray-800 font-semibold">Nama:</p>
                <p className="text-2xl text-gray-900 font-bold">
                  {namalengkap}
                </p>
              </div>
            </FadeUpOnScroll>

            <FadeUpOnScroll threshold={0} delay={0.4}>
              <div>
                <p className="text-xl text-gray-800 font-semibold">Pangkat:</p>
                <p className="text-lg text-gray-700">{pangkat}</p>
              </div>
            </FadeUpOnScroll>

            <FadeUpOnScroll threshold={0} delay={0.5}>
              <div>
                <p className="text-xl text-gray-800 font-semibold">Jabatan:</p>
                <p className="text-lg text-gray-700">{jabatan}</p>
              </div>
            </FadeUpOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
