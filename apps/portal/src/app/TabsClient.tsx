"use client";

import { useState } from "react";
import Link from "next/link";
import { ProjectCard, type ProjectKey } from "./ProjectCard";

type Note = {
  slug: string;
  title: string;
  description: string;
  date?: string;
  tags: string[];
  readingTime: number;
};

type SubProject = {
  name: string;
  description: string;
  url: string;
  status: "active" | "planned";
};

const projects: { key: ProjectKey; data: SubProject }[] = [
  {
    key: "web",
    data: {
      name: "Claude Code Tutorial",
      description:
        "交互式 AI Agent 课程学习平台，20 个循序渐进章节，含代码对比、模拟运行器与多语言支持。",
      url: "",
      status: "active",
    },
  },
  {
    key: "blog",
    data: {
      name: "ML 课程笔记",
      description:
        "李宏毅老师机器学习课程笔记，涵盖机器学习、深度学习、强化学习、生成式 AI 四大模块。",
      url: "",
      status: "active",
    },
  },
  {
    key: "engineering",
    data: {
      name: "AI 工程化",
      description:
        "从 0 到 1 的 AI 基础设施实战笔记，含 RAG、MLOps、质量保障、GPU 基础设施等主题。",
      url: "",
      status: "active",
    },
  },
];

const tabConfig = {
  projects: {
    label: "学习平台",
    tag: "Projects",
    accent: "violet",
  },
  notes: {
    label: "精选笔记",
    tag: "Notes",
    accent: "fuchsia",
  },
} as const;

export function TabsClient({
  notes,
  urls,
}: {
  notes: Note[];
  urls: Record<ProjectKey, string>;
}) {
  const [activeTab, setActiveTab] = useState<"projects" | "notes">("notes");

  return (
    <div>
      {/* ===== Tabs 切换 ===== */}
      <div className="flex items-center justify-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-1 rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-1.5 backdrop-blur-sm">
          {(["notes", "projects"] as const).map((tab) => {
            const config = tabConfig[tab];
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 sm:px-7 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? tab === "notes"
                      ? "bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 text-fuchsia-200 shadow-[0_0_20px_-5px_rgba(217,70,239,0.3)]"
                      : "bg-gradient-to-r from-violet-500/20 to-indigo-500/20 text-violet-200 shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)]"
                    : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/40"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{config.label}</span>
                  {isActive && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        tab === "notes" ? "bg-fuchsia-400" : "bg-violet-400"
                      }`}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== 内容区 ===== */}
      <div className="min-h-[400px]">
        {activeTab === "projects" && (
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {projects.map(({ key, data }) => (
              <ProjectCard
                key={key}
                accentKey={key}
                project={{ ...data, url: urls[key] }}
                url={urls[key]}
              />
            ))}
          </div>
        )}

        {activeTab === "notes" && (
          <div>
            {notes.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-neutral-800 p-10 text-center text-neutral-500">
                暂无笔记，敬请期待。
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {notes.map((note, idx) => (
                  <NoteCard key={note.slug} note={note} index={idx} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function NoteCard({
  note,
  index,
}: {
  note: Note;
  index: number;
}) {
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/notes/${note.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-gradient-to-br from-neutral-900/80 via-neutral-900/40 to-neutral-900/80 p-6 sm:p-7 transition-all duration-300 hover:border-fuchsia-500/30 hover:shadow-[0_0_40px_-15px_rgba(217,70,239,0.25)] hover:-translate-y-0.5"
    >
      <div
        className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-gradient-to-br from-fuchsia-500/10 to-violet-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden
      />

      <div className="relative flex items-start gap-5 sm:gap-6">
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div className="w-14 h-14 rounded-xl border border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-500/20 to-violet-500/15 flex items-center justify-center text-lg font-bold tracking-tight text-fuchsia-200 shadow-inner">
            {indexLabel}
          </div>
          <div className="w-px h-full min-h-[60px] bg-gradient-to-b from-fuchsia-500/30 via-fuchsia-500/10 to-transparent hidden sm:block" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-2.5 py-0.5 text-[11px] font-medium text-fuchsia-300">
              <span className="w-1 h-1 rounded-full bg-fuchsia-400 animate-pulse" />
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
            <span className="text-[11px] text-neutral-500 inline-flex items-center gap-1">
              <svg
                className="w-3 h-3 opacity-60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {note.readingTime} 分钟
            </span>
          </div>

          <h3 className="text-xl font-semibold tracking-tight leading-snug mb-2">
            <span className="bg-gradient-to-r from-neutral-100 to-neutral-300 bg-clip-text text-transparent group-hover:from-fuchsia-100 group-hover:to-violet-200 transition-all">
              {note.title}
            </span>
          </h3>

          <p className="text-sm text-neutral-400 leading-relaxed mb-4 line-clamp-2">
            {note.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3">
            {note.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {note.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-neutral-800/70 border border-neutral-700/40 px-2 py-0.5 text-[11px] text-neutral-400 hover:border-fuchsia-500/30 hover:text-fuchsia-300 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="inline-flex items-center gap-1.5 text-sm text-neutral-500 group-hover:text-fuchsia-400 transition-colors font-medium">
              <span>开始阅读</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
