import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { CodeBlock } from "@/components/site/CodeBlock";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { User, Bot, Sparkles, Terminal, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/docs/sample-data")({
  head: () => ({
    meta: [
      { title: "Sample Data & Prompts — DashDraft Docs" },
      { name: "description", content: "Sample CSV datasets, AI prompts, and expected SQL logic to test DashDraft." },
    ]
  }),
  component: Page,
});

function Page() {
  return (
    <DocsLayout
      title="Sample Data & Prompts"
      description="Download our sample datasets and try these tested prompts to see DashDraft in action."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "Using DashDraft" }, { label: "Sample Data" }]}
      toc={[
        { id: "overview", label: "Overview" },
        { id: "demo", label: "See it in action" },
        { id: "prompts", label: "Try these Prompts" },
      ]}
    >
      <h2 id="overview">Overview</h2>
      <p>We've prepared three correlated CSV files representing a typical SaaS business to help you test DashDraft. You can download them below to create a test workspace:</p>
      <ul>
        <li><strong><a href="/demo/customers.csv" download>customers.csv</a></strong>: Customer information, signup dates, subscription plans, churn status</li>
        <li><strong><a href="/demo/orders.csv" download>orders.csv</a></strong>: Transaction history, products, revenue by category</li>
        <li><strong><a href="/demo/user_activity.csv" download>user_activity.csv</a></strong>: User engagement, feature usage, session metrics</li>
      </ul>

      <h2 id="demo">See it in action (Claude Integration)</h2>
      <p>Here is an example of what it looks like when you ask Claude a complex question about your local CSV data through DashDraft. The raw data never leaves your machine.</p>

      <div className="my-8 rounded-xl border border-border bg-card shadow-sm p-8 flex flex-col items-center justify-center text-center space-y-4">
        <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-2">
          <Sparkles className="h-6 w-6 text-orange-500" />
        </div>
        <h3 className="text-xl font-medium tracking-tight">View the Claude Chat Demo</h3>
        <p className="text-muted-foreground max-w-lg">
          See a full example of how DashDraft interacts with Claude to analyze churn rates by region, complete with local SQL generation and data tables.
        </p>
        <a
          href="https://claude.ai/share/b77ae2fb-3adb-4d1c-8d29-43fff4082c82"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 mt-4"
        >
          View Claude.ai Share Link
        </a>
      </div>

      <h2 id="prompts">Try these Prompts</h2>
      <p>Once you load the sample data, try these prompts in your connected AI to see complex joins, aggregations, and business metrics in action.</p>

      <Accordion type="single" collapsible className="w-full mt-4">
        <AccordionItem value="prompt-1">
          <AccordionTrigger>1. Churn Analysis by Region</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p><strong>Use Case:</strong> Understanding customer churn patterns to prioritize retention efforts.</p>
            <div className="bg-muted/50 p-4 rounded-lg border border-border italic text-muted-foreground">
              "Analyze our customer churn. What's the churn rate by region? Which regions are performing worst? How many months after signup do customers typically churn?"
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="prompt-2">
          <AccordionTrigger>2. Revenue Analysis by Product & Tier</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p><strong>Use Case:</strong> Identifying high-performing products and customer segments.</p>
            <div className="bg-muted/50 p-4 rounded-lg border border-border italic text-muted-foreground">
              "Which product categories generate the most revenue? How does revenue differ between Basic, Pro, and Enterprise subscription plans?"
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="prompt-3">
          <AccordionTrigger>3. Engagement & Retention Correlation</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p><strong>Use Case:</strong> Determining if engagement levels predict churn.</p>
            <div className="bg-muted/50 p-4 rounded-lg border border-border italic text-muted-foreground">
              "Is there a relationship between user engagement and churn? Which features drive the most engagement? Compare engagement metrics between active and churned customers."
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="prompt-4">
          <AccordionTrigger>4. Customer Lifetime Value (CLV)</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p><strong>Use Case:</strong> Segmenting customers by profitability and acquisition cost ROI.</p>
            <div className="bg-muted/50 p-4 rounded-lg border border-border italic text-muted-foreground">
              "Calculate customer lifetime value for each customer. Which acquisition channels generate the most valuable customers?"
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="prompt-5">
          <AccordionTrigger>5. Activation & Onboarding</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p><strong>Use Case:</strong> Optimizing user onboarding and early engagement.</p>
            <div className="bg-muted/50 p-4 rounded-lg border border-border italic text-muted-foreground">
              "How quickly do new customers engage after signup? What's the time-to-first-login? Do customers who engage in the first week have better retention?"
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="prompt-6">
          <AccordionTrigger>6. Cohort Analysis</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p><strong>Use Case:</strong> Tracking how customer cohorts perform over time.</p>
            <div className="bg-muted/50 p-4 rounded-lg border border-border italic text-muted-foreground">
              "Compare performance across signup cohorts. How do retention rates vary by cohort? Is recent product quality affecting newer customers differently?"
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20 flex gap-4">
        <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
        <div>
          <h4 className="font-semibold text-primary mb-1">Key Features Demonstrated</h4>
          <ul className="list-disc pl-5 text-sm text-foreground/80 space-y-1">
            <li><strong>Data Privacy:</strong> Raw customer data stays local; only query results shared with AI.</li>
            <li><strong>Complex Analysis:</strong> Multi-table joins, aggregations, and date calculations.</li>
            <li><strong>SQL Handoff:</strong> Every query logged and ready for your engineering teams.</li>
            <li><strong>Low API Cost:</strong> Only aggregated numbers sent to Claude/ChatGPT, not raw CSVs.</li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
}
