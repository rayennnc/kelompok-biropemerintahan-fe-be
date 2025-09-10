import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/data/loaders";
import { StrapiImage } from "@/components/StrapiImage";

export default async function InfografisDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await getPostBySlug(slug);
  const post = res?.data?.[0];

  if (!post) notFound();

  const date = post.tanggal_postingan || post.publishedAt;

  return (
    <section className="bg-white">
      <main className="max-w-5xl mx-auto py-12 px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:underline hover:text-blue-600">
            Beranda
          </Link>{" "}
          /{" "}
          <Link href="/infografis" className="hover:underline hover:text-blue-600">
            Infografis
          </Link>{" "}
          / <span className="text-gray-800 font-medium">{post.judul}</span>
        </nav>

        {/* Judul */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {post.judul}
        </h1>

        {/* Meta info */}
        {date && (
          <div className="text-gray-500 text-sm mb-8">
            {new Date(date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        )}

        {/* Thumbnail */}
        {post.thumbnail?.url && (
          <StrapiImage
            src={post.thumbnail.url}
            alt={post.thumbnail.alternativeText || post.judul}
            width={1200}
            height={800}
            className="mb-8 w-full h-auto rounded-lg shadow-lg"
          />
        )}

        {/* Konten */}
        <article
          className="prose prose-lg max-w-none text-justify leading-relaxed text-gray-900"
          dangerouslySetInnerHTML={{ __html: post.konten || "" }}
        />
      </main>
    </section>
  );
}
