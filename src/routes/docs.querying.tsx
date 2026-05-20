import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";

export const Route = createFileRoute("/docs/querying")({
  head: () => ({ meta: [{ title: "Searching & Querying — DashDraft Docs" }] }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Searching & Querying"
      description="Run SQL directly or let the AI write it for you."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Using DashDraft" }, { label: "Querying" }]}
      toc={[{ id: "ai", label: "Through AI" }, { id: "direct", label: "Direct SQL" }]}
    >
      <h2 id="ai">Through AI</h2>
      <p>Ask Claude or ChatGPT a question in plain language. DashDraft translates intent into SQL, runs it locally, and returns the result.</p>
      <h2 id="direct">Direct SQL</h2>
      <p>Use the Query tab in the UI, or:</p>
      <CodeBlock language="bash" code={`dashdraft query "SELECT region, COUNT(*) FROM customers GROUP BY region"`} />
    </DocsLayout>
  );
}
