const projectAccent = {
  web: {
    gradient: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
    border: "border-violet-500/20 hover:border-violet-500/50",
    dot: "bg-violet-400",
    badge: "bg-violet-500/10 text-violet-300 border-violet-500/30",
    arrow: "group-hover:text-violet-400 text-neutral-500",
  },
  blog: {
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    border: "border-amber-500/20 hover:border-amber-500/50",
    dot: "bg-amber-400",
    badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    arrow: "group-hover:text-amber-400 text-neutral-500",
  },
  engineering: {
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    border: "border-emerald-500/20 hover:border-emerald-500/50",
    dot: "bg-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    arrow: "group-hover:text-emerald-400 text-neutral-500",
  },
} as const;

export type ProjectKey = keyof typeof projectAccent;

interface SubProject {
  name: string;
  description: string;
  url: string;
  status: "active" | "planned";
}

export function ProjectCard({
  project,
  url,
  accentKey,
}: {
  project: SubProject;
  url: string;
  accentKey: ProjectKey;
}) {
  const accent = projectAccent[accentKey];
  const isActive = project.status === "active";

  return (
    <a
      href={isActive ? url : undefined}
      target={isActive ? "_blank" : undefined}
      rel={isActive ? "noopener noreferrer" : undefined}
      aria-disabled={!isActive}
      className={!isActive ? "pointer-events-none" : undefined}
    >
      <div
        className={`group relative overflow-hidden rounded-2xl border p-7 transition-all duration-300 bg-neutral-900/40 backdrop-blur-sm ${
          isActive
            ? `${accent.border} hover:bg-neutral-900 hover:-translate-y-0.5`
            : "border-neutral-800/50 opacity-60"
        }`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${accent.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
          aria-hidden
        />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${accent.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
              {isActive ? "在线访问" : "规划中"}
            </span>
          </div>

          <h2 className="text-lg font-semibold text-neutral-100 mb-2 tracking-tight">
            {project.name}
          </h2>

          <p className="text-sm text-neutral-400 leading-relaxed mb-6 min-h-[3.75rem]">
            {project.description}
          </p>

          {isActive && (
            <div className={`flex items-center gap-2 text-sm transition-colors ${accent.arrow}`}>
              <span>打开站点</span>
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
