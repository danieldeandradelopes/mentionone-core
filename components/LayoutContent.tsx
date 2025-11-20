"use client";

import { usePathname } from "next/navigation";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <main
      className={`
        min-h-screen transition-all duration-300
        ${isAdminRoute ? "p-8" : "p-0"}
        pl-0
        ${isAdminRoute ? "lg:pl-64" : ""}
      `}
    >
      <div className={isAdminRoute ? "w-full max-w-7xl mx-auto" : "w-full"}>
        {children}
      </div>
    </main>
  );
}
