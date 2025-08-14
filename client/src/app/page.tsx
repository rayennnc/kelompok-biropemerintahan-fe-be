//src/app/page.tsx

import { BlockRenderer } from "@/components/BlockRenderer";

async function loader() {
  const path = '/api/home-page?populate[blocks][on][blocks.hero-section][populate][image][fields]=url,alternativeText&populate[blocks][on][blocks.pimpinan-opd][populate][image][fields]=url,alternativeText';
  const baseURL = "http://localhost:1337";
  const url = new URL(path, baseURL);

  const response = await fetch(url.href);
  const data = await response.json();

  console.log("DATA", JSON.stringify(data, null, 2));

  return { ...data.data };
}

export default async function HomePage() {
  const data = await loader();
  // const title = data?.title || "No Title";
  // const description = data?.description || "No Description";
  const blocks = data?.blocks || [];

  console.log(blocks);

  return (
    <div>
      <BlockRenderer blocks={blocks} />
    </div>
  );
}
