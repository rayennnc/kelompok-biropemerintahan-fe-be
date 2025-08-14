"use client";

import Link from "next/link";
import { LinkProps, LogoProps } from "@/types";
import { StrapiImage } from "../StrapiImage";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface HeaderProps {
  logo: LogoProps;
  navigation: LinkProps[];
}

export function Header({ logo, navigation }: HeaderProps) {
  const pathname = usePathname();

  const hasLogoImage = logo?.image?.url;
  const logoText = logo?.logoText || "OPD";
  const logoText2 = logo?.logoText2 || "";
  const navLinks = Array.isArray(navigation) ? navigation : [];

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md bg-black text-white relative z-50">
      {/* Logo + Teks */}
      <Link href="/" className="flex items-center gap-3">
        {hasLogoImage ? (
          <StrapiImage
            src={logo.image.url}
            alt={logo.image.alternativeText || logoText}
            width={48}
            height={48}
            className="w-12 h-12 object-contain"
          />
        ) : (
          <span className="w-12 h-12 flex items-center justify-center bg-gray-700 rounded-full font-bold text-lg">
            {logoText[0]}
          </span>
        )}
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-white">
            {logoText}
          </span>
          {logoText2 && (
            <span className="text-base font-medium text-blue-300">
              {logoText2}
            </span>
          )}
        </div>
      </Link>

      {/* Navigation */}
      {navLinks.length > 0 && (
        <nav>
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.id} className="relative group">
                {/* Menu utama */}
                <Link
                  href={link.href || "#"}
                  className={`transition font-medium flex items-center gap-1 ${
                    pathname === link.href
                      ? "text-blue-400 font-bold"
                      : "text-white hover:text-blue-400"
                  }`}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                >
                  {link.text || "Menu"}
                  {Array.isArray(link.children) && link.children.length > 0 && (
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-200 group-hover:rotate-180"
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {Array.isArray(link.children) && link.children.length > 0 && (
                  <ul className="absolute left-0 top-full bg-white border rounded-lg shadow-lg min-w-[160px] z-50 hidden group-hover:block">
                    {link.children.map((child) => (
                      <li key={child.id}>
                        <Link
                          href={child.href || "#"}
                          className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                          target={child.isExternal ? "_blank" : undefined}
                          rel={
                            child.isExternal
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {child.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
