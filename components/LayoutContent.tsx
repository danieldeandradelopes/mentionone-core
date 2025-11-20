"use client";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={`
        min-h-screen p-8 transition-all duration-300
        pl-0
        lg:pl-64
      `}
    >
      <div className="w-full max-w-7xl mx-auto">{children}</div>
    </main>
  );
}
