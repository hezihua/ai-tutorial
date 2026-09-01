import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import {
  TRACKS,
  TRACK_META,
  getAllCourses,
  getAdjacentLectures,
  getCourse,
  getLecture,
  isTrack,
  lectureHref,
} from "@/app/lib/content";
import { extractToc } from "@/app/lib/toc";
import { rehypeSlugify } from "@/app/lib/rehype-slugify";
import TableOfContents from "@/app/components/TableOfContents";

export function generateStaticParams() {
  const params: { track: string; course: string; lecture: string }[] = [];
  for (const track of TRACKS) {
    for (const course of getAllCourses(track)) {
      for (const lecture of course.lectures) {
        params.push({
          track,
          course: course.slug,
          lecture: lecture.slug,
        });
      }
    }
  }
  return params;
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeSlugify, rehypeHighlight, rehypeKatex],
  },
};

export default async function LecturePage({
  params,
}: {
  params: Promise<{ track: string; course: string; lecture: string }>;
}) {
  const { track, course: courseSlug, lecture: lectureSlug } = await params;
  if (!isTrack(track)) notFound();

  const course = getCourse(track, courseSlug);
  const lecture = getLecture(track, courseSlug, lectureSlug);
  if (!course || !lecture) notFound();

  const { prev: prevLecture, next: nextLecture } = getAdjacentLectures(
    track,
    courseSlug,
    lectureSlug
  );
  const toc = extractToc(lecture.content);
  const tocAccent = TRACK_META[track].tocAccent;

  return (
    <div className="min-h-screen">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 2xl:grid-cols-[1fr_14rem] 2xl:gap-8">
        <div className="flex justify-center">
          <div className="w-full max-w-5xl py-12">
            <header className="mb-8 border-b border-neutral-800 pb-6">
              <div className="mb-3 flex items-center gap-3">
                <span className={`text-xs ${course.accent}`}>
                  {course.subtitle}
                </span>
                <span className="text-neutral-700">·</span>
                <span className="text-xs text-neutral-500">{course.title}</span>
                {lecture.date && (
                  <>
                    <span className="text-neutral-700">·</span>
                    <time className="text-xs text-neutral-500">
                      {lecture.date}
                    </time>
                  </>
                )}
              </div>
              <h1 className="mb-3 text-3xl font-bold tracking-tight text-neutral-100">
                {lecture.title}
              </h1>
              {lecture.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {lecture.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-neutral-800/60 px-2 py-0.5 text-xs text-neutral-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <article className="prose prose-invert max-w-none">
              <MDXRemote source={lecture.content} options={mdxOptions} />
            </article>

            <nav className="mt-16 flex items-center justify-between border-t border-neutral-800 pt-8">
              {prevLecture ? (
                <Link
                  href={lectureHref(
                    track,
                    prevLecture.courseSlug,
                    prevLecture.slug
                  )}
                  className="group flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/60 px-5 py-3 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
                >
                  <span className="text-neutral-600 group-hover:text-neutral-400">
                    ←
                  </span>
                  <div className="text-left">
                    <div className="text-xs text-neutral-500">上一篇</div>
                    {prevLecture.courseSlug !== courseSlug && (
                      <div className={`text-[10px] ${prevLecture.courseAccent}`}>
                        {prevLecture.courseTitle}
                      </div>
                    )}
                    <div className="text-sm font-medium text-neutral-300">
                      {prevLecture.title}
                    </div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextLecture ? (
                <Link
                  href={lectureHref(
                    track,
                    nextLecture.courseSlug,
                    nextLecture.slug
                  )}
                  className="group flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/60 px-5 py-3 text-right transition-colors hover:border-neutral-600 hover:bg-neutral-900"
                >
                  <div>
                    <div className="text-xs text-neutral-500">下一篇</div>
                    {nextLecture.courseSlug !== courseSlug && (
                      <div className={`text-[10px] ${nextLecture.courseAccent}`}>
                        {nextLecture.courseTitle}
                      </div>
                    )}
                    <div className="text-sm font-medium text-neutral-300">
                      {nextLecture.title}
                    </div>
                  </div>
                  <span className="text-neutral-600 group-hover:text-neutral-400">
                    →
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </div>
        </div>

        <aside className="hidden 2xl:block">
          <TableOfContents items={toc} accentColor={tocAccent} />
        </aside>
      </div>
    </div>
  );
}
