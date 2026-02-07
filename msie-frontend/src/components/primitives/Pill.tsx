import React from "react";

type PillVariant = "neutral" | "ok" | "offline" | "syncing";

const styles: Record<PillVariant, string> = {
  neutral: "bg-black/5 text-zinc-700 dark:bg-white/10 dark:text-zinc-200",
  ok: "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200",
  offline: "bg-rose-500/10 text-rose-700 dark:bg-rose-400/10 dark:text-rose-200",
  syncing: "bg-sky-500/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-200",
};

export function Pill({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode;
  variant?: PillVariant;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium",
        styles[variant],
        className ?? "",
      ].join(" ")}
    >
      {children}
    </span>
  );
}
