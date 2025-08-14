// src/app/kontak/page.tsx
import { getKontak } from "@/data/loaders";
import Kontak from "@/components/blocks/Kontak";

export default async function KontakPage() {
  const res = await getKontak();
  const data = res?.data;

  if (!data) {
    return <main className="p-8">Data kontak belum tersedia</main>;
  }

  return (
    <main>
      <Kontak
        id={data.id}
        __component={data.__component}
        judul={data.judul}
        seoUrl={data.seoUrl}
        alamat={data.alamat}
        nomorKontak={data.nomorKontak}
        googleMapsUrl={data.googleMapsUrl}
      />
    </main>
  );
}
