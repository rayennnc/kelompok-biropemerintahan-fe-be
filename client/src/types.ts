// src/types.ts

// Reusable Types
export interface LinkProps {
  id: number;
  text: string;
  href: string;
  isExternal: boolean;
  children?: CtaButtonProps[];
}

export interface CtaButtonProps {
  id: number;
  text: string;
  href: string;
  isExternal: boolean;
}

export interface ImageProps {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string;
}

export interface LogoProps {
  logoText: string;
  logoText2: string;
  image: ImageProps;
}

export interface HeaderData {
  logo: LogoProps;
  navigation: LinkProps[];
}

export interface FooterData {
  logo: LogoProps;
  links: LinkProps[];
  address: string;
  copyright: string;
  socmed: LinkProps[];
}

export interface GlobalData {
  id: number;
  documentId: string;
  title: string;
  description: string;
  header?: HeaderData;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Block Base Types
export type ComponentType =
  | "blocks.hero-section"
  | "blocks.pimpinan-opd"
  | "blocks.kontak"
  | "blocks.visi-dan-misi"
  | "blocks.struktur-organisasi";

export interface Base<
  T extends ComponentType,
  D extends object = Record<string, unknown>
> {
  id: number;
  __component: T;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  data?: D;
}

// Specific Blocks
export interface HeroSectionProps extends Base<"blocks.hero-section"> {
  image: ImageProps;
  heading: string;
  subheading: string;
}

export interface PimpinanOPDBlockProps extends Base<"blocks.pimpinan-opd"> {
  image: ImageProps;
  namalengkap: string;
  pangkat: string;
  jabatan: string;
}

export interface KontakProps extends Base<"blocks.kontak"> {
  judul: string;
  seoUrl: string;
  googleMapsUrl: string;
  alamat: string;
  nomorKontak: string;
}

export interface VisiMisiProps extends Base<"blocks.visi-dan-misi"> {
  judul: string;
  seoUrl: string;
  deskripsi: string;
}

export interface StrukturOrganisasiProps extends Base<"blocks.struktur-organisasi"> {
  judul: string;
  seoUrl: string;
  deskripsi: string;
  attachment: ImageProps;
}

// Union Block
export type Block =
  | HeroSectionProps
  | PimpinanOPDBlockProps
  | KontakProps
  | VisiMisiProps;

// Posts & Category
export interface CategoryProps {
  id: number;
  judul: string;
  seoUrl: string;
  description?: string;
  for: "post" | "dokumen";
  dokumen?: DokumenProps[];
  posts?: PostProps[];
  attachment?: ImageProps[];
}

export interface PostProps {
  id: number;
  seoUrl: string;
  judul: string;
  konten: string;
  tanggal_postingan: string;
  publishedAt: string;
  thumbnail?: ImageProps | null;
  category?: CategoryProps;
}

export interface DokumenProps {
  id: number;
  judul: string;
  description: string;
  seoUrl: string;
  attachment: {
    url: string;
    name: string;
    alternativeText?: string;
  };
  category?: CategoryProps;
  konten?: string;
}

export interface StrapiResponse<T> {
  data: {
    id: number;
    attributes: T;
  }[];
}

export interface StrapiSingleResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
}
