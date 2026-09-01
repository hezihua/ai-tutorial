import Link from "next/link";

const items = [
  {
    key: "ml",
    label: "ML",
    href: "/ml",
    external: false,
    active:
      "border-amber-500/40 bg-amber-500/10 text-amber-200 hover:border-amber-400/60 hover:bg-amber-500/15",
  },
  {
    key: "engineering",
    label: "工程化",
    href: "/engineering",
    external: false,
    active:
      "border-cyan-500/40 bg-cyan-500/10 text-cyan-200 hover:border-cyan-400/60 hover:bg-cyan-500/15",
  },
  {
    key: "claude",
    label: "Claude",
    href: "https://claude.haylee.site/",
    external: true,
    active:
      "border-violet-500/40 bg-violet-500/10 text-violet-200 hover:border-violet-400/60 hover:bg-violet-500/15",
  },
] as const;

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-neutral-100 transition-colors hover:text-violet-200"
        >
          AI Tutorial
        </Link>

        <nav className="flex items-center gap-2">
          {items.map((item) => {
            const className = `rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-all ${item.active}`;
            if (item.external) {
              return (
                <a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {item.label}
                </a>
              );
            }
            return (
              <Link key={item.key} href={item.href} className={className}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
