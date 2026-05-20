import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Callout } from "@/components/site/Callout";

export const Route = createFileRoute("/docs/hashing")({
  head: () => ({ meta: [{ title: "Hashing Sensitive Columns — DashDraft Docs" }] }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Hashing Sensitive Columns"
      description="Mark columns like emails, names, or IDs as sensitive so the AI never sees the raw value."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Data Privacy" }, { label: "Hashing" }]}
      toc={[{ id: "mark", label: "Mark a column" }, { id: "behavior", label: "How it appears" }, { id: "team", label: "What your team sees" }]}
    >
      <h2 id="mark">Mark a column as sensitive</h2>
      <p>In the table view, click the lock icon on any column header. Or via CLI:</p>
      <CodeBlock language="bash" code="dashdraft hash customers.email customers.full_name" />

      <h2 id="behavior">How it appears</h2>
      <p>The AI receives a deterministic hash like <code>HASH_a3f9</code> instead of the actual value. Equality and joins still work; the underlying string never leaves your machine.</p>

      <Callout variant="tip">
        Hashes are stable within a session, so the AI can still reason about repeated values ("HASH_a3f9 appears 4 times").
      </Callout>

      <h2 id="team">What your team sees</h2>
      <p>SQL history shows the real column names so your tech team can implement the same logic against the production database.</p>
    </DocsLayout>
  );
}
