export interface TocItem {
  id: string;
  text: string;
  depth: number; // 2 for h2, 3 for h3
}

// Simple slug generator (matches rehype-slug behavior)
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\u4e00-\u9fa5]/g, (s) => s) // keep Chinese chars
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// Extract TOC from markdown content (h2, h3)
export function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const toc: TocItem[] = [];
  const slugCounts = new Map<string, number>();

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;

    const hashes = match[1];
    const rawText = match[2].trim();
    const depth = hashes.length;

    // Remove markdown formatting from text
    const cleanText = rawText
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/`(.+?)`/g, "$1")
      .replace(/\[(.+?)\]\(.+?\)/g, "$1")
      .replace(/^(\d+\.)\s+/, "")
      .trim();

    let id = slugify(cleanText || rawText);
    if (!id) continue;

    const count = slugCounts.get(id) ?? 0;
    slugCounts.set(id, count + 1);
    if (count > 0) {
      id = `${id}-${count}`;
    }

    toc.push({ id, text: cleanText || rawText, depth });
  }

  return toc;
}
