//src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getGlobalSettings } from "@/data/loaders"; // fungsi fetch dari Strapi

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Biro Pemerintahan",
  description: "Website Biro Pemerintahan",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const globalSettings = await getGlobalSettings();

  const headerData = globalSettings?.data?.Header?.[0] || {};
  const footerData = globalSettings?.data?.Footer?.[0] || {};

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header
          logo={{
            logoText: headerData.logoText,
            logoText2: headerData.logoText2,
            image: headerData.image
          }}
          navigation={headerData.navigation || []}
        />
        <main>{children}</main>
        <Footer {...footerData} />
      </body>
    </html>
  );
}