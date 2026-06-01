import { createFileRoute, Link } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Callout } from "@/components/site/Callout";

export const Route = createFileRoute("/docs/advanced-cli")({
  head: () => ({ meta: [{ title: "Advanced: Using the CLI — DashDraft Docs" }] }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Advanced: Using the CLI"
      description="Learn about the command-line utility for running DashDraft in developer sandboxes, scripting startups, or hosting headless servers."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Advanced" }, { label: "CLI Reference" }]}
      toc={[
        { id: "why-cli", label: "When to use the CLI" },
        { id: "reference", label: "CLI commands reference" },
        { id: "stdio", label: "Stdio routing mode" },
        { id: "ngrok-cli", label: "ngrok tunnel configuration" },
        { id: "compatibility", label: "GUI and CLI compatibility" },
      ]}
    >
      <Callout variant="info">
        The command-line interface (CLI) is automatically installed alongside the GUI app. It is available globally on your terminal <code>PATH</code> under the command <code>dashdraft</code>.
      </Callout>

      <h2 id="why-cli">When to use the CLI</h2>
      <p>
        While the GUI Control Center is highly recommended for everyday business workflows, the CLI is ideal for:
      </p>
      <ul>
        <li>Developers who prefer shell-based environments or code editors.</li>
        <li>Automating the startup of local DashDraft instances using scripts (e.g. systemd services or LaunchDaemons).</li>
        <li>Running DashDraft in "headless" environments where graphical displays are unavailable.</li>
        <li>Reviewing live debug output, raw logs, or execution diagnostics.</li>
      </ul>

      <h2 id="reference">CLI commands reference</h2>
      <p>
        The global <code>dashdraft</code> utility supports a simple list of commands:
      </p>

      <h3>Start the Core Server</h3>
      <p>
        Spins up the database server and hosts the local web dashboard (defaults to <code>http://localhost:7700</code>):
      </p>
      <CodeBlock language="bash" code="dashdraft start" />

      <h3>Check Version</h3>
      <p>
        Displays the current version of the CLI utility and underlying engine:
      </p>
      <CodeBlock language="bash" code="dashdraft --version" />

      <h3>Print Help Manual</h3>
      <p>
        Lists all available commands, options, and parameters:
      </p>
      <CodeBlock language="bash" code="dashdraft --help" />

      <h2 id="stdio">Stdio routing mode</h2>
      <p>
        When connecting to <strong>Claude Desktop</strong>, the application runs using Standard Input/Output (stdio) routing rather than standard HTTP. 
      </p>
      <p>
        To run or debug this process manually inside a terminal shell, use the <code>--mcp-stdio</code> flag:
      </p>
      <CodeBlock language="bash" code="dashdraft start --mcp-stdio" />
      <p className="mt-2 text-sm text-muted-foreground">
        <em>Note: This starts the service in stdio piping mode. Do not close this terminal process, otherwise Claude Desktop's tools will immediately disconnect.</em>
      </p>

      <h2 id="ngrok-cli">ngrok tunnel configuration</h2>
      <p>
        For integrating with cloud tools like ChatGPT, the CLI supports automating ngrok tunnel configurations:
      </p>

      <h3>1. Register Your ngrok Token</h3>
      <p>
        Saves your private ngrok authtoken to your local DashDraft configuration file:
      </p>
      <CodeBlock language="bash" code="dashdraft tunnel --set-token YOUR_NGROK_AUTH_TOKEN" />

      <h3>2. (Optional) Register a Static Domain</h3>
      <p>
        Binds your tunnel to a specific reserved ngrok domain:
      </p>
      <CodeBlock language="bash" code="dashdraft tunnel --set-domain subtle-primary-camel.ngrok-free.app" />

      <h3>3. Start the Tunnel Daemon</h3>
      <p>
        Launches the background ngrok daemon, outputting a secure public HTTPS endpoint for ChatGPT:
      </p>
      <CodeBlock language="bash" code="dashdraft tunnel" />

      <h2 id="compatibility">GUI and CLI compatibility</h2>
      <p>
        The GUI App and CLI tool are completely interoperable. They connect to the exact same background configurations and databases:
      </p>
      <ul>
        <li>
          If you run <code>dashdraft start</code> in a terminal, the GUI app will detect the active system process and instantly display a green <span className="inline-flex items-center rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-500">Running</span> indicator.
        </li>
        <li>
          Closing the terminal window or killing the CLI process will transition the GUI Control Center status back to a gray <span className="inline-flex items-center rounded bg-gray-500/10 px-2 py-0.5 text-xs font-semibold text-gray-400">Stopped</span> state.
        </li>
      </ul>

      <div className="my-8 rounded-lg border border-border bg-card p-2 shadow-md">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 py-1">Advanced Console Logs Preview</p>
        <img
          src="/gui_advanced_console_card.png"
          alt="DashDraft Advanced Console showing startup logs"
          className="rounded shadow-inner max-w-full"
        />
      </div>

      <div className="mt-12 border-t border-border pt-6 flex justify-between items-center text-sm">
        <Link to="/docs/installation" className="text-muted-foreground hover:underline">
          &larr; Back to Installation
        </Link>
        <Link to="/docs/quick-start" className="text-primary font-medium hover:underline">
          Starting DashDraft &rarr;
        </Link>
      </div>
    </DocsLayout>
  );
}
