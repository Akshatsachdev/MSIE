import { Card } from "@/components/primitives/Card";
import { uiTokens } from "@/config/uiTokens";

export default function MetricCard({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string;
  sublabel?: string;
}) {
  return (
    <Card className="p-4">
      <div className={uiTokens.type.label}>{label}</div>
      <div className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{value}</div>
      {sublabel && <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{sublabel}</div>}
    </Card>
  );
}
