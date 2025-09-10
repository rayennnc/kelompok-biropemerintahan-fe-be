// src/components/blocks/StrukturOrganisasi.tsx
"use client";

import { StrapiImage } from "../StrapiImage";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface StrukturOrganisasiProps {
  judul: string;
  deskripsi?: string;
  attachmentUrl?: string;
  attachmentAlt?: string;
}

function SlideFadeIn({
  children,
  direction = "up", // "up" | "left" | "right"
  delay = 0,
  threshold = 0.1,
}: {
  children: React.ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  // Class awal untuk mobile & desktop
  const directionClasses = {
    up: "translate-y-5",
    left: "translate-y-5 lg:-translate-x-5", // mobile fade-up, desktop slide kiri
    right: "translate-y-5 lg:translate-x-5", // mobile fade-up, desktop slide kanan
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${directionClasses[direction]}`
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export function StrukturOrganisasi({
  judul,
  deskripsi,
  attachmentUrl,
  attachmentAlt,
}: StrukturOrganisasiProps) {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Judul */}
        <SlideFadeIn direction="up" delay={0.1}>
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            {judul}
          </h1>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-12" />
        </SlideFadeIn>

        {/* Gambar + Deskripsi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-12">
          {/* Gambar Struktur */}
          {attachmentUrl && (
            <SlideFadeIn direction="left" delay={0.2}>
              <div className="flex justify-center">
                <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500">
                  <StrapiImage
                    src={attachmentUrl}
                    alt={attachmentAlt || judul}
                    width={800}
                    height={600}
                    className="rounded-lg max-w-full h-auto transform transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </SlideFadeIn>
          )}

          {/* Deskripsi */}
          <SlideFadeIn direction="right" delay={0.3}>
            <div className="prose prose-lg max-w-none text-gray-700">
              {deskripsi ? (
                <ReactMarkdown>{deskripsi}</ReactMarkdown>
              ) : (
                <p className="italic text-gray-500">
                  Tidak ada deskripsi untuk struktur organisasi ini.
                </p>
              )}
            </div>
          </SlideFadeIn>
        </div>

        {/* Tombol Lihat Pimpinan OPD */}
        <SlideFadeIn direction="up" delay={0.3}>
          <div className="text-center">
            <Link
              href="/#pimpinan-opd"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition-colors"
            >
              Lihat Pimpinan OPD
            </Link>
          </div>
        </SlideFadeIn>
      </div>
    </section>
  );
}
