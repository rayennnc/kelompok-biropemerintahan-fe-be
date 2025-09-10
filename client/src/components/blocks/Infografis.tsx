import Link from "next/link";
import { StrapiImage } from "../StrapiImage";

interface InfografisCardProps {
  id: number;
  judul: string;
  seoUrl: string;
  tanggal_postingan?: string;
  excerpt?: string;
  thumbnailUrl?: string;
  thumbnailAlt?: string;
}

export default function InfografisCard({
  id,
  judul,
  seoUrl,
  tanggal_postingan,
  excerpt,
  thumbnailUrl,
  thumbnailAlt,
}: InfografisCardProps) {
  return (
    <article key={id} className="border-b pb-4">
      {thumbnailUrl && (
        <StrapiImage
          src={thumbnailUrl}
          alt={thumbnailAlt || judul}
          className="mb-2 w-full max-w-xs rounded"
        />
      )}
      <Link href={`/infografis/${seoUrl}`}>
        <h2 className="text-xl font-semibold text-blue-700 hover:underline">
          {judul}
        </h2>
      </Link>
      {tanggal_postingan && (
        <div className="text-gray-500 text-sm mt-1">
          {new Date(tanggal_postingan).toLocaleDateString("id-ID")}
        </div>
      )}
      {excerpt && (
        <p className="mt-2 text-gray-700 line-clamp-2">{excerpt}</p>
      )}
    </article>
  );
}
