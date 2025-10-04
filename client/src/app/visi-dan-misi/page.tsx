// src/app/visi-misi/page.tsx

import { getVisiMisi } from "@/data/loaders";
import { VisiDanMisi } from "@/components/blocks/VisiDanMisi";
import { notFound } from "next/navigation";

export default async function VisiDanMisiPage() {
  const res = await getVisiMisi();
  const data = res?.data;

  if (!data) {
    notFound();
  }

  return (
    <div>
      <VisiDanMisi
        judul={data.judul}
        deskripsi={data.deskripsi}
        id={data.id}
        __component="blocks.visi-dan-misi"
      />
    </div>
  );
}

export async function generateMetadata() {
  const res = await getVisiMisi();
  const data = res?.data;
  return {
    title: data?.judul || "Visi dan Misi - Biro Pemerintahan",
    description: "Visi dan Misi Biro Pemerintahan dan Otonomi Daerah Provinsi Sulawesi Utara",
    keywords: "visi, misi, biro pemerintahan, otonomi daerah, sulut",
  };
}
