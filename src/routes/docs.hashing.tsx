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
      toc={[
        { id: "mark", label: "Mark a column" },
        { id: "behavior", label: "How it appears" },
        { id: "team", label: "What your team sees" },
        { id: "exclusion", label: "AI Exclusion" },
      ]}
    >
      <h2 id="mark">Mark a column as sensitive</h2>
      <p>In the table view, click the lock icon on any column header to toggle security modes.</p>

      <h2 id="behavior">How it appears</h2>
      <p>The AI receives a deterministic hash like <code>HASH_a3f9</code> instead of the actual value. Equality and joins still work; the underlying string never leaves your machine.</p>

      <Callout variant="tip">
        Hashes are stable within a session, so the AI can still reason about repeated values ("HASH_a3f9 appears 4 times").
      </Callout>

      <h2 id="team">What your team sees</h2>
      <p>SQL history shows the real column names so your tech team can implement the same logic against the production database.</p>

      <h2 id="exclusion">AI Exclusion</h2>
      <p>
        Beyond standard hashing, DashDraft implements a stricter mechanism called <strong>AI Exclusion</strong> for columns where even hashed values, matches, or joins are prohibited.
      </p>
      <ul>
        <li><strong>Strict Query Prevention:</strong> The AI is completely prohibited from selecting, reading, or referencing this column in any generated SQL queries.</li>
        <li><strong>Local Interception:</strong> If requested by the AI, the query is strictly intercepted and blocked locally on your machine prior to database execution.</li>
        <li><strong>Fully Reversible:</strong> Fully reversible at any time by toggling the column's exclusion status in your table options.</li>
      </ul>
    </DocsLayout>
  );
}
