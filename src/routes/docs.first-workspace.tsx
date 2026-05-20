import { createFileRoute, Link } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";

export const Route = createFileRoute("/docs/first-workspace")({
  head: () => ({ meta: [{ title: "Your First Workspace — DashDraft Docs" }] }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Creating your first workspace"
      description="Workspaces group related CSV files so you can switch between projects instantly."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Getting Started" }, { label: "First Workspace" }]}
      toc={[
        { id: "create", label: "Create a workspace" },
        { id: "add", label: "Add files" },
        { id: "switch", label: "Switch workspaces" },
      ]}
    >
      <h2 id="create">Create a workspace</h2>
      <p>From the UI, click <strong>New workspace</strong> and give it a name (e.g. "Q1 Revenue Review"). Or use the CLI:</p>
      <CodeBlock language="bash" code='dashdraft workspace create "Q1 Revenue Review"' />

      <h2 id="add">Add files</h2>
      <p>Drop one or more CSV files into the workspace. DashDraft loads them into DuckDB as tables named after the file.</p>

      <h2 id="switch">Switch workspaces</h2>
      <p>Use the workspace picker in the top bar, or:</p>
      <CodeBlock language="bash" code="dashdraft workspace use q1-revenue-review" />

      <p>Next: <Link to="/docs/claude-setup">connect Claude Desktop</Link>.</p>
    </DocsLayout>
  );
}
