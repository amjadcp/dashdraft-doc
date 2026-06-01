import { createFileRoute, Link } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Callout } from "@/components/site/Callout";

export const Route = createFileRoute("/docs/chatgpt-setup")({
  head: () => ({ meta: [{ title: "Connecting to ChatGPT — DashDraft Docs" }] }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Connecting to ChatGPT"
      description="ChatGPT runs in the cloud and requires a secure HTTPS tunnel to connect with your local DashDraft service. The GUI app automates this using ngrok."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Connecting AI Tools" }, { label: "ChatGPT" }]}
      toc={[
        { id: "overview", label: "Section 1: Overview" },
        { id: "prereqs", label: "Section 2: Prerequisites" },
        { id: "ngrok-setup", label: "Section 3: Setting Up ngrok Token via GUI" },
        { id: "tunnel-start", label: "Section 4: Starting the Tunnel via GUI" },
        { id: "chatgpt-connect", label: "Section 5: Connecting ChatGPT to the Tunnel" },
        { id: "tunnel-manage", label: "Section 6: Managing Your Tunnel" },
        { id: "troubleshoot", label: "Section 7: Troubleshooting" },
      ]}
    >
      <h2 id="overview">Section 1: Overview</h2>
      <p>
        Since ChatGPT resides in the cloud, it cannot directly reach the <code>localhost</code> services running on your local machine.
      </p>
      <p>
        To bridge this gap safely, DashDraft creates a secure, encrypted HTTPS tunnel to your computer using <strong>ngrok</strong>. The DashDraft GUI App manages this tunnel lifecycle entirely—including token storage, custom domain parameters, and startup/shutdown operations—in a single click.
      </p>

      <h2 id="prereqs">Section 2: Prerequisites</h2>
      <ul>
        <li>
          <strong>DashDraft GUI App:</strong> Installed and currently showing a green <span className="inline-flex items-center rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-500">Running</span> status badge.
        </li>
        <li>
          <strong>ngrok Account:</strong> A free account registered at <a href="https://ngrok.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">ngrok.com</a>.
        </li>
        <li>
          <strong>ChatGPT Account:</strong> A standard free or premium account on ChatGPT.
        </li>
      </ul>

      <h2 id="ngrok-setup">Section 3: Setting Up ngrok Token via GUI</h2>
      
      <h3>Step 1: Retrieve Your ngrok Authtoken</h3>
      <ol>
        <li>Sign in to your <a href="https://dashboard.ngrok.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">ngrok Dashboard</a>.</li>
        <li>Navigate to the <strong>Your Authtoken</strong> section in the left sidebar navigation menu.</li>
        <li>
          Copy your full personal authentication token. (It will resemble a long key like: <code>2abc123_your_token_here_abc123...</code>).
        </li>
      </ol>
      <Callout variant="warning" title="Keep it Secure">
        Do not share this authtoken with anyone. It acts as a password to access your local machine's ports securely.
      </Callout>

      <h3>Step 2: Save the Authtoken in the GUI</h3>
      <ol>
        <li>Open your DashDraft GUI App and scroll down to the <strong>ChatGPT Cloud Tunnel</strong> card.</li>
        <li>Paste your copied token into the <strong>NGROK AUTH TOKEN</strong> input field.</li>
        <li>Click the blue <strong>Save</strong> button adjacent to the input field.</li>
      </ol>
      <p className="text-sm text-muted-foreground">
        <em>Note: Your token is stored entirely locally on your hard drive and is never shared with or sent to DashDraft's servers.</em>
      </p>

      <h3>Step 3: (Optional) Configure a Static Domain</h3>
      <p>
        By default, ngrok issues a random public URL every time the tunnel is restarted. To prevent having to update ChatGPT every time you reboot your computer, you can configure a free static domain:
      </p>
      <ol>
        <li>Go back to your ngrok Dashboard and click on <strong>Cloud Edge &rarr; Domains</strong> in the sidebar.</li>
        <li>Click <strong>Create Domain</strong> to claim a free static subdomain (e.g. <code>subtle-primary-camel.ngrok-free.app</code>).</li>
        <li>Copy that domain name string.</li>
        <li>Return to the DashDraft GUI App and paste it into the <strong>STATIC DOMAIN (OPTIONAL)</strong> input field.</li>
        <li>Click <strong>Save</strong>.</li>
      </ol>
      <p className="text-sm text-muted-foreground">
        <em>With a static domain saved, your tunnel address will remain stable indefinitely!</em>
      </p>

      <h2 id="tunnel-start">Section 4: Starting the Tunnel via GUI</h2>
      
      <h3>Step 1: Start the Tunnel</h3>
      <p>
        Inside the <strong>ChatGPT Cloud Tunnel</strong> section of the GUI, click the blue <strong>Start Tunnel</strong> button.
      </p>
      <p>
        Wait 5–10 seconds for ngrok to initialize the tunnel. Once established, the status badge will change to a green <strong>Tunnel Active</strong> indicator.
      </p>

      <h3>Step 2: Copy the Public HTTPS URL</h3>
      <p>
        The GUI will display your active public endpoint. Click the blue <strong>Copy</strong> icon button next to the URL to copy it.
      </p>
      <ul>
        <li>Random URL looks like: <code>https://abc-123-def.ngrok-free.app/mcp</code></li>
        <li>Static URL looks like: <code>https://subtle-primary-camel.ngrok-free.app/mcp</code></li>
      </ul>

      <div className="my-8 rounded-lg border border-border bg-card p-2 shadow-md">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 py-1">GUI ChatGPT Tunnel Interface</p>
        <img
          src="/gui_chatgpt_tunnel_card.png"
          alt="Starting ngrok tunnel in DashDraft GUI Control Center"
          className="rounded shadow-inner max-w-full"
        />
        <div className="mt-3 px-3 pb-2 text-xs text-muted-foreground leading-relaxed">
          <strong>🔍 Tunnel Visual Highlights:</strong>
          <ul className="list-disc pl-5 mt-1.5 space-y-1">
            <li><strong>NGROK AUTH TOKEN:</strong> Clean masked password storage showing token is saved locally.</li>
            <li><strong>STATIC DOMAIN:</strong> Inputted domain keeping endpoints stable.</li>
            <li><strong>Tunnel status indicator:</strong> Displays active green status signaling cloud communication is active.</li>
            <li><strong>Copy URL button:</strong> Instantly copy the endpoint with one click.</li>
          </ul>
        </div>
      </div>

      <Callout variant="warning" title="Keep the App Open">
        Keep the DashDraft GUI App open and active while you work in ChatGPT. If you close the app or click "Stop Tunnel", the background tunnel shuts down and ChatGPT will lose connection immediately.
      </Callout>

      <h2 id="chatgpt-connect">Section 5: Connecting ChatGPT to the Tunnel</h2>

      <h3>Step 1: Enable Developer Mode in ChatGPT</h3>
      <ol>
        <li>Open ChatGPT in your web browser.</li>
        <li>Click your <strong>Profile Picture</strong> in the bottom-left corner and go to <strong>Settings</strong>.</li>
        <li>Select <strong>Apps</strong> in the menu.</li>
        <li>Scroll down to the <strong>Advanced Settings</strong> category.</li>
        <li>Toggle the <strong>Developer Mode</strong> switch to <span className="text-emerald-500 font-semibold">ON</span>.</li>
      </ol>

      <h3>Step 2: Create your local custom MCP App</h3>
      <ol>
        <li>While still in the <strong>Settings &rarr; Apps</strong> menu of ChatGPT, click <strong>+ New Custom App</strong>.</li>
        <li>Fill out the registration details:
          <ul>
            <li><strong>Name:</strong> <code>DashDraft</code></li>
            <li><strong>MCP Server URL:</strong> Paste the copied HTTPS tunnel URL (e.g. <code>https://subtle-primary-camel.ngrok-free.app/mcp</code>)</li>
          </ul>
        </li>
        <li>Click <strong>Save</strong> or <strong>Create</strong>.</li>
      </ol>

      <h3>Step 3: Test the ChatGPT integration</h3>
      <p>
        Open a new chat tab and type a workspace diagnostic query:
      </p>
      <blockquote className="border-l-4 border-primary/40 bg-secondary/30 p-3 italic my-3 text-foreground/80 rounded">
        "What tables are in my active workspace?"
      </blockquote>
      <p>
        ChatGPT will recognize the DashDraft MCP server schema, query your local database through the secure ngrok tunnel, and list your tables directly inside your browser chat!
      </p>

      <h2 id="tunnel-manage">Section 6: Managing Your Tunnel</h2>
      <ul>
        <li>
          <strong>Changing your Token:</strong> Click the <strong>Clear</strong> button next to the authtoken input, paste a new key, and click <strong>Save</strong>.
        </li>
        <li>
          <strong>Changing your Domain:</strong> Click <strong>Clear</strong>, paste your new domain string, click <strong>Save</strong>, and restart the tunnel by clicking <strong>Stop Tunnel</strong> followed by <strong>Start Tunnel</strong>.
        </li>
        <li>
          <strong>Reviewing Tunnel Logs:</strong> Scroll to the bottom of the GUI app and expand the <strong>Advanced Console</strong> section to view real-time ngrok connections and data flow logs.
        </li>
      </ul>

      <h2 id="troubleshoot">Section 7: Troubleshooting</h2>
      <ul>
        <li>
          <strong>"Tunnel Disabled" status:</strong> Verify that your Core Service status at the top of the GUI displays a green <span className="inline-flex items-center rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-500">Running</span> status badge, and double-check that you clicked <strong>Save</strong> on your token.
        </li>
        <li>
          <strong>"Connection Refused" in ChatGPT:</strong> Make sure the GUI app remains open, that the "Tunnel Active" badge is displayed, and that the URL entered in ChatGPT matches the active HTTPS URL in the GUI exactly.
        </li>
        <li>
          <strong>"Invalid Token" error:</strong> Re-copy your authtoken string from the ngrok panel, ensuring no leading or trailing spaces are copied, paste into the GUI input, and click save.
        </li>
        <li>
          <strong>"Static Domain not working":</strong> Ensure your static domain is created and listed as active inside your ngrok dashboard. Note that free ngrok domains might require active renewal.
        </li>
        <li>
          <strong>Manual command fallback:</strong> For scripting or manual CLI setups, check out the <Link to="/docs/advanced-cli" className="text-primary hover:underline font-medium">Advanced: Using the CLI</Link> page.
        </li>
      </ul>

      <div className="mt-12 border-t border-border pt-6 flex justify-between items-center text-sm">
        <Link to="/docs/claude-setup" className="text-muted-foreground hover:underline">
          &larr; Connecting Claude Desktop
        </Link>
        <Link to="/docs/privacy" className="text-primary font-medium hover:underline">
          How Privacy Works &rarr;
        </Link>
      </div>
    </DocsLayout>
  );
}
