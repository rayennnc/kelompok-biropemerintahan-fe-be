//src/app/page.tsx

import { BlockRenderer } from "@/components/BlockRenderer";
import BeritaList from "@/components/blocks/BeritaList";
import InfografisCarousel from "@/components/blocks/InfografisCarousel";
import {getLatestBerita, getLatestInfografis} from "@/data/loaders";

async function loader() {
  const path = '/api/home-page?populate[blocks][on][blocks.hero-section][populate][image][fields]=url,alternativeText&populate[blocks][on][blocks.pimpinan-opd][populate][image][fields]=url,alternativeText';
  const baseURL = "http://localhost:1337";
  const url = new URL(path, baseURL);

  const response = await fetch(url.href);
  const data = await response.json();

  return { ...data.data };
}

export default async function HomePage() {
  const beritaItems = await getLatestBerita(3);
  const infografisItems = await getLatestInfografis(5);

  const data = await loader();
  const blocks = data?.blocks || [];

  console.log(blocks);
// Perubahan untuk carousel (07-09-2025)
  return (
    <div>
      <BlockRenderer blocks={blocks} />
      <BeritaList items={beritaItems} judul="Berita Terbaru"/>
      <InfografisCarousel items={infografisItems} judul="Infografis Terbaru"/>
    </div>
  );
}
