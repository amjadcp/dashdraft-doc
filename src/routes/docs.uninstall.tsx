import { createFileRoute, Link } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Callout } from "@/components/site/Callout";
import { Trash2, AlertTriangle, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/docs/uninstall")({
  head: () => ({
    meta: [
      { title: "Manual Uninstall — DashDraft Docs" },
      { name: "description", content: "Completely remove DashDraft and all related configuration or workspaces from your system." },
    ]
  }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Manual Uninstall"
      description="Since DashDraft installs as a standalone, zero-dependency binary, you can completely remove it from your system at any time by manually deleting its folders."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Getting Started" }, { label: "Manual Uninstall" }]}
      toc={[
        { id: "step1-stop", label: "1. Stop Running Processes" },
        { id: "step2-binary", label: "2. Delete Installation Folders" },
        { id: "step3-data", label: "3. Optional: Delete User Workspaces" },
        { id: "step4-path", label: "4. Clean Up System PATH" },
      ]}
    >
      <Callout variant="warning">
        <div className="flex gap-2 items-center font-semibold text-red-600 dark:text-red-400 mb-1">
          <ShieldAlert className="h-5 w-5 shrink-0" />
          <span>Before You Uninstall</span>
        </div>
        Deleting your workspace directories is permanent and will remove all CSV databases, charts, and metric configurations you created in DashDraft. If you want to save your progress, back up your workspace folder before proceeding.
      </Callout>

      <p className="text-foreground/80">
        DashDraft values your privacy and simplicity. It does not install system services, hidden drivers, or background registry keys. Uninstallation is as clean and simple as deleting the folders described below.
      </p>

      {/* STEP 1 */}
      <h2 id="step1-stop" className="flex items-center gap-2">
        1. Stop Running Processes
      </h2>
      <p>
        Make sure DashDraft is not actively running in the background before trying to delete its files.
      </p>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground/90 uppercase tracking-wider mb-2">Windows</h3>
          <p className="mb-2">Run the following command in PowerShell, or end the process from the Windows Task Manager:</p>
          <CodeBlock language="powershell" code="Stop-Process -Name 'dashdraft' -Force -ErrorAction SilentlyContinue" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground/90 uppercase tracking-wider mb-2">macOS / Linux</h3>
          <p className="mb-2">Kill any active instances of the DashDraft binary using your terminal:</p>
          <CodeBlock language="bash" code="pkill -f 'dashdraft' || true" />
        </div>
      </div>

      {/* STEP 2 */}
      <h2 id="step2-binary" className="flex items-center gap-2">
        2. Delete Installation Folders
      </h2>
      <p>
        This deletes the main DashDraft executable, its configuration file (<code>config.json</code>), and its execution logs.
      </p>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground/90 uppercase tracking-wider mb-2">Windows</h3>
          <p className="mb-2">Delete the installation folder located at <code>%LOCALAPPDATA%\DashDraft</code>. In PowerShell:</p>
          <CodeBlock language="powershell" code="Remove-Item -Recurse -Force -Path &quot;$env:LOCALAPPDATA\DashDraft&quot; -ErrorAction SilentlyContinue" />
          <p className="text-xs text-muted-foreground mt-1">
            Standard path: <code>C:\Users\&lt;YourUsername&gt;\AppData\Local\DashDraft</code>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground/90 uppercase tracking-wider mb-2">macOS & Linux</h3>
          <p className="mb-2">Delete the hidden installation directory inside your user profile:</p>
          <CodeBlock language="bash" code="rm -rf ~/.DashDraft" />
          <p className="text-xs text-muted-foreground mt-1">
            Standard path: <code>/Users/&lt;username&gt;/.DashDraft</code> (macOS) or <code>/home/&lt;username&gt;/.DashDraft</code> (Linux)
          </p>
        </div>
      </div>

      {/* STEP 3 */}
      <h2 id="step3-data" className="flex items-center gap-2">
        3. Optional: Delete User Workspaces & CSV Data
      </h2>
      <p>
        If you want to keep your analytic workspaces, dashboards, and exported charts for a potential future install, <strong>leave this folder untouched</strong>. Otherwise, you can purge it to wipe all local data completely.
      </p>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground/90 uppercase tracking-wider mb-2">Windows</h3>
          <p className="mb-2">Delete the workspaces folder located in your User Profile directory:</p>
          <CodeBlock language="powershell" code="Remove-Item -Recurse -Force -Path &quot;$env:USERPROFILE\DashDraft-workspaces&quot; -ErrorAction SilentlyContinue" />
          <p className="text-xs text-muted-foreground mt-1">
            Standard path: <code>C:\Users\&lt;YourUsername&gt;\DashDraft-workspaces</code>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground/90 uppercase tracking-wider mb-2">macOS & Linux</h3>
          <p className="mb-2">Delete the workspaces directory inside your home directory:</p>
          <CodeBlock language="bash" code="rm -rf ~/DashDraft-workspaces" />
          <p className="text-xs text-muted-foreground mt-1">
            Standard path: <code>/Users/&lt;username&gt;/DashDraft-workspaces</code> or <code>/home/&lt;username&gt;/DashDraft-workspaces</code>
          </p>
        </div>
      </div>

      {/* STEP 4 */}
      <h2 id="step4-path" className="flex items-center gap-2">
        4. Clean Up System PATH (Environment Variables)
      </h2>
      <p>
        The installer adds DashDraft to your environment <code>PATH</code> so you can run the <code>dashdraft</code> command from anywhere. If desired, you can clean this up.
      </p>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground/90 uppercase tracking-wider mb-2">Windows</h3>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-foreground/85">
            <li>Press the <kbd className="px-1.5 py-0.5 rounded border bg-secondary text-xs font-mono">Win</kbd> key, type <strong>environment variables</strong>, and press Enter.</li>
            <li>Click on <strong>Environment Variables...</strong> at the bottom right.</li>
            <li>In the upper list (User variables), select the <strong>Path</strong> variable and click <strong>Edit...</strong>.</li>
            <li>Find the entry pointing to <code>...AppData\Local\DashDraft</code>, click <strong>Delete</strong>, then click <strong>OK</strong> to save.</li>
          </ol>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground/90 uppercase tracking-wider mb-2">macOS & Linux</h3>
          <p className="mb-2">
            Open your shell profile (e.g., <code>~/.zshrc</code>, <code>~/.bash_profile</code>, or <code>~/.bashrc</code>) and delete the following lines:
          </p>
          <CodeBlock language="bash" code={`# DashDraft PATH\nexport PATH="${"~"}/.DashDraft:$PATH"`} />
          <p className="mt-2 text-sm text-foreground/85">
            After removing the lines, reload your shell configuration (e.g., run <code>source ~/.zshrc</code>).
          </p>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-border/60 text-center">
        <p className="text-sm text-muted-foreground">
          Need help or want to reinstall in the future? Head back to the <Link to="/docs/installation" className="text-primary hover:underline">Installation Guide</Link>.
        </p>
      </div>
    </DocsLayout>
  );
}
