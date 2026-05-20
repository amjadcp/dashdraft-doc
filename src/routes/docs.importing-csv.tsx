import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";

export const Route = createFileRoute("/docs/importing-csv")({
  head: () => ({ meta: [{ title: "Importing CSV Files — DashDraft Docs" }] }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Importing CSV Files"
      description="Bring data into DashDraft from the UI or the command line."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Using DashDraft" }, { label: "Importing CSV" }]}
      toc={[
        { id: "ui", label: "From the UI" },
        { id: "cli", label: "From the CLI" },
        { id: "schema", label: "Auto-detected schema" },
      ]}
    >
      <h2 id="ui">From the UI</h2>
      <p>Drag a CSV file into the workspace panel. DashDraft parses headers, infers types, and creates a table named after the file (without the extension).</p>

      <h2 id="cli">From the CLI</h2>
      <CodeBlock language="bash" code={`dashdraft import ./orders.csv\ndashdraft import ./events.csv --table user_events`} />

      <h2 id="schema">Auto-detected schema</h2>
      <p>DashDraft samples the first 1,000 rows to infer types. Override with <code>--schema</code> if needed.</p>
    </DocsLayout>
  );
}
