import { createFileRoute, Link } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Callout } from "@/components/site/Callout";

export const Route = createFileRoute("/docs/quick-start")({
  head: () => ({ meta: [{ title: "Starting DashDraft — DashDraft Docs" }] }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Starting DashDraft"
      description="Launch your local analytical dashboard instantly using either the graphical dashboard launcher or the command-line utility."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Getting Started" }, { label: "Starting DashDraft" }]}
      toc={[
        { id: "gui-start", label: "Section 1: Using the GUI (Recommended)" },
        { id: "cli-start", label: "Section 2: Using the CLI (Optional)" },
        { id: "dashboard-verify", label: "Navigating your dashboard" },
      ]}
    >
      <Callout variant="tip">
        The GUI Control Center is the easiest way to monitor DashDraft. The Dashboard local URL is always clearly displayed so you can launch it in a single click.
      </Callout>

      <h2 id="gui-start">Section 1: Using the GUI (Recommended)</h2>
      <p>
        The GUI application provides an intuitive control dashboard, making it the perfect choice for non-technical users and business owners.
      </p>

      <h3>Step 1: Launch the DashDraft GUI App</h3>
      <ul>
        <li><strong>macOS:</strong> Open your <code>Applications</code> directory and double-click <strong>DashDraft</strong>.</li>
        <li><strong>Windows:</strong> Select the <strong>DashDraft</strong> icon inside your Start Menu or double-click the Desktop shortcut.</li>
        <li><strong>Linux:</strong> Run <code>dashdraft-gui</code> inside your shell or click the DashDraft entry in your desktop Applications list.</li>
      </ul>

      <h3>Step 2: Locate the "Core Service" card</h3>
      <p>
        At the top of the interface, you'll find the <strong>Core Service</strong> section. Look for the status indicator text:
      </p>
      <ul>
        <li>
          <span className="inline-flex items-center rounded bg-gray-500/10 px-2 py-0.5 text-xs font-semibold text-gray-400">Stopped</span> — The background database engine is currently inactive.
        </li>
        <li>
          <span className="inline-flex items-center rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-500">Running</span> — The database and dashboard are fully functional and ready.
        </li>
      </ul>

      <h3>Step 3: Click "Start DashDraft"</h3>
      <p>
        If the service status shows <span className="inline-flex items-center rounded bg-gray-500/10 px-2 py-0.5 text-xs font-semibold text-gray-400">Stopped</span>, simply click the blue <strong>Start DashDraft</strong> button. 
      </p>
      <p>
        Within seconds, the status badge will transition to a vibrant green <span className="inline-flex items-center rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-500">Running</span> indicator, signaling the engine is spin up.
      </p>

      <h3>Step 4: Launch the Web Dashboard</h3>
      <p>
        Once active, the GUI displays the local Dashboard URL (by default, <code>http://localhost:7700</code>).
      </p>
      <p>
        Click the primary <strong>Open Dashboard</strong> button to automatically open the interface in your default web browser, or copy the URL to paste it manually.
      </p>

      <div className="my-8 rounded-lg border border-border bg-card p-2 shadow-md">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 py-1">GUI Core Service Interface</p>
        <img
          src="/gui_core_service_card.png"
          alt="Starting service inside DashDraft GUI Control Center"
          className="rounded shadow-inner max-w-full"
        />
        <div className="mt-3 px-3 pb-2 text-xs text-muted-foreground leading-relaxed">
          <strong>🔍 GUI Visual Highlights:</strong>
          <ul className="list-disc pl-5 mt-1.5 space-y-1">
            <li><strong>Status indicator:</strong> Displays the green running badge indicating background database systems are operational.</li>
            <li><strong>Open Web Dashboard button:</strong> One-click browser access launcher.</li>
            <li><strong>Dashboard URL:</strong> Shows the active address <code>http://localhost:7700</code>.</li>
            <li><strong>Stop Service button:</strong> Instantly powers down database endpoints cleanly.</li>
          </ul>
        </div>
      </div>

      <h2 id="cli-start">Section 2: Using the CLI (Optional)</h2>
      <p>
        For advanced users who prefer working in terminal-based environments, you can start the service using the CLI:
      </p>
      <CodeBlock language="bash" code="dashdraft start" />
      <p className="mt-2 text-sm text-muted-foreground">
        This spins up the same local database system and hosts the dashboard on port <code>7700</code>.
      </p>
      
      <Callout variant="info" title="Interoperability">
        The GUI and CLI connect to the exact same backend service and database workspaces. You can run them at the same time; the GUI will automatically reflect the correct "Running" status if you started DashDraft via the terminal.
      </Callout>

      <h2 id="dashboard-verify">Navigating your dashboard</h2>
      <p>
        Once DashDraft is running and you have opened the browser dashboard:
      </p>
      <ol>
        <li>Create your first workspace folder.</li>
        <li>Drag and drop your CSV datasets to import them.</li>
        <li>Proceed to hook up an AI assistant to start asking questions!</li>
      </ol>

      <div className="mt-12 border-t border-border pt-6 flex justify-between items-center text-sm">
        <Link to="/docs/installation" className="text-muted-foreground hover:underline">
          &larr; Installation
        </Link>
        <Link to="/docs/claude-setup" className="text-primary font-medium hover:underline">
          Connecting Claude Desktop &rarr;
        </Link>
      </div>
    </DocsLayout>
  );
}
