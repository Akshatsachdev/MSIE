import React from "react";
import { uiTokens } from "@/config/uiTokens";

type CardProps = {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function Card({ title, subtitle, actions, children, className }: CardProps) {
  return (
    <section
      className={[
        uiTokens.surfaces.panel,
        uiTokens.surfaces.border,
        uiTokens.surfaces.shadow,
        "rounded-[14px] p-4",
        className ?? "",
      ].join(" ")}
    >
      {(title || subtitle || actions) && (
        <header className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            {title && <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>}
            {subtitle && <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{subtitle}</p>}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </header>
      )}

      <div>{children}</div>
    </section>
  );
}
