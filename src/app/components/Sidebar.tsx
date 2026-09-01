"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Track } from "../lib/tracks";
import { TRACK_META } from "../lib/tracks";

interface CourseMeta {
  slug: string;
  title: string;
  subtitle: string;
  accent: string;
  lectures: LectureMeta[];
}

interface LectureMeta {
  slug: string;
  title: string;
  order: number;
}

interface SidebarProps {
  coursesByTrack: Record<Track, CourseMeta[]>;
}

function parseTrack(pathname: string): Track {
  if (pathname.startsWith("/engineering")) return "engineering";
  return "ml";
}

export default function Sidebar({ coursesByTrack }: SidebarProps) {
  const pathname = usePathname();
  const track = parseTrack(pathname);
  const trackMeta = TRACK_META[track];
  const courses = coursesByTrack[track];

  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(
    () => new Set()
  );

  const currentCourseSlug = useMemo(() => {
    const match = pathname.match(/^\/(?:ml|engineering)\/courses\/([^/]+)/);
    return match?.[1] ?? null;
  }, [pathname]);

  const currentLectureSlug = useMemo(() => {
    const match = pathname.match(
      /^\/(?:ml|engineering)\/courses\/[^/]+\/([^/]+)/
    );
    return match?.[1] ?? null;
  }, [pathname]);

  useEffect(() => {
    if (currentCourseSlug) {
      setExpandedCourses((prev) => new Set(prev).add(currentCourseSlug));
    }
  }, [currentCourseSlug, track]);

  const toggleCourse = (slug: string) => {
    setExpandedCourses((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const isActive = (courseSlug: string, lectureSlug?: string) => {
    if (!lectureSlug)
      return currentCourseSlug === courseSlug && !currentLectureSlug;
    return (
      currentCourseSlug === courseSlug && currentLectureSlug === lectureSlug
    );
  };

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-72 flex-col border-r border-neutral-800 bg-neutral-950">
      <div className="border-b border-neutral-800 p-5">
        <Link href="/" className="block">
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`inline-block h-2 w-2 rounded-full ${trackMeta.accentDot}`}
            />
            <span className="text-xs uppercase tracking-wider text-neutral-500">
              AI Tutorial
            </span>
          </div>
          <h1 className="text-lg font-semibold text-neutral-100">
            {trackMeta.brand}
          </h1>
          <p className="mt-1 text-xs text-neutral-500">{trackMeta.subtitle}</p>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <div className="mb-2 px-2 text-[10px] font-medium uppercase tracking-wider text-neutral-600">
          课程目录
        </div>

        {courses.map((course) => {
          const isExpanded = expandedCourses.has(course.slug);
          const hasLectures = course.lectures.length > 0;

          return (
            <div key={course.slug} className="mb-1">
              <button
                onClick={() => toggleCourse(course.slug)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors ${
                  currentCourseSlug === course.slug
                    ? "bg-neutral-800/60 text-neutral-100"
                    : "text-neutral-300 hover:bg-neutral-900"
                }`}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span className={`shrink-0 text-xs ${course.accent}`}>●</span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">
                      {course.title}
                    </div>
                    <div className="truncate text-[10px] text-neutral-500">
                      {course.subtitle}
                    </div>
                  </div>
                </div>
                <svg
                  className={`h-3.5 w-3.5 shrink-0 text-neutral-600 transition-transform ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {isExpanded && hasLectures && (
                <ul className="mt-1 ml-4 space-y-0.5 border-l border-neutral-800 pl-3">
                  {course.lectures.map((lecture) => (
                    <li key={lecture.slug}>
                      <Link
                        href={`/${track}/courses/${course.slug}/${lecture.slug}`}
                        className={`block rounded-md px-2.5 py-1.5 text-xs transition-colors ${
                          isActive(course.slug, lecture.slug)
                            ? "bg-neutral-800 font-medium text-neutral-100"
                            : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200"
                        }`}
                      >
                        {lecture.order < 999 && (
                          <span className="mr-1.5 text-neutral-600">
                            {String(lecture.order).padStart(2, "0")}
                          </span>
                        )}
                        {lecture.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {isExpanded && !hasLectures && (
                <div className="ml-4 border-l border-neutral-800 py-1.5 pl-3 text-[10px] text-neutral-600">
                  暂无笔记
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-neutral-800 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-neutral-500 transition-colors hover:text-neutral-300"
        >
          <span>←</span>
          <span>返回首页</span>
        </Link>
      </div>
    </aside>
  );
}
