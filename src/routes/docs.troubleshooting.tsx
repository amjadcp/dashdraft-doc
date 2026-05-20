import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";

export const Route = createFileRoute("/docs/troubleshooting")({
  head: () => ({ meta: [{ title: "Troubleshooting Connections — DashDraft Docs" }] }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Troubleshooting Connections"
      description="Fix the most common issues connecting Claude or ChatGPT to DashDraft."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Connecting AI Tools" }, { label: "Troubleshooting" }]}
      toc={[
        { id: "doctor", label: "Run the doctor" },
        { id: "common", label: "Common issues" },
      ]}
    >
      <h2 id="doctor">Run the doctor</h2>
      <p>Get a full diagnostic report:</p>
      <CodeBlock language="bash" code="dashdraft doctor" />

      <h2 id="common">Common issues</h2>
      <ul>
        <li><strong>"command not found"</strong> — Open a new terminal so the updated PATH is loaded.</li>
        <li><strong>Port 7700 in use</strong> — Run <code>dashdraft start --port 7800</code>.</li>
        <li><strong>Claude shows no tools</strong> — Fully quit Claude (Cmd/Ctrl+Q) and reopen.</li>
        <li><strong>ngrok rate-limited</strong> — Free tier is fine for personal use; upgrade for shared teams.</li>
      </ul>
    </DocsLayout>
  );
}
