import React from "react";

interface VisiDanMisiProps {
	judul: string;
	seoUrl: string;
	deskripsi: string;
}

export function VisiDanMisi({ judul, seoUrl, deskripsi }: VisiDanMisiProps) {
	return (
		<section className="bg-white py-16 px-4 text-center">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">{judul}</h1>
				<div className="w-24 h-1 bg-gray-300 mx-auto mb-8"></div>
				<div className="mb-8">
					<span className="text-sm text-gray-400">SEO URL: {seoUrl}</span>
				</div>
				<div className="prose prose-lg mx-auto text-left">
					{/* Render richtext HTML dari deskripsi */}
					<div dangerouslySetInnerHTML={{ __html: deskripsi }} />
				</div>
			</div>
		</section>
	);
}
