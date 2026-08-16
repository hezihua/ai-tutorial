"use client";

import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  text: string;
  depth: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  accentColor?: "violet" | "blue" | "cyan";
}

const textColorMap = {
  violet: "text-violet-300",
  blue: "text-blue-300",
  cyan: "text-cyan-300",
};

export default function TableOfContents({
  items,
  accentColor = "violet",
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeTextColor = textColorMap[accentColor];

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: [0, 1],
      }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    const firstVisible = items
      .map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return { id: item.id, top: rect.top };
      })
      .filter((x): x is { id: string; top: number } => x !== null)
      .filter((x) => x.top < window.innerHeight * 0.6)
      .sort((a, b) => b.top - a.top)[0];

    if (firstVisible) {
      setActiveId(firstVisible.id);
    } else if (items.length > 0) {
      setActiveId(items[0].id);
    }

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 16;
      window.scrollTo({ top: y, behavior: "smooth" });
      history.replaceState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="sticky top-0 h-screen overflow-y-auto py-16 no-scrollbar">
      <div className="px-4">
        <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-500">
          目录导航
        </div>
        <nav>
          <ul className="flex flex-col gap-0.5">
            {items.map((item) => {
              const isActive = activeId === item.id;
              const isH2 = item.depth === 2;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={`block rounded-md px-3 py-1.5 leading-snug transition-all ${
                      isH2
                        ? "text-sm font-medium text-neutral-300"
                        : "text-[13px] pl-8 text-neutral-500"
                    } ${
                      isActive
                        ? `bg-neutral-800 ${isH2 ? activeTextColor + " font-semibold" : "text-neutral-200"}`
                        : "hover:bg-neutral-800/60 hover:text-neutral-200"
                    }`}
                    title={item.text}
                  >
                    <span className="line-clamp-2 block">{item.text}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
