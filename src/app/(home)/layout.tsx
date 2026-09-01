import { TopBar } from "./TopBar";

export default function HomeGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      {children}
    </>
  );
}
