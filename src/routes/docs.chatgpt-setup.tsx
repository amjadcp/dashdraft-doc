import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Callout } from "@/components/site/Callout";

export const Route = createFileRoute("/docs/chatgpt-setup")({
  head: () => ({ meta: [{ title: "ChatGPT Setup — DashDraft Docs" }] }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="ChatGPT Setup"
      description="ChatGPT requires an HTTPS tunnel to reach your local DashDraft server. We use ngrok."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Connecting AI Tools" }, { label: "ChatGPT" }]}
      toc={[
        { id: "prereqs", label: "Prerequisites" },
        { id: "token", label: "Get your ngrok token" },
        { id: "save", label: "Save the token" },
        { id: "start", label: "Start the tunnel" },
        { id: "configure", label: "Configure ChatGPT" },
        { id: "static", label: "Optional: static domain" },
        { id: "troubleshoot", label: "Troubleshooting" },
      ]}
    >
      <h2 id="prereqs">Prerequisites</h2>
      <ul>
        <li>DashDraft installed</li>
        <li>Free ngrok account (ngrok.com)</li>
        <li>ChatGPT account (Free or Plus)</li>
      </ul>

      <h2 id="token">Get your ngrok token</h2>
      <ol>
        <li>Sign in at <a href="https://dashboard.ngrok.com" target="_blank" rel="noreferrer">dashboard.ngrok.com</a>.</li>
        <li>Open <strong>Your Authtoken</strong> in the sidebar.</li>
        <li>Copy the token.</li>
      </ol>

      <h2 id="save">Save the token to DashDraft</h2>
      <CodeBlock language="bash" code="dashdraft tunnel --set-token <YOUR_TOKEN>" />

      <h2 id="start">Start the tunnel</h2>
      <CodeBlock language="bash" code="dashdraft tunnel" />
      <p>You'll get a public HTTPS URL like <code>https://abcd-1234.ngrok-free.app</code>.</p>

      <Callout variant="warning">
        Keep the terminal running <code>dashdraft tunnel</code> open while using ChatGPT.
        If you close it, the connection will stop.
      </Callout>

      <h2 id="configure">Configure ChatGPT</h2>
      <h3>Option A — ChatGPT Apps</h3>
      <p>Open <strong>Settings → Apps</strong>, paste the DashDraft tunnel URL, save.</p>
      <h3>Option B — Custom GPT</h3>
      <p>Create a new GPT, add the tunnel URL under <strong>Actions</strong>, import the OpenAPI schema from <code>{`https://<your-tunnel>/openapi.json`}</code>.</p>

      <h2 id="static">Optional: static ngrok domain</h2>
      <p>If you have a reserved domain in ngrok, pass it to keep the URL stable:</p>
      <CodeBlock language="bash" code="dashdraft tunnel --domain my-analytics.ngrok.app" />

      <h2 id="troubleshoot">Troubleshooting</h2>
      <ul>
        <li><strong>Tunnel won't start?</strong> Double-check the token with <code>dashdraft tunnel --show-token</code>.</li>
        <li><strong>ChatGPT can't connect?</strong> Make sure the tunnel terminal is still open.</li>
      </ul>
    </DocsLayout>
  );
}
