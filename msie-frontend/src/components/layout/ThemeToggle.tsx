"use client";

import { useTheme } from "@/app/providers";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const items = [
    { v: "light", l: "Light" },
    { v: "dark", l: "Dark" },
    { v: "system", l: "System" },
  ] as const;

  return (
    <div className="flex items-center gap-1 rounded-lg border border-black/10 bg-black/5 p-1 dark:border-white/10 dark:bg-white/5">
      {items.map((it) => (
        <button
          key={it.v}
          onClick={() => setTheme(it.v)}
          className={[
            "px-3 py-1.5 text-xs rounded-md transition",
            theme === it.v
              ? "bg-white text-zinc-900 dark:bg-zinc-100 dark:text-zinc-900"
              : "text-zinc-700 hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10",
          ].join(" ")}
        >
          {it.l}
        </button>
      ))}
    </div>
  );
}
