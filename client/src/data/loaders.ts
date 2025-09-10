//src/data/loaders.ts
import qs from "qs";
import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";

const baseURL = getStrapiURL();

// Homepage
const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "blocks.hero-section": {
          populate: { image: { fields: ["url", "alternativeText"] } },
        },
        "blocks.pimpinan-opd": {
          populate: { image: { fields: ["url", "alternativeText"] } },
        },
        "blocks.kontak": { populate: {} },
      },
    },
  },
}, { encodeValuesOnly: true });

export async function getHomePage() {
  const url = new URL("/api/home", baseURL);
  url.search = homePageQuery;
  return fetchAPI(url.href, { method: "GET" });
}

// Page by slug
const pageBySlugQuery = (slug: string) =>
  qs.stringify({
    filters: { slug: { $eq: slug } },
    populate: {
      blocks: {
        on: {
          "blocks.hero-section": {
            populate: { image: { fields: ["url", "alternativeText"] } },
          },
          "blocks.pimpinan-opd": {
            populate: { image: { fields: ["url", "alternativeText"] } },
          },
          "blocks.kontak": { populate: {} },
        },
      },
    },
  }, { encodeValuesOnly: true });

export async function getPageBySlug(slug: string) {
  const url = new URL("/api/pages", baseURL);
  url.search = pageBySlugQuery(slug);
  return fetchAPI(url.href, { method: "GET" });
}

// Global settings
const globalSettingsQuery = qs.stringify({
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
        logo: {
          populate: {
            image: { fields: ["url", "alternativeText"] },
          },
        },
        links: {
          populate: {
            children: { fields: ["text", "href", "isExternal"] },
          },
        },
        socmed: { fields: ["text", "href", "isExternal"] },
      },
    },
  },
}, { encodeValuesOnly: true });

export async function getGlobalSettings() {
  const url = new URL("/api/global", baseURL);
  url.search = globalSettingsQuery;
  return fetchAPI(url.href, { method: "GET" });
}

// Kontak
const kontakQuery = qs.stringify({
  fields: ["judul", "seoUrl", "googleMapsUrl", "alamat", "nomorKontak"],
}, { encodeValuesOnly: true });

export async function getKontak() {
  const url = new URL("/api/kontak", baseURL);
  url.search = kontakQuery;
  return fetchAPI(url.href, { method: "GET" });
}

// Visi & Misi
const visiMisiQuery = qs.stringify({
  fields: ["judul", "seoUrl", "deskripsi"],
}, { encodeValuesOnly: true });

export async function getVisiMisi() {
  const url = new URL("/api/visi-dan-misi", baseURL);
  url.search = visiMisiQuery;
  return fetchAPI(url.href, { method: "GET" });
}

const strukturOrganisasiQuery = qs.stringify({
  fields: ["judul", "seoUrl", "deskripsi"],
  populate: {
    attachment: { fields: ["url", "alternativeText"] }
  },
}, { encodeValuesOnly: true });

export async function getStrukturOrganisasi() {
  const url = new URL("/api/struktur-organisasi", baseURL);
  url.search = strukturOrganisasiQuery;
  return fetchAPI(url.href, { method: "GET" });
}

// Posts by category
const postsByCategoryQuery = (category: string) => qs.stringify({
  filters: {
    category: { seoUrl: { $eq: category } },
  },
  fields: ["judul", "seoUrl", "konten", "tanggal_postingan"],
  populate: {
    thumbnail: { fields: ["url", "alternativeText"] },
    category: true // cukup true, jangan fields di sini
  },
  sort: ["tanggal_postingan:desc"],
}, { encodeValuesOnly: true });

export async function getPostsByCategory(category: string) {
  const url = new URL("/api/posts", baseURL);
  url.search = postsByCategoryQuery(category);
  return fetchAPI(url.href, { method: "GET" });
}

// Post detail by slug
const postBySlugQuery = (slug: string) => qs.stringify({
  filters: { seoUrl: { $eq: slug } },
  fields: ["judul", "seoUrl", "konten", "tanggal_postingan", "publishedAt"],
  populate: {
    thumbnail: { fields: ["url", "alternativeText"] },
    category: true
  },
}, { encodeValuesOnly: true });

export async function getPostBySlug(slug: string) {
  const url = new URL("/api/posts", baseURL);
  url.search = postBySlugQuery(slug);
  return fetchAPI(url.href, { method: "GET" });
}

// Ambil beberapa berita terbaru
export async function getLatestBerita(limit = 5) {
  const qs = require("qs");
  const query = qs.stringify({
    filters: {
      category: { seoUrl: { $eq: "berita" } },
    },
    fields: ["judul", "seoUrl", "konten", "tanggal_postingan"],
    populate: {
      thumbnail: { fields: ["url", "alternativeText", "formats"] },
    },
    sort: ["tanggal_postingan:desc"],
    pagination: { pageSize: limit },
  }, { encodeValuesOnly: true });

  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}/api/posts?${query}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.data || [];
}

// Ambil beberapa infografis terbaru
export async function getLatestInfografis(limit = 6) {
  const qs = require("qs");
  const query = qs.stringify({
    filters: {
      category: { seoUrl: { $eq: "infografis" } },
    },
    fields: ["judul", "seoUrl", "konten", "tanggal_postingan"],
    populate: {
      thumbnail: { fields: ["url", "alternativeText", "formats"] },
    },
    sort: ["tanggal_postingan:desc"],
    pagination: { pageSize: limit },
  }, { encodeValuesOnly: true });

  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}/api/posts?${query}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.data || [];
}