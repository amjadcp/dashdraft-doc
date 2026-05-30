import { createFileRoute, Link } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { trackGithubOpened } from "../lib/analytics";

export const Route = createFileRoute("/docs/help")({
  head: () => ({ meta: [{ title: "Getting Help — DashDraft Docs" }] }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Getting Help"
      description="Channels for support, bug reports, and feature requests."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "FAQ & Support" }, { label: "Help" }]}
    >
      <ul>
        <li><strong>Diagnostics:</strong> Run <code>dashdraft doctor</code> and paste the output inside our <Link to="/docs/report-bug" className="text-primary hover:underline">Bug Report Form</Link>.</li>
        <li><strong>Issues:</strong> Open a ticket at <a href="https://github.com" onClick={trackGithubOpened}>github.com/dashdraft/dashdraft</a>.</li>
        <li><strong>Email:</strong> <a href="mailto:support@dashdraft.app">support@dashdraft.app</a> — we usually reply within a day.</li>
        <li><strong>Community:</strong> The DashDraft Discord is linked from the GitHub readme.</li>
      </ul>
    </DocsLayout>
  );
}
