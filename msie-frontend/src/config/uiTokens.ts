export const uiTokens = {
  layout: { sidebarWidth: 272, pageMaxWidth: 1280 },
  radii: { sm: "10px", md: "14px", lg: "18px", xl: "22px" },
  spacing: { xs: "8px", sm: "12px", md: "16px", lg: "20px", xl: "24px", "2xl": "32px" },
  type: {
    pageTitle: "text-xl md:text-2xl font-semibold tracking-tight",
    sectionTitle: "text-sm font-medium text-zinc-700 dark:text-zinc-300",
    label: "text-xs font-medium text-zinc-600 dark:text-zinc-400",
    value: "text-2xl font-semibold text-zinc-900 dark:text-zinc-100",
    body: "text-sm text-zinc-700 dark:text-zinc-300",
    muted: "text-xs text-zinc-500 dark:text-zinc-400",
    mono: "font-mono text-xs",
  },
  surfaces: {
    appBg: "bg-zinc-50 dark:bg-[#0B0F14]",
    panel: "bg-white/80 dark:bg-white/5 backdrop-blur",
    panelSolid: "bg-white dark:bg-[#0E141B]",
    border: "border border-black/10 dark:border-white/10",
    divider: "border-t border-black/10 dark:border-white/10",
    shadow: "shadow-[0_1px_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0_rgba(255,255,255,0.04)]",
  },
  focus: { ring: "focus:outline-none focus:ring-2 focus:ring-zinc-400/40 dark:focus:ring-zinc-200/20" },
} as const;
