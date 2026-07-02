export default function PlayLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] h-[100dvh] w-screen overflow-hidden bg-bg [&_*]:!cursor-auto">
      {children}
    </div>
  );
}
