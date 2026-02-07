import React from "react";
import { uiTokens } from "@/config/uiTokens";

type ButtonVariant = "primary" | "ghost";

export function Button({
  children,
  onClick,
  disabled,
  variant = "primary",
  className,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition " +
    uiTokens.focus.ring;

  const variantClass =
    variant === "primary"
      ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
      : "bg-transparent text-zinc-700 hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10";

  const disabledClass = disabled ? "opacity-50 cursor-not-allowed hover:bg-inherit" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[base, variantClass, disabledClass, className ?? ""].join(" ")}
    >
      {children}
    </button>
  );
}
