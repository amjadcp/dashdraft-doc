import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";

export const Route = createFileRoute("/docs/collaborate")({
  head: () => ({ meta: [{ title: "Collaborating on Metrics — DashDraft Docs" }] }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Collaborating on Metrics"
      description="Patterns for moving from a DashDraft POC to a production dashboard."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Sharing with Your Team" }, { label: "Collaborating" }]}
      toc={[{ id: "define", label: "Define" }, { id: "validate", label: "Validate" }, { id: "ship", label: "Ship" }]}
    >
      <h2 id="define">Define</h2>
      <p>Use DashDraft to prototype the metric. Iterate with the AI until the numbers match expectations.</p>
      <h2 id="validate">Validate</h2>
      <p>Share the session with stakeholders. The chat export shows assumptions and the exact SQL.</p>
      <h2 id="ship">Ship</h2>
      <p>Hand off the final SQL to your data team to port into dbt, Looker, Metabase, or your tool of choice.</p>
    </DocsLayout>
  );
}
