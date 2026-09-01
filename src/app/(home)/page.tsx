import Link from "next/link";
import { getAllNotes } from "@/lib/notes";

export default async function Home() {
  const notes = getAllNotes();

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <section className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
          <h1 className="mb-5 text-4xl font-bold leading-[1.05] tracking-tight text-neutral-100 sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-br from-neutral-100 via-neutral-100 to-violet-300 bg-clip-text text-transparent">
              AI Tutorial
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-neutral-400 sm:text-xl">
            从 0 到 1 构建真实可用的 AI Agent 产品
            <span className="mt-2 block text-base text-neutral-500">
              系统化的笔记 · 交互化的课程 · 工程化的实战
            </span>
          </p>
        </section>

        <section>
          {notes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-800 p-10 text-center text-neutral-500">
              暂无笔记，敬请期待。
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {notes.map((note, idx) => {
                const indexLabel = String(idx + 1).padStart(2, "0");
                return (
                  <Link
                    key={note.slug}
                    href={`/notes/${note.slug}`}
                    className="group relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-gradient-to-br from-neutral-900/80 via-neutral-900/40 to-neutral-900/80 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-500/30 hover:shadow-[0_0_40px_-15px_rgba(217,70,239,0.25)] sm:p-7"
                  >
                    <div
                      className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gradient-to-br from-fuchsia-500/10 to-violet-500/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden
                    />

                    <div className="relative flex items-start gap-5 sm:gap-6">
                      <div className="flex shrink-0 flex-col items-center gap-2">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-500/20 to-violet-500/15 text-lg font-bold tracking-tight text-fuchsia-200 shadow-inner">
                          {indexLabel}
                        </div>
                        <div className="hidden h-full min-h-[60px] w-px bg-gradient-to-b from-fuchsia-500/30 via-fuchsia-500/10 to-transparent sm:block" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-2.5 py-0.5 text-[11px] font-medium text-fuchsia-300">
                            <span className="h-1 w-1 animate-pulse rounded-full bg-fuchsia-400" />
                            精选笔记
                          </span>
                          {note.date && (
                            <>
                              <span className="text-neutral-700">·</span>
                              <time className="text-[11px] text-neutral-500">
                                {note.date}
                              </time>
                            </>
                          )}
                          <span className="text-neutral-700">·</span>
                          <span className="text-[11px] text-neutral-500">
                            {note.readingTime} 分钟
                          </span>
                        </div>

                        <h3 className="mb-2 text-xl font-semibold leading-snug tracking-tight">
                          <span className="bg-gradient-to-r from-neutral-100 to-neutral-300 bg-clip-text text-transparent transition-all group-hover:from-fuchsia-100 group-hover:to-violet-200">
                            {note.title}
                          </span>
                        </h3>

                        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-neutral-400">
                          {note.description}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-3">
                          {note.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {note.tags.slice(0, 4).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-md border border-neutral-700/40 bg-neutral-800/70 px-2 py-0.5 text-[11px] text-neutral-400"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors group-hover:text-fuchsia-400">
                            <span>开始阅读</span>
                            <span>→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <footer className="mt-20 text-center text-xs text-neutral-600 sm:mt-28">
          <p>© 2026 AI Tutorial</p>
        </footer>
      </div>
    </main>
  );
}
