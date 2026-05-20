import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { Callout } from "@/components/site/Callout";
import { ArrowRight, FileSpreadsheet, Database, Brain } from "lucide-react";

export const Route = createFileRoute("/docs/privacy")({
  head: () => ({ meta: [{ title: "How Data Privacy Works — DashDraft Docs" }] }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="How Data Privacy Works"
      description="What the AI sees, what stays on your machine, and why."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Data Privacy" }, { label: "How it works" }]}
      toc={[
        { id: "flow", label: "Data flow" },
        { id: "ai-sees", label: "What the AI sees" },
        { id: "ngrok", label: "ngrok security" },
      ]}
    >
      <h2 id="flow">Data flow</h2>
      <div className="not-prose my-6 rounded-xl border border-border bg-secondary/40 p-6">
        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <Box icon={FileSpreadsheet} label="CSV files" sub="On your computer" />
          <ArrowRight className="mx-auto h-5 w-5 text-muted-foreground" />
          <Box icon={Database} label="DuckDB query" sub="Local, in-process" />
          <ArrowRight className="mx-auto h-5 w-5 text-muted-foreground" />
          <Box icon={Brain} label="AI assistant" sub="Receives results only" />
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Raw rows never leave your machine. The model receives the query output, not the dataset.
        </p>
      </div>

      <Callout variant="success">
        Your CSV files are never uploaded to Claude or ChatGPT. The AI only receives
        query results — aggregate data, counts, or filtered rows you explicitly request.
      </Callout>

      <h2 id="ai-sees">What the AI sees</h2>
      <ul>
        <li>The table schemas (column names and types) so it can write valid SQL.</li>
        <li>The output of queries it runs — typically a few rows or aggregates.</li>
        <li>Sensitive columns you've marked (see <a href="/docs/hashing">Hashing</a>) appear as opaque hashes.</li>
      </ul>

      <h2 id="ngrok">ngrok security</h2>
      <p>
        The tunnel is end-to-end TLS encrypted between ChatGPT and your machine. ngrok
        relays bytes but cannot decrypt them. We recommend a reserved domain plus
        ngrok's basic-auth option for shared environments.
      </p>
    </DocsLayout>
  );
}

function Box({ icon: Icon, label, sub }: { icon: typeof FileSpreadsheet; label: string; sub: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 text-center">
      <Icon className="mx-auto mb-2 h-6 w-6 text-primary" />
      <div className="text-sm font-semibold">{label}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}
