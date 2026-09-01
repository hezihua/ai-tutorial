import { redirect, notFound } from "next/navigation";
import { getFirstLecturePath, isTrack } from "@/app/lib/content";

export function generateStaticParams() {
  return [{ track: "ml" }, { track: "engineering" }];
}

export default async function TrackHome({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track } = await params;
  if (!isTrack(track)) notFound();

  const first = getFirstLecturePath(track);
  if (first) redirect(first);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-neutral-500">该分类暂无课程内容</p>
    </div>
  );
}
