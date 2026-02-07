import { Badge } from "@/components/primitives/Badge";

export default function RegimeBadge({ marketState }: { marketState?: string }) {
  return <Badge>{marketState || "UNKNOWN"}</Badge>;
}
