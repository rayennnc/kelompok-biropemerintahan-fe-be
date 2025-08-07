import { PimpinanOPDBlockProps, ImageProps } from "@/types";
import { StrapiImage } from "@/components/StrapiImage";

export function PimpinanOPD({
    image,
    namalengkap,
    pangkat,
    jabatan,
}: Readonly<PimpinanOPDBlockProps>) {
    
    // Periksa apakah objek 'image' itu sendiri ada sebelum diakses
    if (!image) {
        return null;
    }

    return (
        <section className="bg-white py-16 px-4 text-center">
            <div className="max-w-3xl mx-auto">
                {/* Bagian Judul */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">PROFIL KEPALA DINAS</h1>
                <p className="text-lg text-gray-500 mb-8">PROVINSI SULAWESI UTARA</p>
                <div className="w-24 h-1 bg-gray-300 mx-auto mb-12"></div>

                {/* Bagian Foto dan Detail */}
                <div className="flex flex-col md:flex-row items-center md:items-start md:text-left gap-12">
                    {/* Foto */}
                    <div className="w-64 h-80 flex-shrink-0 relative">
                        <StrapiImage
                            src={image.url}
                            alt={image.alternativeText || namalengkap}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Detail Informasi */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <p className="text-xl text-gray-800 font-semibold">Nama:</p>
                            <p className="text-2xl text-gray-900 font-bold">{namalengkap}</p>
                        </div>
                        <div>
                            <p className="text-xl text-gray-800 font-semibold">Pangkat:</p>
                            <p className="text-lg text-gray-700">{pangkat}</p>
                        </div>
                        <div>
                            <p className="text-xl text-gray-800 font-semibold">Jabatan:</p>
                            <p className="text-lg text-gray-700">{jabatan}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}