import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";

export const Route = createFileRoute("/docs/data-flow")({
  head: () => ({ meta: [{ title: "Understanding Data Flow — DashDraft Docs" }] }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Understanding Data Flow"
      description="A deeper look at where bytes travel when you query with DashDraft."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Data Privacy" }, { label: "Data Flow" }]}
      toc={[{ id: "claude", label: "With Claude Desktop" }, { id: "chatgpt", label: "With ChatGPT" }]}
    >
      <h2 id="claude">With Claude Desktop</h2>
      <p>
        Claude spawns DashDraft locally via stdio. Your prompt → Claude API → SQL plan → back
        to your machine → DuckDB executes → results → Claude API → your screen. The dataset itself
        never leaves your computer.
      </p>

      <h2 id="chatgpt">With ChatGPT</h2>
      <p>
        ChatGPT reaches DashDraft via a TLS-encrypted ngrok tunnel. ngrok relays encrypted bytes
        and cannot read them. As with Claude, only query results — not raw rows — are returned
        to OpenAI.
      </p>
    </DocsLayout>
  );
}
