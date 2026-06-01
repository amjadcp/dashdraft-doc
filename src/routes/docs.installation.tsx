import { createFileRoute, Link } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Callout } from "@/components/site/Callout";

export const Route = createFileRoute("/docs/installation")({
  head: () => ({
    meta: [
      { title: "Installation — DashDraft Docs" },
      { name: "description", content: "Install DashDraft on macOS, Windows, or Linux. Single point-and-click GUI and command-line interfaces." },
    ]
  }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Installation"
      description="DashDraft installs as a standalone binary bundle containing both an intuitive GUI App and a powerful CLI Tool."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Getting Started" }, { label: "Installation" }]}
      toc={[
        { id: "requirements", label: "System requirements" },
        { id: "install", label: "Install" },
        { id: "package-contents", label: "What you get after installation" },
        { id: "launch-gui", label: "Launching the GUI App" },
        { id: "verify", label: "Verify the installation" },
        { id: "advanced-cli-link", label: "Using the CLI (Optional)" },
      ]}
    >
      <Callout variant="info">
        DashDraft runs entirely local on your computer. After installation, you can use it completely offline with 100% data privacy.
      </Callout>

      <h2 id="requirements">System requirements</h2>
      <ul>
        <li>macOS 10.15 (Catalina) or later — Intel or Apple Silicon</li>
        <li>Windows 10 or later — 64-bit</li>
        <li>Linux — x64 or ARM64, glibc 2.28+</li>
        <li>~120&nbsp;MB free disk space</li>
      </ul>

      <h2 id="install">Install</h2>
      <h3>macOS / Linux</h3>
      <CodeBlock language="bash" code="curl -fsSL https://dashdraft.app/get/install.sh | bash" />
      
      <h3>Windows (PowerShell)</h3>
      <CodeBlock language="powershell" code="irm https://dashdraft.app/get/install.ps1 | iex" />

      <p className="mt-4">
        The installer downloads the latest binary bundle, places the CLI command on your <code>PATH</code>,
        and registers the GUI App in your applications directory.
      </p>

      <h2 id="package-contents">What you get after installation</h2>
      <p>
        The installer sets up two distinct ways to manage your local DashDraft services, depending on your preferred workflow:
      </p>
      <div className="my-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5">
          <h4 className="text-base font-semibold text-foreground">✨ GUI Control Center</h4>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            An intuitive, point-and-click interface designed for business owners. Start services, view URLs, configure Claude Desktop, and manage ChatGPT cloud tunnels without using a terminal.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <h4 className="text-base font-semibold text-foreground">💻 Advanced CLI Tool</h4>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            A developer-focused command-line tool. Seamlessly integrate DashDraft into system startup scripts, view raw server stdout, or run background daemons with simple shell commands.
          </p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        <em>Note: Both components connect to the exact same background service. You can use either, or both interchangeably!</em>
      </p>

      <h2 id="launch-gui">Launching the GUI App</h2>
      <p>
        Once the install script finishes running, you can launch the DashDraft GUI Control Center immediately:
      </p>
      <ul>
        <li>
          <strong>macOS:</strong> Open your <strong>Applications</strong> folder or use <strong>Spotlight (Cmd + Space)</strong>, and launch <strong>DashDraft</strong>.
        </li>
        <li>
          <strong>Windows:</strong> Press the <strong>Start Key</strong>, search for <strong>DashDraft</strong>, or double-click the <strong>DashDraft shortcut</strong> created on your Desktop.
        </li>
        <li>
          <strong>Linux:</strong> Launch DashDraft from your desktop applications menu, or open a terminal and run <code>dashdraft-gui</code>.
        </li>
      </ul>

      <div className="my-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">GUI Control Center Preview</p>
        <img
          src="/gui_core_service_card.png"
          alt="DashDraft GUI App Control Center"
          className="rounded-lg border border-border/80 shadow-lg max-w-full"
        />
      </div>

      <h2 id="verify">Verify the installation</h2>
      <p>
        To ensure everything is working correctly, simply launch the <strong>DashDraft GUI App</strong>.
      </p>
      <ol>
        <li>Open the GUI App on your operating system.</li>
        <li>Find the <strong>Core Service</strong> card at the top.</li>
        <li>
          Verify that the service is active. You should see a green <span className="inline-flex items-center rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-500">Running</span> status indicator.
        </li>
      </ol>

      <Callout variant="tip" title="CLI Verification Option">
        If you prefer using the terminal, you can also verify the installation by opening a new window and typing:
        <CodeBlock language="bash" code="dashdraft --version" />
      </Callout>

      <h2 id="advanced-cli-link">Using the CLI (Optional, for Advanced Users)</h2>
      <p>
        If you're a developer or advanced user who prefers shell-based commands over point-and-click GUIs, all core tasks can still be managed in the terminal. 
      </p>
      <p>
        Check out our <Link to="/docs/advanced-cli" className="text-primary hover:underline font-medium">Advanced: Using the CLI</Link> guide to learn about standard syntax, parameters, stdio routing, and ngrok automation.
      </p>

      <div className="mt-12 border-t border-border pt-6">
        <Link to="/docs/quick-start" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
          Continue to Starting DashDraft &rarr;
        </Link>
      </div>
    </DocsLayout>
  );
}
