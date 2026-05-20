import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";

export const Route = createFileRoute("/docs/sharing")({
  head: () => ({ meta: [{ title: "Exporting SQL Logic — DashDraft Docs" }] }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Exporting SQL Logic"
      description="Hand off clean, runnable SQL to your data team."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Sharing with Your Team" }, { label: "Exporting SQL" }]}
      toc={[{ id: "single", label: "Single query" }, { id: "session", label: "Whole session" }]}
    >
      <h2 id="single">Single query</h2>
      <p>In the History view, click the copy icon next to any query. Or:</p>
      <CodeBlock language="bash" code="dashdraft history export --id 42 --out churn.sql" />

      <h2 id="session">Whole session</h2>
      <CodeBlock language="bash" code="dashdraft history export --session today --out session.md" />
      <p>The markdown export includes the question, the generated SQL, and a small result preview for each turn.</p>
    </DocsLayout>
  );
}
