import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/docs")({
  component: DocsRoot,
});

function DocsRoot() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Nav />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
