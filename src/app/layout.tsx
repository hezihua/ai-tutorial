import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Tutorial",
  description:
    "从 0 到 1 构建真实可用的 AI Agent 产品 — 系统化的笔记 · 交互化的课程 · 工程化的实战",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
