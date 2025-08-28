"use client";
import ReactMarkdown from "react-markdown";

interface VisiDanMisiProps {
  judul: string;
  deskripsi: string;
  id: number;
  __component: string;
}

function splitVisiMisi(markdown: string) {
  const visiRegex = /#+\s*Visi[\r\n]+([\s\S]*?)(?=#+\s*Misi|$)/i;
  const misiRegex = /#+\s*Misi[\r\n]+([\s\S]*)/i;
  const visiMatch = markdown.match(visiRegex);
  const misiMatch = markdown.match(misiRegex);
  return {
    visi: visiMatch ? visiMatch[1].trim() : "",
    misi: misiMatch ? misiMatch[1].trim() : "",
  };
}

export function VisiDanMisi({ judul, deskripsi }: VisiDanMisiProps) {
  const { visi, misi } = splitVisiMisi(deskripsi || "");

  return (
    <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Judul Halaman */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-2">
          {judul}
        </h1>
        <div className="w-20 h-1 bg-blue-600 mx-auto mb-16" />

        <div className="flex flex-col gap-8">
          {/* Card Visi */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-semibold text-slate-900">Visi</h2>
            </div>
            <div className="prose prose-slate max-w-none text-slate-700 text-justify">
              <ReactMarkdown>{visi}</ReactMarkdown>
            </div>
          </div>

          {/* Card Misi */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-semibold text-slate-900">Misi</h2>
            </div>
            <div className="prose prose-slate max-w-none text-slate-700 text-justify">
              <ReactMarkdown>{misi}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
