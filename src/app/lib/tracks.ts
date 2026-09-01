export type Track = "ml" | "engineering";

export const TRACKS: Track[] = ["ml", "engineering"];

export const TRACK_META: Record<
  Track,
  {
    label: string;
    brand: string;
    subtitle: string;
    accentDot: string;
    tocAccent: "blue" | "cyan";
  }
> = {
  ml: {
    label: "机器学习",
    brand: "课程笔记",
    subtitle: "李宏毅老师 · ML 系列",
    accentDot: "bg-amber-400",
    tocAccent: "blue",
  },
  engineering: {
    label: "AI 工程化",
    brand: "工程笔记",
    subtitle: "RAG · Agent · MLOps · Infra",
    accentDot: "bg-cyan-400",
    tocAccent: "cyan",
  },
};

export function isTrack(value: string): value is Track {
  return value === "ml" || value === "engineering";
}
