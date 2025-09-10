// src/utils/formatParagraphs.ts
export function formatParagraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map(p => `<p>${p.trim()}</p>`)
    .join("");
}
