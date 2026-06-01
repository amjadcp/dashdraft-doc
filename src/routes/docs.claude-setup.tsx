import { createFileRoute, Link } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Callout } from "@/components/site/Callout";

export const Route = createFileRoute("/docs/claude-setup")({
  head: () => ({ meta: [{ title: "Connecting to Claude Desktop — DashDraft Docs" }] }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Connecting to Claude Desktop"
      description="Claude Desktop connects to DashDraft using MCP stdio."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Connecting AI Tools" }, { label: "Claude Desktop" }]}
      toc={[
        { id: "prereqs", label: "Section 1: Prerequisites" },
        { id: "gui-helper", label: "Section 2: Using the GUI Setup Helper" },
        { id: "verify", label: "Section 3: Verifying the Connection" },
        { id: "troubleshoot", label: "Section 4: Troubleshooting" },
      ]}
    >
      {/* TODO - This section needs to be updated to reflect the new UI */}
      {/* <Callout variant="success">
      The GUI application provides a built-in setup helper to make configuration seamless.
        The GUI app includes built-in setup helpers for Claude Desktop. You don't need to manually hunt down hidden folders or remember JSON configurations — the app handles the heavy lifting for you!
      </Callout> */}

      <h2 id="prereqs">Section 1: Prerequisites</h2>
      <ul>
        <li>
          <strong>DashDraft GUI App:</strong> Installed and currently showing a green <span className="inline-flex items-center rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-500">Running</span> status badge.
        </li>
        <li>
          <strong>Claude Desktop:</strong> Installed on your local machine (download free at <a href="https://claude.ai/download" target="_blank" rel="noreferrer" className="text-primary hover:underline">claude.ai/download</a>).
        </li>
      </ul>

      <h2 id="gui-helper">Section 2: Using the GUI Setup Helper</h2>
      <p>
        The GUI app includes a built-in helper card designed to automate config file lookups and provide copy-paste shortcuts.
      </p>

      <div className="my-6">
        <img
          src="/gui_claude_setup_card.png"
          alt="Claude Desktop Setup helper in DashDraft GUI Control Center"
          className="rounded-lg border border-border/80 shadow-md max-w-full"
        />
      </div>

      <ol className="space-y-4">
        <li>
          <strong>Expand the Setup Section:</strong> Launch your DashDraft GUI App, scroll down to the <strong>Claude Desktop Setup</strong> card, and click to expand it.
        </li>
        <li>
          <strong>Copy the Config JSON:</strong> Inside the expanded helper, click the blue <strong>Copy Config</strong> button. This copies the exact JSON structure required by Claude:
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
        </li>
        <li>
          <strong>Open the Claude config:</strong> Open Claude Desktop, and go to <strong>Settings &rarr; Developer &rarr; Edit config</strong>.
        </li>
        <li>
          <strong>Edit the Config File:</strong> Paste the copied block into the file. If you already have other MCP servers active, add the <code>"DashDraft"</code> object inside the existing <code>"mcpServers"</code> map.
        </li>
        <li>
          <strong>Save and Close:</strong> Save the changes in your text editor and close the file.
        </li>
        <li>
          <strong>Restart Claude Desktop:</strong> Fully quit Claude Desktop (make sure it is not hidden in your system tray or menu bar) and reopen it.
        </li>
      </ol>

      <h2 id="verify">Section 3: Verifying the Connection</h2>
      <p>
        To verify that Claude Desktop has successfully connected to your local DashDraft service:
      </p>
      <ol>
        <li>Launch Claude Desktop.</li>
        <li>Start a brand new conversation.</li>
        <li>
          Click the <strong>Attachment (+)</strong> icon next to the chat input field.
        </li>
        <li>
          In the menu, hover over <strong>Connectors</strong>. You should see <strong>dashdraft</strong> listed.
        </li>
        <li>
          Make sure the toggle switch next to <strong>dashdraft</strong> is turned <strong>on</strong> (blue).
        </li>
        <li>
          Test the query loop by asking:
          <blockquote className="border-l-4 border-primary/40 bg-secondary/30 p-3 italic my-3 text-foreground/80 rounded">
            "What tables are in my active workspace?"
          </blockquote>
        </li>
        <li>
          Claude will run the tool locally, fetch workspace tables, and describe them directly inside your chat window without any data leaving your computer.
        </li>
      </ol>

      <h2 id="troubleshoot">Section 4: Troubleshooting</h2>
      <p>
        If Claude Desktop doesn't display the hammer icon or fails to connect:
      </p>
      <ul>
        <li>
          <strong>Verify Service Status:</strong> Check that the DashDraft GUI App is active and showing a green <span className="inline-flex items-center rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-500">Running</span> indicator in the Core Service section.
        </li>
        <li>
          <strong>Validate JSON Syntax:</strong> If Claude fails to load, ensure your <code>claude_desktop_config.json</code> is valid. You can paste the contents of your file into a free validator like <a href="https://jsonlint.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">jsonlint.com</a> to verify formatting.
        </li>
        <li>
          <strong>Hard Restart Claude:</strong> Make sure you fully exit Claude. On macOS, click <strong>Claude &gt; Quit Claude</strong> in the top menu bar. On Windows, right-click the Claude icon in the system tray and select exit.
        </li>
        <li>
          <strong>Advanced configurations:</strong> If you prefer to manually configure or run the server in developer stdio modes, check out the <Link to="/docs/advanced-cli" className="text-primary hover:underline font-medium">Advanced: Using the CLI</Link> documentation.
        </li>
      </ul>

      <div className="mt-12 border-t border-border pt-6 flex justify-between items-center text-sm">
        <Link to="/docs/quick-start" className="text-muted-foreground hover:underline">
          &larr; Starting DashDraft
        </Link>
        <Link to="/docs/chatgpt-setup" className="text-primary font-medium hover:underline">
          Connecting ChatGPT &rarr;
        </Link>
      </div>
    </DocsLayout>
  );
}
