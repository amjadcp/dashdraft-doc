import { Link } from "@tanstack/react-router";
import { Database } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container-wide grid gap-8 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-semibold">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
              <Database className="h-3.5 w-3.5" />
            </span>
            DashDraft
          </div>
          <p className="text-sm text-muted-foreground">
            Local CSV analytics for the AI era.
          </p>
        </div>
        <FooterCol title="Product" links={[
          { label: "Installation", to: "/docs/installation" },
          { label: "Quick Start", to: "/docs/quick-start" },
          { label: "FAQ", to: "/docs/faq" },
        ]} />
        <FooterCol title="Connect AI" links={[
          { label: "Claude Desktop", to: "/docs/claude-setup" },
          { label: "ChatGPT", to: "/docs/chatgpt-setup" },
          // { label: "Troubleshooting", to: "/docs/troubleshooting" },
        ]} />
        <FooterCol title="Privacy" links={[
          { label: "How it works", to: "/docs/privacy" },
          // { label: "SQL History", to: "/docs/sql-history" },
          // { label: "Sharing with team", to: "/docs/sharing" },
        ]} />
      </div>
      <div className="border-t border-border">
        <div className="container-wide flex h-14 items-center justify-between text-xs text-muted-foreground">
          <span>© 2026 DashDraft. Your data stays yours.</span>
          <span className="font-mono">v1.0</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold">{title}</h4>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
