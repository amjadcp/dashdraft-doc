import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";

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
        <li><strong>Diagnostics:</strong> run <code>dashdraft doctor</code> and paste the output in any bug report.</li>
        <li><strong>Issues:</strong> open a ticket at <a href="https://github.com">github.com/dashdraft/dashdraft</a>.</li>
        <li><strong>Email:</strong> <a href="mailto:support@dashdraft.app">support@dashdraft.app</a> — we usually reply within a day.</li>
        <li><strong>Community:</strong> the DashDraft Discord is linked from the GitHub readme.</li>
      </ul>
    </DocsLayout>
  );
}
