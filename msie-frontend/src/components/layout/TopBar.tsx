import ThemeToggle from "./ThemeToggle";
import { Pill } from "@/components/primitives/Pill";

export default function TopBar() {
  return (
    <header className="flex items-center justify-between border-b border-black/10 px-6 py-4 dark:border-white/10">
<div className="flex flex-col">
  <div className="text-sm font-semibold">MSIE — Market Intelligence Dashboard</div>
  <div className="text-xs text-zinc-500 dark:text-zinc-400">Read-only market context terminal</div>
</div>

      <div className="flex items-center gap-3">
        <Pill variant="ok">Online</Pill>
        <ThemeToggle />
      </div>
    </header>
  );
}
