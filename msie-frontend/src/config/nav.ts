// src/config/nav.ts
export type NavItem = {
  href: string;
  label: string;
  iconKey: "overview" | "state" | "confidence" | "chat";
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Overview", iconKey: "overview" },
  { href: "/state", label: "Market State", iconKey: "state" },
  { href: "/confidence", label: "Confidence", iconKey: "confidence" },
  { href: "/chat", label: "Explainability Chat", iconKey: "chat" },
];
