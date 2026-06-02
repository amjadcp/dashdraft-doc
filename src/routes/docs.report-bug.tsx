import { createFileRoute, Link } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShieldAlert } from "lucide-react";
import { useState, useEffect } from "react";
import { trackGithubOpened } from "../lib/analytics";

export const Route = createFileRoute("/docs/report-bug")({
  head: () => ({
    meta: [
      { title: "Report a Bug — DashDraft Docs" },
      { name: "description", content: "Submit a bug report to help improve DashDraft. Embeds the official issue tracking Google Form." },
    ]
  }),
  component: Page,
});

function Page() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Set timeout as a safety fallback to ensure loading screen goes away
  useEffect(() => {
    const timer = setTimeout(() => {
      setIframeLoaded(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DocsLayout
      title="Report a Bug"
      description="Encountered an issue? Submit a bug report below to let us know. We read every submission and resolve bugs quickly."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "FAQ & Support" }, { label: "Report a Bug" }]}
      toc={[
        { id: "form", label: "Submit Bug Report" },
        { id: "alternative", label: "Other ways to get help" },
      ]}
    >

      {/* Step 1: The Form */}
      <h2 id="form" className="flex items-center gap-2 mt-8">
        Submit Bug Report
      </h2>
      <p>
        Fill out the form below. If you have the diagnostics output from the step above, please paste it in the designated section.
      </p>

      {/* Open Form Button */}
      <div className="my-6 flex flex-wrap gap-4 items-center justify-between p-4 rounded-xl border border-border bg-card shadow-sm">
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">Submit Bug Report</p>
          <p className="text-xs text-muted-foreground">You can open the form directly in a new tab if it's easier to fill out.</p>
        </div>
        <Button asChild size="sm" className="gap-1.5 shadow-sm">
          <a href="https://forms.gle/FLUgSpqn2pLEE2TQ9" target="_blank" rel="noreferrer" className="!text-white !no-underline">
            Open Form in New Tab <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </div>

      {/* TODO: Other Help Channels */}
      {/* <h2 id="alternative" className="mt-12">
        Other support channels
      </h2>
      <p>
        If you'd rather not use the form, you can also reach us through other support channels. Check out our {" "}
        <Link to="/docs/help" className="text-primary hover:underline font-medium">Getting Help</Link> guide or:
      </p>
      <ul>
        <li>
          <strong>GitHub Issues:</strong> Create an issue on our official <a href="https://github.com" target="_blank" rel="noreferrer" className="text-primary hover:underline" onClick={trackGithubOpened}>GitHub repository</a>.
        </li>
        <li>
          <strong>Direct Email:</strong> Drop us a line at <a href="mailto:support@dashdraft.app" className="text-primary hover:underline">support@dashdraft.app</a>.
        </li>
      </ul> */}
    </DocsLayout>
  );
}
