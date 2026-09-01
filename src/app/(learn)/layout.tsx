import Sidebar from "../components/Sidebar";
import {
  TRACKS,
  getAllCourses,
  getFirstLecturePath,
  type Track,
} from "../lib/content";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coursesByTrack = Object.fromEntries(
    TRACKS.map((track) => [
      track,
      getAllCourses(track).map((c) => ({
        slug: c.slug,
        title: c.title,
        subtitle: c.subtitle,
        accent: c.accent,
        lectures: c.lectures.map((l) => ({
          slug: l.slug,
          title: l.title,
          order: l.order,
        })),
      })),
    ])
  ) as Record<
    Track,
    {
      slug: string;
      title: string;
      subtitle: string;
      accent: string;
      lectures: { slug: string; title: string; order: number }[];
    }[]
  >;

  const firstLectureByTrack = Object.fromEntries(
    TRACKS.map((track) => [track, getFirstLecturePath(track)])
  ) as Record<Track, string | null>;

  return (
    <>
      <Sidebar
        coursesByTrack={coursesByTrack}
        firstLectureByTrack={firstLectureByTrack}
      />
      <main className="ml-72 min-h-screen">{children}</main>
    </>
  );
}
