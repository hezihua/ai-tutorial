import { redirect, notFound } from "next/navigation";
import {
  TRACKS,
  getAllCourses,
  getCourse,
  isTrack,
  lectureHref,
} from "@/app/lib/content";

export function generateStaticParams() {
  const params: { track: string; course: string }[] = [];
  for (const track of TRACKS) {
    for (const course of getAllCourses(track)) {
      params.push({ track, course: course.slug });
    }
  }
  return params;
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ track: string; course: string }>;
}) {
  const { track, course: courseSlug } = await params;
  if (!isTrack(track)) notFound();

  const course = getCourse(track, courseSlug);
  if (!course) notFound();

  if (course.lectures.length > 0) {
    redirect(lectureHref(track, course.slug, course.lectures[0].slug));
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-neutral-500">该课程暂无笔记内容</p>
    </div>
  );
}
