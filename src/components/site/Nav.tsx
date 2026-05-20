import { Link } from "@tanstack/react-router";
import { Database } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container-wide flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
            <Database className="h-4 w-4" />
          </span>
          DashDraft
        </Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          <Link to="/docs/installation" className="text-muted-foreground transition-colors hover:text-foreground">
            Documentation
          </Link>
          <Link to="/docs/faq" className="text-muted-foreground transition-colors hover:text-foreground">
            FAQ
          </Link>
          {/* <a href="https://github.com" className="text-muted-foreground transition-colors hover:text-foreground">
            GitHub
          </a> */}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/docs/installation">Docs</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/docs/installation">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
