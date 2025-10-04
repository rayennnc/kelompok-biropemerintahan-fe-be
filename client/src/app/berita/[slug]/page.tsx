// src/app/berita/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/data/loaders";
import { StrapiImage } from "@/components/StrapiImage";
import { formatParagraphs } from "@/utils/formatParagraphs";

export default async function BeritaDetailPage({
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
          <Link href="/berita" className="hover:underline hover:text-blue-600">
            Berita
          </Link>{" "}
          / <span className="text-gray-800 font-medium">{post.judul}</span>
        </nav>

        {/* Judul */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {post.judul}
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap items-center text-gray-700 text-sm mb-8 gap-4">
          {date && (
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"/>
              </svg>
              {new Date(date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}

          {post.category?.judul && (
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"/>
              </svg>
              {post.category.judul}
            </span>
          )}
        </div>

        {/* Thumbnail */}
        {post.thumbnail?.url && (
          <StrapiImage
            src={post.thumbnail.url}
            alt={post.thumbnail.alternativeText || post.judul}
            width={1200}
            height={800}
            className="mb-8 w-full h-auto rounded-lg shadow-lg"/>
        )}

        {/* Konten */}
        <article
          className="prose prose-lg max-w-none text-justify leading-relaxed text-gray-900
                     prose-p:my-6 prose-hr:my-8 prose-img:rounded-lg prose-img:shadow"
          dangerouslySetInnerHTML={{
            __html: formatParagraphs(post.konten || ""),
          }}/>

        {/* Berita terkait */}
        <section className="mt-16 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Berita Terkait
          </h2>
          <p className="text-gray-600 text-sm bg-gray-50 p-4 rounded-md border border-gray-200">
            Daftar berita terkait akan ditampilkan di sini
          </p>
        </section>
      </main>
    </section>
  );
}
