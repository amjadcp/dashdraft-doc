import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Callout } from "@/components/site/Callout";

export const Route = createFileRoute("/docs/claude-setup")({
  head: () => ({ meta: [{ title: "Claude Desktop Setup — DashDraft Docs" }] }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Claude Desktop Setup"
      description="Claude Desktop connects to DashDraft using MCP stdio. This is the recommended setup because it's fully local."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Connecting AI Tools" }, { label: "Claude Desktop" }]}
      toc={[
        { id: "prereqs", label: "Prerequisites" },
        { id: "config", label: "Edit the config" },
        { id: "restart", label: "Restart Claude" },
        { id: "verify", label: "Verify the connection" },
        { id: "troubleshoot", label: "Troubleshooting" },
      ]}
    >
      <h2 id="prereqs">Prerequisites</h2>
      <ul>
        <li>DashDraft installed (see <a href="/docs/installation">Installation</a>)</li>
        <li>Claude Desktop installed from claude.ai/download</li>
      </ul>

      <h2 id="config">Open and edit the Claude config</h2>
      <ol>
        <li>Open Claude Desktop.</li>
        <li>Go to <strong>Settings → Developer → Edit config</strong>.</li>
        <li>Add the DashDraft entry to <code>claude_desktop_config.json</code>.</li>
      </ol>

      <CodeBlock
        language="json"
        code={`{
  "mcpServers": {
    "DashDraft": {
      "command": "dashdraft",
      "args": ["start", "--mcp-stdio"]
    }
  }
}`}
      />

      <Callout variant="tip">
        Claude Desktop launches DashDraft automatically when you ask a question.
        You don't need to manually run <code>dashdraft start</code> for this setup.
      </Callout>

      <h2 id="restart">Restart Claude</h2>
      <p>Fully quit Claude (don't just close the window) and reopen it.</p>

      <h2 id="verify">Verify the connection</h2>
      <p>
        You should see a small hammer icon in the chat composer. Ask
        <em> "List my DashDraft tables"</em> to confirm it works.
      </p>

      <h2 id="troubleshoot">Troubleshooting</h2>
      <ul>
        <li><strong>No hammer icon?</strong> Check the config file path — it varies by OS.</li>
        <li><strong>Command not found?</strong> Restart your terminal so <code>dashdraft</code> is on PATH.</li>
        <li><strong>Still stuck?</strong> Run <code>dashdraft doctor</code> for diagnostics.</li>
      </ul>
    </DocsLayout>
  );
}
