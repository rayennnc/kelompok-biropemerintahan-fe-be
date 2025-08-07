import { StrapiImage } from "@/components/StrapiImage";
import { HeroSectionProps } from "@/types";

export function HeroSection({
  image,
  heading,
  subheading,
}: Readonly<HeroSectionProps>) {
  return (
    <section className="relative w-full h-screen text-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <StrapiImage
          src={image.url}
          alt={image.alternativeText || "No alternative text provided"}
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Content */}
      <div className="z-10 relative flex flex-col justify-center items-center h-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-white">
          <p className="text-lg sm:text-xl tracking-widest uppercase mb-2 text-white font-semibold">
            {heading}
          </p>
          <h1 className="text-xl sm:text-xl lg:text-xl mb-6 leading-tight drop-shadow-md">
            {subheading}
          </h1>
        </div>
      </div>
    </section>
  );
}
