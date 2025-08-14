// src/components/blocks/HeroSection.tsx
import { StrapiImage } from "@/components/StrapiImage";
import { HeroSectionProps } from "@/types";

export function HeroSection({
  image,
  heading,
  subheading,
}: Readonly<HeroSectionProps>) {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <StrapiImage
          src={image.url}
          alt={image.alternativeText || "Hero background"}
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 sm:px-6 lg:px-8 text-white text-center">
        <div className="max-w-5xl mx-auto animate-fade-in-up">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold uppercase leading-snug mb-6 drop-shadow-lg">
            {heading}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg font-light leading-relaxed drop-shadow-md">
            {subheading}
          </p>
        </div>
      </div>
    </section>
  );
}
