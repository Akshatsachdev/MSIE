import React from "react";

type BadgeVariant = "neutral" | "muted" | "info" | "warn";

const styles: Record<BadgeVariant, string> = {
  neutral: "bg-black/5 text-zinc-800 dark:bg-white/10 dark:text-zinc-100",
  muted: "bg-black/5 text-zinc-600 dark:bg-white/5 dark:text-zinc-300",
  info: "bg-black/5 text-zinc-800 dark:bg-white/10 dark:text-zinc-100",
  warn: "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200",
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium",
        styles[variant],
        className ?? "",
      ].join(" ")}
    >
      {children}
    </span>
  );
}
