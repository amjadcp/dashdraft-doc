import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";

export const Route = createFileRoute("/docs/sql-history")({
  head: () => ({ meta: [{ title: "Viewing SQL History — DashDraft Docs" }] }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Viewing SQL History"
      description="Every query DashDraft executes is logged automatically."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Using DashDraft" }, { label: "SQL History" }]}
      toc={[
        { id: "access", label: "Access" },
        { id: "view", label: "Reading the view" },
        { id: "export", label: "Export" },
        { id: "clear", label: "Clear" },
      ]}
    >
      <h2 id="access">Access</h2>
      <p>Click <strong>History</strong> in the sidebar, or run:</p>
      <CodeBlock language="bash" code="dashdraft history" />

      <h2 id="view">Reading the view</h2>
      <p>Each row shows the timestamp, query text, status, and a preview of the result. Click a row to expand the full result.</p>

      <CodeBlock
        language="sql"
        code={`-- 2026-05-12 14:22 · 138 rows · 42ms
SELECT
  DATE_TRUNC('month', ordered_at) AS month,
  SUM(amount)                     AS revenue
FROM orders
GROUP BY 1
ORDER BY 1;`}
      />

      <h2 id="export">Export</h2>
      <CodeBlock language="bash" code="dashdraft history export --out sql-log.md" />

      <h2 id="clear">Clear</h2>
      <p>From the History view, click <strong>Clear all</strong>. You'll be asked to confirm.</p>
    </DocsLayout>
  );
}
