"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { StrapiImage } from "../StrapiImage";
import type { LinkProps, LogoProps } from "@/types";

interface HeaderProps {
  logo: LogoProps;
  navigation: LinkProps[];
}

export function Header({ logo, navigation }: HeaderProps) {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const hasLogoImage = !!logo?.image?.url;
  const logoText = logo?.logoText || "OPD";
  const logoText2 = logo?.logoText2 || "";
  const navLinks = Array.isArray(navigation) ? navigation : [];

  const toggleMobile = () => setMobileOpen((v) => !v);
  const toggleDropdown = (id: number) =>
    setOpenDropdownId((cur) => (cur === id ? null : id));

  const isActive = (href?: string | null) =>
    !!href && href !== "#" && pathname === href;

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdownId(null);
  }, [pathname]);

  return (
    <header className="bg-[#1193b5] text-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3" aria-label="Beranda">
          {hasLogoImage ? (
            <StrapiImage
              src={logo.image.url}
              alt={logo.image.alternativeText || logoText}
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
          ) : (
            <span className="w-12 h-12 flex items-center justify-center bg-[#ead4c9] rounded-full font-bold text-lg text-[#a84353]">
              {logoText[0]}
            </span>
          )}
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold">{logoText}</span>
            {logoText2 && (
              <span className="text-base font-medium text-[#95ddeb]">
                {logoText2}
              </span>
            )}
          </div>
        </Link>

        {/* Desktop nav */}
        {navLinks.length > 0 && (
          <nav aria-label="Navigasi utama" className="hidden md:block">
            <ul className="flex gap-6">
              {navLinks.map((link) => {
                const hasChildren =
                  Array.isArray(link.children) && link.children.length > 0;

                return (
                  <li key={link.id} className="relative group">
                    <Link
                      href={link.href || "#"}
                      className={`relative transition font-medium flex items-center gap-1
                                  after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#95ddeb] after:scale-x-0 after:origin-left 
                                  after:transition-transform after:duration-300 hover:after:scale-x-100
                                  ${isActive(link.href)
                                    ? "text-[#95ddeb] font-semibold after:scale-x-100"
                                    : "text-white hover:text-[#95ddeb]"}
                                `}
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                    >
                      {link.text || "Menu"}
                      {hasChildren && (
                        <ChevronDown
                          size={14}
                          className="transition-transform duration-200 group-hover:rotate-180"
                          aria-hidden="true"
                        />
                      )}
                    </Link>

                    {hasChildren && (
                      <ul
                        className="absolute left-0 top-full bg-white border rounded-lg shadow-lg min-w-[200px] z-50
                                   opacity-0 translate-y-2 pointer-events-none
                                   group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
                                   transition-all duration-300 ease-out"
                      >
                        {link.children!.map((child) => (
                          <li key={child.id}>
                            <Link
                              href={child.href || "#"}
                              className="block px-4 py-2 hover:bg-[#ead4c9] text-gray-700 transition-colors duration-200"
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
                );
              })}
            </ul>
          </nav>
        )}

        {/* Hamburger */}
        {navLinks.length > 0 && (
          <button
            type="button"
            onClick={toggleMobile}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-[#ead4c9]/30 focus:outline-none focus:ring-2 focus:ring-white/60"
            aria-label="Buka tutup menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}
      </div>

      {/* Mobile panel */}
      {navLinks.length > 0 && (
        <div
          className={`md:hidden border-t border-white/10 bg-[#1193b5]/95 backdrop-blur-sm transition-[max-height,opacity] duration-300 overflow-hidden ${
            mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav aria-label="Navigasi mobile" className="px-4 py-2">
            <ul className="flex flex-col">
              {navLinks.map((link) => {
                const hasChildren =
                  Array.isArray(link.children) && link.children.length > 0;
                const open = openDropdownId === link.id;

                return (
                  <li key={link.id} className="border-b border-white/10">
                    <div className="flex items-center">
                      <Link
                        href={link.href || "#"}
                        className={`flex-1 px-2 py-3 transition font-medium ${
                          isActive(link.href)
                            ? "text-[#95ddeb] font-semibold"
                            : "text-white hover:text-[#95ddeb]"
                        }`}
                        target={link.isExternal ? "_blank" : undefined}
                        rel={link.isExternal ? "noopener noreferrer" : undefined}
                        onClick={(e) => {
                          if (hasChildren) {
                            e.preventDefault();
                            toggleDropdown(link.id);
                          } else {
                            setMobileOpen(false);
                            setOpenDropdownId(null);
                          }
                        }}
                      >
                        {link.text || "Menu"}
                      </Link>

                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => toggleDropdown(link.id)}
                          className="px-3 py-3 text-white hover:text-[#95ddeb]"
                          aria-label={`Buka submenu ${link.text}`}
                          aria-expanded={open}
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${
                              open ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {hasChildren && (
                      <ul
                        className={`pl-4 pr-2 bg-white text-gray-800 rounded-md ml-2 mr-2 mb-3
                                    transition-all duration-300 ease-out overflow-hidden
                                    ${open ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}
                                    `}
                      >
                        {link.children!.map((child) => (
                          <li key={child.id}>
                            <Link
                              href={child.href || "#"}
                              className="block px-3 py-2 rounded hover:bg-[#ead4c9]"
                              target={child.isExternal ? "_blank" : undefined}
                              rel={
                                child.isExternal
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              onClick={() => {
                                setMobileOpen(false);
                                setOpenDropdownId(null);
                              }}
                            >
                              {child.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
