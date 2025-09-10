//src/app/struktur-organisasi/page.tsx

import { getStrukturOrganisasi } from "@/data/loaders";
import { StrukturOrganisasi } from "@/components/blocks/StrukturOrganisasi";
import { notFound } from "next/navigation";

export default async function StrukturOrganisasiPage() {
  const res = await getStrukturOrganisasi();
  console.log("STRUKTUR DATA", JSON.stringify(res, null, 2));

  const data = res?.data

  if (!data) notFound();

  return (
    <StrukturOrganisasi
      judul={data?.judul}
      deskripsi={data?.deskripsi}
      attachmentUrl={data?.attachment?.url}
      attachmentAlt={data?.attachment?.alternativeText}
    />
  );
}