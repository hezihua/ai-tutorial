import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { getAllCourses, getCourse, getLecture, getAdjacentLectures } from "../../../lib/content";
import { extractToc } from "../../../lib/toc";
import { rehypeSlugify } from "../../../lib/rehype-slugify";
import TableOfContents from "../../../components/TableOfContents";

export function generateStaticParams() {
  const params: { course: string; lecture: string }[] = [];
  for (const course of getAllCourses()) {
    for (const lecture of course.lectures) {
      params.push({ course: course.slug, lecture: lecture.slug });
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
  params: Promise<{ course: string; lecture: string }>;
}) {
  const { course: courseSlug, lecture: lectureSlug } = await params;
  const course = getCourse(courseSlug);
  const lecture = getLecture(courseSlug, lectureSlug);

  if (!course || !lecture) {
    notFound();
  }

  const { prev: prevLecture, next: nextLecture } = getAdjacentLectures(
    courseSlug,
    lectureSlug
  );
  const toc = extractToc(lecture.content);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl grid grid-cols-1 2xl:grid-cols-[1fr_16rem] gap-8 2xl:gap-12 px-8">
        {/* Main content column */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl py-12">
            <header className="mb-8 pb-6 border-b border-neutral-800">
              <div className="flex items-center gap-3 mb-3">
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
              <h1 className="text-3xl font-bold tracking-tight text-neutral-100 mb-3">
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
                  href={`/courses/${prevLecture.courseSlug}/${prevLecture.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/60 px-5 py-3 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
                >
                  <span className="text-neutral-600 group-hover:text-neutral-400">←</span>
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
                  href={`/courses/${nextLecture.courseSlug}/${nextLecture.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/60 px-5 py-3 transition-colors hover:border-neutral-600 hover:bg-neutral-900 text-right"
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
                  <span className="text-neutral-600 group-hover:text-neutral-400">→</span>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </div>
        </div>

        {/* Right sidebar - TOC */}
        <aside className="hidden 2xl:block">
          <TableOfContents items={toc} accentColor="blue" />
        </aside>
      </div>
    </div>
  );
}
