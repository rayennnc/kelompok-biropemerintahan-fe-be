// src/types.ts

/* ======================================
   Reusable Types
====================================== */
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

/* ======================================
   Block Base Types
====================================== */
// Semua blok harus pakai ComponentType
export type ComponentType =
  | "blocks.hero-section"
  | "blocks.pimpinan-opd"
  | "blocks.kontak"
  | "blocks.visi-dan-misi";

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

/* ======================================
   Blok Spesifik
====================================== */
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

/* ======================================
   Union Block
====================================== */
export type Block =
  | HeroSectionProps
  | PimpinanOPDBlockProps
  | KontakProps
  | VisiMisiProps;
