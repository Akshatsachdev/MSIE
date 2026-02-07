import { Card } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";

function normalizeNarrative(narrative: unknown): string | null {
    if (typeof narrative === "string") {
        const t = narrative.trim();
        return t.length ? t : null;
    }
    if (narrative == null) return null;

    // If backend sends object/array, we show readable JSON (still read-only, no inference)
    try {
        return JSON.stringify(narrative, null, 2);
    } catch {
        return String(narrative);
    }
}

export default function NarrativeBox({
    narrative,
    llmUsed,
}: {
    narrative?: unknown;
    llmUsed?: boolean;
}) {
    const text = normalizeNarrative(narrative);

    return (
        <Card
            title="Narrative"
            actions={<Badge variant="muted">LLM used: {llmUsed ? "ON" : "OFF"}</Badge>}
        >
            {typeof narrative === "object" && narrative !== null ? (
                <div className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
                    {Object.entries(narrative as Record<string, unknown>).map(([k, v]) => (
                        <div key={k} className="rounded-lg border border-black/10 p-3 dark:border-white/10">
                            <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{k}</div>
                            <div className="mt-1">{typeof v === "string" ? v : JSON.stringify(v)}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                    {text || "Narrative unavailable. Deterministic explanation path will be used when enabled."}
                </p>
            )}

        </Card>
    );
}
