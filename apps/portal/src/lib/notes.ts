import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "notes");

export interface NoteMeta {
  slug: string;
  order: number;
  title: string;
  description: string;
  date?: string;
  tags: string[];
  content: string;
  raw: string;
  readingTime: number;
}

function estimateReadingTime(markdown: string): number {
  const chars = markdown.replace(/\s+/g, "").length;
  return Math.max(1, Math.round(chars / 500));
}

export function getAllNotes(): NoteMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const mdFiles = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  const notes: NoteMeta[] = mdFiles.map((file) => {
    const fullPath = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);

    const baseName = path.basename(file, ".md");
    const orderMatch = baseName.match(/^(\d+)-/);
    const order = orderMatch ? parseInt(orderMatch[1], 10) : 999;
    const slug = baseName.replace(/^\d+-/, "");

    let title: string = data.title ?? "";
    let body = content;
    if (!title) {
      const h1Match = body.match(/^#\s+(.+)$/m);
      if (h1Match) {
        title = h1Match[1].trim();
        body = body.replace(/^#\s+.+\n?/m, "");
      } else {
        title = slug;
      }
    }

    return {
      slug,
      order,
      title,
      description: data.description ?? "",
      date: data.date ? String(data.date) : undefined,
      tags: data.tags ?? [],
      content: body,
      raw,
      readingTime: estimateReadingTime(body),
    };
  });

  notes.sort((a, b) => a.order - b.order);
  return notes;
}

export function getNote(slug: string): NoteMeta | undefined {
  return getAllNotes().find((n) => n.slug === slug);
}

export function getAdjacentNotes(slug: string): {
  prev: NoteMeta | null;
  next: NoteMeta | null;
} {
  const notes = getAllNotes();
  const idx = notes.findIndex((n) => n.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? notes[idx - 1] : null,
    next: idx < notes.length - 1 ? notes[idx + 1] : null,
  };
}
