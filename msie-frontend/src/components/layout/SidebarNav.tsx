"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/config/nav";
import { uiTokens } from "@/config/uiTokens";

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside
      className={[
        "h-screen shrink-0",
        uiTokens.surfaces.panelSolid,
        uiTokens.surfaces.border,
        "px-4 py-6",
      ].join(" ")}
      style={{ width: uiTokens.layout.sidebarWidth }}
    >
      <div className="mb-6 text-sm font-semibold">MSIE</div>

      <nav className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "block rounded-lg px-3 py-2 text-sm transition",
                active
                  ? "bg-black/5 text-zinc-900 dark:bg-white/10 dark:text-zinc-100"
                  : "text-zinc-600 hover:bg-black/5 dark:text-zinc-400 dark:hover:bg-white/5",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
