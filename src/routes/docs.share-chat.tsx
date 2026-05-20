import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";

export const Route = createFileRoute("/docs/share-chat")({
  head: () => ({ meta: [{ title: "Sharing Chat History — DashDraft Docs" }] }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Sharing Chat History"
      description="Send the full back-and-forth — questions, SQL, and results — to a teammate."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Sharing with Your Team" }, { label: "Sharing Chat" }]}
      toc={[{ id: "export", label: "Export a session" }, { id: "format", label: "Format" }]}
    >
      <h2 id="export">Export a session</h2>
      <CodeBlock language="bash" code="dashdraft chat export latest --out churn-analysis.md" />
      <h2 id="format">Format</h2>
      <p>Markdown by default, with optional <code>--format json</code> for tooling.</p>
    </DocsLayout>
  );
}
