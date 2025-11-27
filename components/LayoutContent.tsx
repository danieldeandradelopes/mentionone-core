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
        ${isAdminRoute ? "bg-gray-50" : "p-0"}
        ${
          isAdminRoute
            ? "pt-4 pb-4 pr-4 sm:pt-6 sm:pb-6 sm:pr-6 lg:pt-8 lg:pb-8 lg:pr-8"
            : ""
        }
        ${isAdminRoute ? "pl-4 sm:pl-6 lg:pl-[280px]" : ""}
        ${isAdminRoute ? "w-full" : ""}
        overflow-x-hidden
      `}
    >
      <div className={isAdminRoute ? "w-full max-w-7xl mx-auto" : "w-full"}>
        {children}
      </div>
    </main>
  );
}
