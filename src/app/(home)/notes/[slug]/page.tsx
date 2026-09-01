import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { getAdjacentNotes, getAllNotes, getNote } from "@/lib/notes";
import { extractToc } from "@/app/lib/toc";
import { rehypeSlugify } from "@/app/lib/rehype-slugify";
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
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 sm:px-8 xl:grid-cols-[1fr_16rem] xl:gap-12">
        <div className="flex justify-center">
          <div className="w-full max-w-3xl py-10 sm:py-16">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-300"
            >
              <span>←</span>
              <span>返回首页</span>
            </Link>

            <header className="mb-10 border-b border-neutral-800/80 pb-8">
              <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
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

              <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-neutral-100 sm:text-4xl">
                {note.title}
              </h1>

              <p className="mb-5 text-[15px] leading-relaxed text-neutral-400">
                {note.description}
              </p>

              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-neutral-700/40 bg-neutral-800/70 px-2.5 py-0.5 text-xs text-neutral-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <article className="prose-portal">
              <MDXRemote source={note.content} options={mdxOptions} />
            </article>

            <nav className="mt-16 grid grid-cols-1 gap-4 border-t border-neutral-800 pt-8 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/notes/${prev.slug}`}
                  className="group flex flex-col gap-1 rounded-2xl border border-neutral-800 bg-neutral-900/50 px-5 py-4 transition-all hover:border-violet-500/40 hover:bg-neutral-900"
                >
                  <div className="flex items-center gap-2 text-xs text-neutral-500 transition-colors group-hover:text-violet-400">
                    <span>←</span>
                    <span>上一篇笔记</span>
                  </div>
                  <div className="line-clamp-2 text-sm font-medium text-neutral-200">
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
                  <div className="flex items-center gap-2 text-xs text-neutral-500 transition-colors group-hover:text-violet-400">
                    <span>下一篇笔记</span>
                    <span>→</span>
                  </div>
                  <div className="line-clamp-2 text-left text-sm font-medium text-neutral-200 sm:text-right">
                    {next.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </div>
        </div>

        <aside className="hidden xl:block">
          <TableOfContents items={toc} accentColor="violet" />
        </aside>
      </div>
    </div>
  );
}
