import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const sections = [
  {
    title: "Getting Started",
    items: [
      { label: "Installation", to: "/docs/installation" },
      { label: "Quick Start", to: "/docs/quick-start" },
      { label: "First Workspace", to: "/docs/first-workspace" },
    ],
  },
  {
    title: "Connecting AI Tools",
    items: [
      { label: "Claude Desktop Setup", to: "/docs/claude-setup" },
      { label: "ChatGPT Setup", to: "/docs/chatgpt-setup" },
      // { label: "Troubleshooting", to: "/docs/troubleshooting" },
    ],
  },
  // {
  //   title: "Using DashDraft",
  //   items: [
  //     { label: "Importing CSV Files", to: "/docs/importing-csv" },
  //     { label: "Managing Workspaces", to: "/docs/workspaces" },
  //     { label: "Searching & Querying", to: "/docs/querying" },
  //     { label: "Viewing SQL History", to: "/docs/sql-history" },
  //   ],
  // },
  {
    title: "Data Privacy",
    items: [
      { label: "How Privacy Works", to: "/docs/privacy" },
      { label: "Hashing Sensitive Columns", to: "/docs/hashing" },
      { label: "Understanding Data Flow", to: "/docs/data-flow" },
    ],
  },
  // {
  //   title: "Sharing with Your Team",
  //   items: [
  //     { label: "Exporting SQL Logic", to: "/docs/sharing" },
  //     { label: "Sharing Chat History", to: "/docs/share-chat" },
  //     { label: "Collaborating on Metrics", to: "/docs/collaborate" },
  //   ],
  // },
  {
    title: "FAQ & Support",
    items: [
      { label: "FAQ", to: "/docs/faq" },
      // { label: "Getting Help", to: "/docs/help" },
    ],
  },
];

export function DocsLayout({
  title,
  description,
  breadcrumb,
  toc,
  children,
}: {
  title: string;
  description?: string;
  breadcrumb: { label: string; to?: string }[];
  toc?: { id: string; label: string }[];
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <div className="container-wide grid gap-10 py-10 lg:grid-cols-[240px_minmax(0,1fr)_200px]">
      {/* Sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
          <nav className="space-y-6">
            {sections.map((section) => (
              <div key={section.title}>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </div>
                <ul className="space-y-0.5">
                  {section.items.map((item) => {
                    const active = pathname === item.to;
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className={cn(
                            "block rounded-md px-3 py-1.5 text-sm transition-colors",
                            active
                              ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                              : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main */}
      <main className="min-w-0">
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
          {breadcrumb.map((b, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {b.to ? (
                <Link to={b.to} className="hover:text-foreground">{b.label}</Link>
              ) : (
                <span className="text-foreground">{b.label}</span>
              )}
              {i < breadcrumb.length - 1 && <ChevronRight className="h-3 w-3" />}
            </span>
          ))}
        </nav>

        <header className="mb-8 border-b border-border pb-6">
          <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
          {description && <p className="mt-3 text-lg text-muted-foreground">{description}</p>}
        </header>

        <article className="prose-content max-w-none space-y-5 text-[15px] leading-7 text-foreground/90 [&_h2]:mt-12 [&_h2]:scroll-mt-24 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:mt-8 [&_h3]:scroll-mt-24 [&_h3]:text-lg [&_h3]:font-semibold [&_p]:text-foreground/85 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-6 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary-glow [&_strong]:text-foreground [&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:bg-secondary [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:text-[13px] [&_code:not(pre_code)]:font-mono">
          {children}
        </article>
      </main>

      {/* TOC */}
      <aside className="hidden lg:block">
        {toc && toc.length > 0 && (
          <div className="sticky top-24">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              On this page
            </div>
            <ul className="space-y-1.5 border-l border-border">
              {toc.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="-ml-px block border-l border-transparent pl-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
