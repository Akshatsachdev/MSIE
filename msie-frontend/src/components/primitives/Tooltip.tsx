"use client";

import React from "react";

export function Tooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span className="absolute left-1/2 top-full z-50 mt-2 w-max -translate-x-1/2 rounded-md border border-black/10 bg-white px-2 py-1 text-[11px] text-zinc-700 shadow-sm dark:border-white/10 dark:bg-[#0E141B] dark:text-zinc-200">
          {label}
        </span>
      )}
    </span>
  );
}
