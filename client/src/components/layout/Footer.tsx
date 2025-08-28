"use client";
import Link from "next/link";
import { FooterData } from "@/types";
import { StrapiImage } from "../StrapiImage";

export function Footer({
  logo,
  links,
  address,
  socmed,
  copyright,
}: FooterData) {
  const hasLogoImage = logo?.image?.url;

  return (
    <footer className="bg-[#1193b5] text-white mt-0 pt-6 border-t border-[#e0e7ef]">
      <div className="max-w-6xl mx-auto px-6 py-6 grid gap-8 md:grid-cols-3">
        {/* Logo & Info OPD */}
        <div>
          {hasLogoImage ? (
            <StrapiImage
              src={logo.image.url}
              alt={logo.image.alternativeText || logo.logoText}
              width={64}
              height={64}
              className="w-16 h-16 object-contain mb-2"
            />
          ) : (
            <span className="w-16 h-16 flex items-center justify-center bg-[#ead4c9] rounded-full font-bold text-lg text-[#a84353] mb-2">
              {logo.logoText?.[0]}
            </span>
          )}

          {/* Nama OPD */}
          <div className="leading-tight mb-4">
            <p className="font-semibold">{logo.logoText}</p>
            {logo.logoText2 && (
              <p className="text-sm text-[#95ddeb]">{logo.logoText2}</p>
            )}
          </div>

          {/* Alamat */}
          <p className="text-sm text-[#e0f7fa] whitespace-pre-line">{address}</p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-white">Tautan</h2>
          <ul className="space-y-2 text-sm">
            {links?.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href || "#"}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  className="hover:text-[#95ddeb] transition"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-white">Ikuti Kami</h2>
          <div className="flex gap-4 flex-wrap">
            {socmed?.map((item) => (
              <Link
                key={item.id}
                href={item.href || "#"}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className="hover:text-[#95ddeb] transition text-sm"
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#0f7a97] py-1 text-center text-xs text-[#d0eaff]">
        {copyright ||
          `© ${new Date().getFullYear()} ${logo.logoText || "OPD"}. All rights reserved.`}
      </div>
    </footer>
  );
}
