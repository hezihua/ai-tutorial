import Sidebar from "../components/Sidebar";
import { TopBar } from "../components/TopBar";
import { TRACKS, getAllCourses, type Track } from "../lib/content";

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

  return (
    <>
      <Sidebar coursesByTrack={coursesByTrack} />
      <div className="ml-72 min-h-screen">
        <TopBar />
        <main>{children}</main>
      </div>
    </>
  );
}
