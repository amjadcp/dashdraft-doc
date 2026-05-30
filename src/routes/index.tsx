import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Database, MessageSquare, Users, ShieldCheck, Wallet, FlaskConical, History, Sparkles, Zap, FileSpreadsheet, Lock, Terminal } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <Scenarios />
        <Install />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(60%_50%_at_50%_0%,oklch(0.72_0.13_195/0.18),transparent_70%)]" />
      <div className="container-wide relative grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Local-first · Zero uploads
          </div>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Analyze your data with AI.{" "}
            <span className="gradient-text">Keep it private.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Ask Claude and ChatGPT questions about your CSV files without uploading
            anything to the cloud. Share the SQL logic with your tech team.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <Link to="/docs/installation">
                Get started <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
              <Link to="/docs/quick-start">View documentation</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Lock className="h-4 w-4" /> Data stays local</span>
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4" /> Installs in 2 minutes</span>
            <span className="flex items-center gap-1.5"><Terminal className="h-4 w-4" /> macOS · Windows · Linux</span>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-primary/15 via-accent/15 to-transparent blur-2xl" />
      <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-elevated)]">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Local files */}
          <div className="space-y-2">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">On your machine</div>
            {["customers.csv", "orders.csv", "events.csv"].map((f) => (
              <div key={f} className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-xs font-mono">
                <FileSpreadsheet className="h-3.5 w-3.5 text-accent" />
                {f}
              </div>
            ))}
          </div>

          {/* Padlock bridge */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-accent to-transparent" />
            <div className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-card)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="h-12 w-px bg-gradient-to-b from-accent via-transparent to-transparent" />
          </div>

          {/* AI chat */}
          <div className="space-y-2">
            <div className="text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">AI assistant</div>
            <div className="rounded-lg rounded-tr-sm border border-border bg-secondary px-3 py-2 text-xs">
              What's our churn by region?
            </div>
            <div className="rounded-lg rounded-tl-sm border border-accent/30 bg-accent/10 px-3 py-2 text-xs">
              <div className="font-mono text-[11px] text-accent-foreground/80">SELECT region, COUNT(*)…</div>
              <div className="mt-1.5 text-foreground/80">West: 12% · East: 8%</div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5"><Lock className="h-3 w-3" /> Raw data never leaves your computer</span>
          <span className="font-mono">SQL · MCP</span>
        </div>
      </div>
    </div>
  );
}

function Problem() {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="container-wide py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 text-sm font-medium uppercase tracking-wider text-accent">The problem</div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            AI is great at analyzing data — until you have to upload it.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Business owners want to explore their numbers with AI. But pasting CSVs into
            ChatGPT burns API credits, hits context limits, and quietly sends customer
            records to a third party. Meanwhile, tech teams need clear metric
            definitions to ship dashboards — and email threads aren't enough.
          </p>
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    icon: FileSpreadsheet,
    title: "Import",
    desc: "Drag CSV files into DashDraft. Data stays on your computer.",
  },
  {
    icon: Sparkles,
    title: "Ask",
    desc: "Connect Claude or ChatGPT. Ask questions. Get answers without uploading raw data.",
  },
  {
    icon: Users,
    title: "Share",
    desc: "Hand off chat history and SQL logic so your tech team can build production dashboards.",
  },
];

function HowItWorks() {
  return (
    <section className="border-b border-border">
      <div className="container-wide py-20">
        <SectionHeading eyebrow="How it works" title="Three steps from CSV to insight" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="absolute right-5 top-5 font-mono text-xs text-muted-foreground">0{i + 1}</div>
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: ShieldCheck, title: "Data privacy by default", desc: "Your CSV files never leave your machine. AI only sees query results — never raw rows. Hash sensitive columns automatically." },
  { icon: Wallet, title: "Zero API credit waste", desc: "No bulk CSV uploads to OpenAI or Anthropic. Only aggregated results flow to the model. Save money on API costs." },
  { icon: FlaskConical, title: "POC your metrics", desc: "Test metric definitions before building dashboards. Validate logic with stakeholders. Reduce back-and-forth with tech teams." },
  { icon: History, title: "SQL history for handoff", desc: "Every query is logged automatically. Share exact SQL with developers. Keep a clear audit trail of metric definitions." },
  { icon: MessageSquare, title: "Works with Claude & ChatGPT", desc: "Direct stdio connection for Claude Desktop. Secure ngrok tunnel for ChatGPT. Same data, two AI options." },
  { icon: Zap, title: "Offline-first & fast", desc: "SQL engine for fast local queries. No internet needed after install. Instant workspace switching." },
];

function Features() {
  return (
    <section className="border-b border-border bg-secondary/30">
      <div className="container-wide py-20">
        <SectionHeading eyebrow="Features" title="Built for business owners, loved by tech teams" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-[var(--shadow-card)]">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-accent transition-colors group-hover:bg-accent/25">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const scenarios = [
  { tag: "Product", title: "Understanding customer churn", body: "A PM has a CSV of sign-ups and cancellations and wants churn by region. Instead of uploading the customer database to ChatGPT, they run the query locally with DashDraft, get the rate (West: 12%, East: 8%), and share the SQL with their data team." },
  { tag: "Finance", title: "Monthly revenue analysis", body: "A business owner imports order data, asks Claude to calculate revenue by month and product category, then saves the SQL logic to automate the report in their BI tool." },
  { tag: "Ops", title: "Building metric definitions", body: "An operations lead needs to define 'active users.' They experiment with SQL (last 7 vs. last 30 days), validate the numbers with their team, then hand off the final query." },
];

function Scenarios() {
  return (
    <section className="border-b border-border">
      <div className="container-wide py-20">
        <SectionHeading eyebrow="In the wild" title="Real teams, real questions" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {scenarios.map((s) => (
            <div key={s.title} className="flex flex-col rounded-xl border border-border bg-card p-6">
              <span className="mb-4 inline-flex w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{s.tag}</span>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Install() {
  return (
    <section className="border-b border-border bg-secondary/30">
      <div className="container-wide py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <div className="mb-4 text-sm font-medium uppercase tracking-wider text-accent">Quick install</div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">One command. No dependencies.</h2>
            <p className="mt-4 text-muted-foreground">
              DashDraft ships as a single binary. No Node, no Python, no Docker. Installs in
              under 2 minutes and runs entirely on your computer.
            </p>
            <Button asChild variant="link" className="mt-3 h-auto px-0 text-base">
              <Link to="/docs/installation">Read full installation guide <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <div className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">macOS / Linux</div>
              <CodeBlock language="bash" code="curl -fsSL https://dashdraft.app/get/install.sh | bash" />
            </div>
            <div>
              <div className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">Windows</div>
              <CodeBlock language="powershell" code="irm https://dashdraft.app/get/install.ps1 | iex" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 -z-10 opacity-30 grid-bg" />
      <div className="container-wide py-24 text-center">
        <Database className="mx-auto mb-5 h-10 w-10 text-primary-foreground/80" />
        <h2 className="text-4xl font-semibold tracking-tight text-primary-foreground md:text-5xl">
          Start analyzing your data privately
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
          Free, local, and ready in two minutes.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" variant="secondary" className="h-12 px-7 text-base">
            <Link to="/docs/installation">Get started <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="h-12 px-7 text-base text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
            <Link to="/docs/quick-start">Read the documentation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">{eyebrow}</div>
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
    </div>
  );
}
