# AI Tutorial

> 机器学习与 AI 工程化笔记 — 单站点双 Tab

## 项目简介

单一 Next.js 应用，侧栏用两个 Tab 切换内容：

| Tab | 内容 |
|-----|------|
| **机器学习** | 李宏毅课程笔记（ML / RL / 生成式 AI） |
| **AI 工程化** | RAG、Agent、MLOps、基础设施、质量保障 |

Claude Code Tutorial 仍为独立站点：<https://claude.haylee.site/>

## 仓库结构

```
ai-tutorial/
├── content/
│   ├── ml/                 # 机器学习讲义
│   └── engineering/        # AI 工程化讲义
├── src/app/                # Next.js App Router
├── package.json
└── vercel.json             # Vercel 部署配置
```

## 技术栈

- Next.js (App Router) + React
- TypeScript
- Tailwind CSS
- Markdown / MDX（gray-matter + next-mdx-remote）
- pnpm
- Vercel

## 本地开发

前置：Node.js ≥ 18，pnpm ≥ 8

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build
pnpm start
```

## 写笔记

- ML：`content/ml/{course}/{序号}-{slug}.md`
- 工程：`content/engineering/{course}/{序号}-{slug}.md`

Frontmatter 示例：

```markdown
---
title: 笔记标题
description: 一句话摘要
date: "2026-09-01"
tags: [标签1, 标签2]
---
```

路由形如 `/ml/courses/{course}/{lecture}` 与 `/engineering/courses/{course}/{lecture}`。

## 部署（Vercel）

### 方式一：Git 集成（推荐）

1. 在 [Vercel](https://vercel.com) 导入本仓库
2. 框架会自动识别为 Next.js，构建命令 `pnpm build`
3. 推送 `main` 分支即自动部署生产环境

### 方式二：CLI

```bash
pnpm install
pnpm dlx vercel login    # 首次
pnpm dlx vercel link     # 首次，关联项目
pnpm deploy:preview      # 预览部署
pnpm deploy              # 生产部署
```

配置见 [`vercel.json`](./vercel.json)。

## 约定

- 主分支：`main`
- Conventional Commits（`feat:` / `fix:` / `chore:` / `docs:`）
- 不提交：`.env*`、`node_modules/`、`.next/`

## 相关项目

- Claude Code Tutorial：<https://github.com/hezihua/claude-code-tutorial>

## 开源协议

[MIT License](./LICENSE) © 2026 hezihua
