import { createFileRoute, Link } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Callout } from "@/components/site/Callout";

export const Route = createFileRoute("/docs/installation")({
  head: () => ({ meta: [
    { title: "Installation — DashDraft Docs" },
    { name: "description", content: "Install DashDraft on macOS, Windows, or Linux. One command, no dependencies." },
  ]}),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Installation"
      description="DashDraft installs as a standalone binary. No Node.js, Python, or dependencies required."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Getting Started" }, { label: "Installation" }]}
      toc={[
        { id: "requirements", label: "System requirements" },
        { id: "install", label: "Install" },
        { id: "verify", label: "Verify the installation" },
        { id: "next", label: "Next steps" },
      ]}
    >
      <Callout variant="info">
        DashDraft runs entirely on your computer. After installation, you can use it offline.
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
      <CodeBlock language="bash" code="curl -fsSL https://get.dashdraft.app/mac | bash" />
      <h3>Windows (PowerShell)</h3>
      <CodeBlock language="powershell" code="irm https://get.dashdraft.app/win | iex" />

      <p>
        The installer downloads the latest binary, places it on your <code>PATH</code>,
        and creates a workspace folder at <code>~/.dashdraft</code>.
      </p>

      <h2 id="verify">Verify the installation</h2>
      <p>Open a new terminal and run:</p>
      <CodeBlock language="bash" code={"dashdraft --version\n# DashDraft 1.0.0"} />

      <h2 id="next">Next steps</h2>
      <p>
        You're ready to go. Head to <Link to="/docs/first-workspace">Creating your first workspace</Link>{" "}
        or jump straight to <Link to="/docs/claude-setup">connecting Claude Desktop</Link>.
      </p>
    </DocsLayout>
  );
}
