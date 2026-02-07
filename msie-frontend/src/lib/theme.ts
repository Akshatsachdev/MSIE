// src/lib/theme.ts
export type ThemeMode = "light" | "dark" | "system";

const STORAGE_KEY = "msie.theme";

export function getStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "system";
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === "light" || v === "dark" || v === "system") return v;
  return "system";
}

export function storeTheme(theme: ThemeMode) {
  localStorage.setItem(STORAGE_KEY, theme);
}

export function systemPrefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  const shouldDark = theme === "dark" || (theme === "system" && systemPrefersDark());
  root.classList.toggle("dark", shouldDark);
}
