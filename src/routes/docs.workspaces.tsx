import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";

export const Route = createFileRoute("/docs/workspaces")({
  head: () => ({ meta: [{ title: "Managing Workspaces — DashDraft Docs" }] }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Managing Workspaces"
      description="Group related CSVs into workspaces and switch instantly."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Using DashDraft" }, { label: "Workspaces" }]}
      toc={[{ id: "create", label: "Create" }, { id: "list", label: "List & switch" }, { id: "delete", label: "Delete" }]}
    >
      <h2 id="create">Create</h2>
      <CodeBlock language="bash" code={`dashdraft workspace create "Marketing Analytics"`} />
      <h2 id="list">List & switch</h2>
      <CodeBlock language="bash" code={`dashdraft workspace list\ndashdraft workspace use marketing-analytics`} />
      <h2 id="delete">Delete</h2>
      <CodeBlock language="bash" code={`dashdraft workspace delete marketing-analytics`} />
    </DocsLayout>
  );
}
