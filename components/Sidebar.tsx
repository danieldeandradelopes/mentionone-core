"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Box,
  MessageSquare,
  Settings,
  Menu,
  X,
  QrCode,
} from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen: open, setIsOpen: setOpen } = useSidebar();

  // Não exibe a sidebar em rotas que não são administrativas
  // A sidebar é apenas para usuários logados na área admin
  if (!pathname.startsWith("/admin")) {
    return null;
  }

  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/boxes", label: "Boxes", icon: Box },
    { href: "/admin/qrcodes", label: "QR Codes", icon: QrCode },
    { href: "/admin/feedbacks", label: "Feedback", icon: MessageSquare },
    { href: "/admin/settings", label: "Configurações", icon: Settings },
  ];

  return (
    <>
      {/* BOTÃO MOBILE — ABRIR */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-zinc-900 p-2 rounded-lg border border-zinc-700 shadow"
      >
        <Menu size={22} className="text-white" />
      </button>

      {/* BACKDROP MOBILE */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-[#0D0D0D] border-r border-zinc-800
          flex flex-col z-50 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="h-16 border-b border-zinc-800 flex items-center justify-between px-5">
          <span className="text-xl font-semibold text-white">MeuApp</span>

          {/* Botão fechar mobile */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-800"
          >
            <X size={20} className="text-zinc-300" />
          </button>
        </div>

        {/* NAV LINKS */}
        <nav className="flex-1 mt-4">
          <ul className="flex flex-col gap-1 px-3">
            {links.map(({ href, label, icon: Icon }) => {
              const active = pathname.startsWith(href);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
                      ${
                        active
                          ? "bg-zinc-800 text-white"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      }
                    `}
                  >
                    <Icon
                      size={18}
                      className={active ? "text-emerald-400" : "text-zinc-500"}
                    />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* FOOTER */}
        <footer className="px-4 py-4 text-xs text-zinc-500 border-t border-zinc-800">
          © {new Date().getFullYear()} MeuApp
        </footer>
      </aside>
    </>
  );
}
