import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import {
  getAllNotes,
  getAdjacentNotes,
  getNote,
} from "@/lib/notes";
import { extractToc } from "@/lib/toc";
import { rehypeSlugify } from "@/lib/rehype-slugify";
import TableOfContents from "@/app/components/TableOfContents";

export function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: `${note.title} · 笔记 · AI Tutorial`,
    description: note.description,
  };
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeSlugify, rehypeHighlight, rehypeKatex],
  },
};

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const { prev, next } = getAdjacentNotes(slug);
  const toc = extractToc(note.content);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl grid grid-cols-1 xl:grid-cols-[1fr_16rem] gap-8 xl:gap-12 px-5 sm:px-8">
        {/* Main content column */}
        <div className="flex justify-center">
          <div className="w-full max-w-3xl py-10 sm:py-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors mb-8"
            >
              <span>←</span>
              <span>返回首页</span>
            </Link>

            <header className="mb-10 pb-8 border-b border-neutral-800/80">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  精选笔记
                </span>
                {note.date && (
                  <>
                    <span className="text-neutral-700">·</span>
                    <time className="text-xs text-neutral-500">{note.date}</time>
                  </>
                )}
                <span className="text-neutral-700">·</span>
                <span className="text-xs text-neutral-500">
                  约 {note.readingTime} 分钟阅读
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100 mb-4 leading-tight">
                {note.title}
              </h1>

              <p className="text-neutral-400 text-[15px] leading-relaxed mb-5">
                {note.description}
              </p>

              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-neutral-800/70 border border-neutral-700/40 px-2.5 py-0.5 text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
              integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+"
              crossOrigin="anonymous"
            />

            <article className="prose-portal">
              <MDXRemote source={note.content} options={mdxOptions} />
            </article>

            <nav className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-neutral-800 pt-8">
              {prev ? (
                <Link
                  href={`/notes/${prev.slug}`}
                  className="group flex flex-col gap-1 rounded-2xl border border-neutral-800 bg-neutral-900/50 px-5 py-4 transition-all hover:border-violet-500/40 hover:bg-neutral-900"
                >
                  <div className="flex items-center gap-2 text-xs text-neutral-500 group-hover:text-violet-400 transition-colors">
                    <span>←</span>
                    <span>上一篇笔记</span>
                  </div>
                  <div className="text-sm font-medium text-neutral-200 group-hover:text-neutral-50 line-clamp-2">
                    {prev.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {next ? (
                <Link
                  href={`/notes/${next.slug}`}
                  className="group flex flex-col gap-1 rounded-2xl border border-neutral-800 bg-neutral-900/50 px-5 py-4 transition-all hover:border-violet-500/40 hover:bg-neutral-900 sm:items-end"
                >
                  <div className="flex items-center gap-2 text-xs text-neutral-500 group-hover:text-violet-400 transition-colors">
                    <span>下一篇笔记</span>
                    <span>→</span>
                  </div>
                  <div className="text-sm font-medium text-neutral-200 group-hover:text-neutral-50 line-clamp-2 text-left sm:text-right">
                    {next.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </div>
        </div>

        {/* Right sidebar - TOC */}
        <aside className="hidden xl:block">
          <TableOfContents items={toc} accentColor="violet" />
        </aside>
      </div>
    </div>
  );
}
