"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";
import LayoutContent from "@/components/LayoutContent";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isRootPage = pathname === "/";
  const isQrPage = pathname?.startsWith("/qr");

  // Rotas públicas que não devem ter Sidebar e LayoutContent
  const isPublicRoute = isLoginPage || isRootPage || isQrPage;

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <div className="bg-zinc-950 text-zinc-100 pt-16">
      <SidebarProvider>
        <Sidebar />
        <LayoutContent>{children}</LayoutContent>
      </SidebarProvider>
    </div>
  );
}
