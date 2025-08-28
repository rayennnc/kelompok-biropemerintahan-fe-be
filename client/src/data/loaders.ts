// src/data/loaders.ts
import qs from "qs";
import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";

const baseURL = getStrapiURL();

/* ========================
   HOMEPAGE
======================== */
const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "blocks.hero-section": {
          populate: {
            image: { fields: ["url", "alternativeText"] },
          },
        },
        "blocks.pimpinan-opd": {
          populate: {
            image: { fields: ["url", "alternativeText"] },
          },
        },
        "blocks.kontak": {
          populate: {},
        },
      },
    },
  },
});

export async function getHomePage() {
  const path = "/api/home";
  const url = new URL(path, baseURL);
  url.search = homePageQuery;
  return await fetchAPI(url.href, { method: "GET" });
}

/* ========================
   PAGE BY SLUG
======================== */
const pageBySlugQuery = (slug: string) =>
  qs.stringify({
    filters: { slug: { $eq: slug } },
    populate: {
      blocks: {
        on: {
          "blocks.hero-section": {
            populate: {
              image: { fields: ["url", "alternativeText"] },
            },
          },
          "blocks.pimpinan-opd": {
            populate: {
              image: { fields: ["url", "alternativeText"] },
            },
          },
          "blocks.kontak": {
            populate: {},
          },
        },
      },
    },
  });

export async function getPageBySlug(slug: string) {
  const path = "/api/pages";
  const url = new URL(path, baseURL);
  url.search = pageBySlugQuery(slug);
  return await fetchAPI(url.href, { method: "GET" });
}

/* ========================
   GLOBAL SETTINGS
======================== */
const globalSettingsQuery = qs.stringify(
  {
    populate: {
      Header: {
        populate: {
          image: { fields: ["url", "alternativeText"] },
          navigation: {
            populate: {
              children: { fields: ["text", "href", "isExternal"] },
            },
          },
        },
      },
      Footer: {
        populate: {
          logo: { populate: { image: { fields: ["url", "alternativeText"] } } },
          links: {
            populate: {
              children: { fields: ["text", "href", "isExternal"] },
            },
          },
          socmed: { fields: ["text", "href", "isExternal"] },
        },
      },
    },
  },
  { encodeValuesOnly: true }
);


export async function getGlobalSettings() {
  const path = "/api/global";
  const url = new URL(path, baseURL);
  url.search = globalSettingsQuery;
  return fetchAPI(url.href, { method: "GET" });
}

/* ========================
   KONTAK (Single Type)
======================== */
const kontakQuery = qs.stringify(
  {
    fields: ["judul", "seoUrl", "googleMapsUrl", "alamat", "nomorKontak"],
  },
  { encodeValuesOnly: true }
);

export async function getKontak() {
  const path = "/api/kontak"; // Single Type
  const url = new URL(path, baseURL);
  url.search = kontakQuery;
  return fetchAPI(url.href, { method: "GET" });
}

// Visi dan Misi (Single Type)

const visiMisiQuery = qs.stringify(
  {
    fields: ["judul", "seoUrl", "deskripsi"],
  },
  { encodeValuesOnly: true }
);

export async function getVisiMisi() {
  const path = "/api/visi-dan-misi";
  const url = new URL(path, baseURL);
  url.search = visiMisiQuery;
  return fetchAPI(url.href, { method: "GET" });
}