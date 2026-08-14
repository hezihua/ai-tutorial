import { TabsClient } from "./TabsClient";
import { getAllNotes } from "@/lib/notes";

function getUrls() {
  const isProd = process.env.NODE_ENV === "production";
  if (isProd) {
    return {
      web: "https://claude.haylee.site/",
      blog: "https://ai-blog-6abx.onrender.com",
      engineering: "https://ai-engineering-blog.onrender.com",
    };
  }
  return {
    web: "https://claude.haylee.site/",
    blog: "http://localhost:3002",
    engineering: "http://localhost:3003",
  };
}

export default async function Home() {
  const urls = getUrls();
  const notes = await getAllNotes();

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-20">
        {/* ===== Hero 全宽 ===== */}
        <section className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-100 mb-5 leading-[1.05]">
            <span className="bg-gradient-to-br from-neutral-100 via-neutral-100 to-violet-300 bg-clip-text text-transparent">
              AI Tutorial
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 leading-relaxed">
            从 0 到 1 构建真实可用的 AI Agent 产品
            <span className="block text-base text-neutral-500 mt-2">
              系统化的笔记 · 交互化的课程 · 工程化的实战
            </span>
          </p>
        </section>

        {/* ===== Tabs 切换 ===== */}
        <TabsClient notes={notes} urls={urls} />

        <footer className="mt-20 sm:mt-28 text-center text-xs text-neutral-600">
          <p>© 2026 AI Tutorial</p>
        </footer>
      </div>
    </main>
  );
}
