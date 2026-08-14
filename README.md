# AI Tutorial

> 从 0 到 1 构建真实可用的 AI Agent 产品 — 系统化的笔记 · 交互化的课程 · 工程化的实战

## 项目简介

`ai-tutorial` 是一个聚焦 AI 学习与工程实践的内容矩阵，由三个独立的应用组成：

| 应用 | 说明 | 线上地址 |
|------|------|---------|
| **Portal** | 入口门户，精选笔记中心（支持 Tabs 切换、MDX 阅读） | Render 部署中 |
| **Blog** | 李宏毅老师 ML 课程笔记 | <https://ai-blog-6abx.onrender.com> |
| **Engineering Blog** | AI 工程化实战笔记（RAG / MLOps / 基础设施） | <https://ai-engineering-blog.onrender.com> |

此外，独立的 Claude Code Tutorial 站点（交互式 AI Agent 课程，20 章）部署在 <https://claude.haylee.site/>，与本仓库解耦管理。

## 仓库结构

```
ai-tutorial/
├── apps/
│   ├── portal/              # 入口门户 + 精选笔记
│   │   ├── content/notes/   # Markdown 笔记源文件
│   │   ├── src/app/         # Next.js App Router
│   │   └── src/lib/         # 笔记解析工具
│   ├── blog/                # ML 课程笔记站点
│   └── engineering-blog/    # AI 工程化笔记站点
├── package.json             # 根 workspace 配置
├── render.yaml              # Render 部署蓝图
└── pnpm-workspace.yaml
```

## 精选笔记

Portal 内置三篇核心笔记，构建时静态预渲染：

1. **AI 概念全解析** — AI / ML / DL / LLM / Agent / RAG 核心概念关系地图
2. **AI 学习路径** — 从零到 Agent 工程师的 3-6 个月系统化路径
3. **AI 发展史** — 从图灵测试到通用智能的 80 年技术演进

## 技术栈

- **框架**：Next.js 14 (App Router) + React 18
- **语言**：TypeScript
- **样式**：Tailwind CSS + CSS Modules
- **内容**：Markdown + MDX + gray-matter
- **包管理**：pnpm workspace
- **部署**：Render（Blueprint 模式）

## 本地开发

### 前置要求

- Node.js ≥ 18
- pnpm ≥ 8

### 启动

```bash
# 安装依赖
pnpm install

# 启动 Portal（默认端口 3000）
pnpm dev

# 启动 Blog（默认端口 3002）
pnpm dev:blog

# 启动 Engineering Blog（默认端口 3003）
pnpm dev:engineering

# 同时启动所有应用
pnpm dev:all
```

### 构建

```bash
# 单独构建
pnpm build:portal
pnpm build:blog
pnpm build:engineering
```

## 写笔记

在 `apps/portal/content/notes/` 下新建 Markdown 文件，文件名格式 `{序号}-{slug}.md`，Frontmatter 模板：

```markdown
---
title: 笔记标题
description: 一句话摘要
date: 2026-08-14
tags: [标签1, 标签2]
---

正文内容（支持 GFM、代码高亮、KaTeX 公式）...
```

笔记会自动在首页"精选笔记"列表中显示，并在 `/notes/{slug}` 路径下生成静态详情页。

## 部署

仓库根目录的 `render.yaml` 是 Render 的部署蓝图，定义了三个独立服务：

- `ai-portal` — Portal 站点
- `ai-blog` — Blog 站点
- `ai-engineering-blog` — Engineering Blog 站点

每个服务绑定 `$PORT` 环境变量，启动命令为 `cd apps/{name} && pnpm start`。

## 项目约定

- **主分支**：`main`（所有发布都基于 main）
- **包作用域**：`@ai-tutorial/*`
- **提交信息**：遵循 Conventional Commits（`feat:` / `fix:` / `chore:` / `docs:`）
- **不提交**：`.env*`、`node_modules/`、`.next/`、构建产物

## 相关项目

- **Claude Code Tutorial**：<https://github.com/hezihua/claude-code-tutorial> — 交互式 AI Agent 课程，独立仓库管理

## 开源协议

[MIT License](./LICENSE) © 2026 hezihua
