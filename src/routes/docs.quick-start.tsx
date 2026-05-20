import { createFileRoute, Link } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Callout } from "@/components/site/Callout";

export const Route = createFileRoute("/docs/quick-start")({
  head: () => ({ meta: [{ title: "Quick Start — DashDraft Docs" }] }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Quick Start"
      description="Go from install to your first AI-powered query in under five minutes."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Getting Started" }, { label: "Quick Start" }]}
      toc={[
        { id: "start", label: "Start DashDraft" },
        { id: "import", label: "Import a CSV" },
        { id: "connect", label: "Connect an AI" },
        { id: "ask", label: "Ask your first question" },
      ]}
    >
      <h2 id="start">Start DashDraft</h2>
      <CodeBlock language="bash" code="dashdraft start" />
      <p>This launches the local UI at <code>http://localhost:7700</code>.</p>

      <h2 id="import">Import a CSV</h2>
      <p>Drag any CSV file into the workspace panel, or run:</p>
      <CodeBlock language="bash" code="dashdraft import ./orders.csv" />

      <h2 id="connect">Connect an AI</h2>
      <ul>
        <li><Link to="/docs/claude-setup">Claude Desktop</Link> — recommended, fully local.</li>
        <li><Link to="/docs/chatgpt-setup">ChatGPT</Link> — uses a secure ngrok tunnel.</li>
      </ul>

      <h2 id="ask">Ask your first question</h2>
      <p>
        Open Claude or ChatGPT and ask something like: <em>"What's the average order
        value per month in my orders dataset?"</em> DashDraft runs the SQL locally and
        returns only the result.
      </p>

      <Callout variant="success" title="That's it">
        You're now querying your data with AI — no uploads, no waiting, no API token waste.
      </Callout>
    </DocsLayout>
  );
}
