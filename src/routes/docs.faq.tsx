import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/site/DocsLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/docs/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — DashDraft Docs" },
      { name: "description", content: "Common questions about DashDraft: pricing, privacy, offline use, and more." },
    ]
  }),
  component: Page,
});

const faqs = [
  { q: "Does DashDraft upload my data?", a: "No. CSV files and query results stay on your computer. Only the schema and the outputs of queries you run flow to the AI." },
  { q: "How much does DashDraft cost?", a: "DashDraft itself is free. You only pay for your own AI subscription (Claude or ChatGPT)." },
  { q: "Can I use it offline?", a: "Yes — for local SQL queries and the UI. The AI features need an internet connection to reach Claude or ChatGPT." },
  { q: "What if I close the terminal?", a: "If you're using ChatGPT via tunnel, closing the terminal stops the connection. Just run dashdraft tunnel again. Claude Desktop launches DashDraft automatically." },
  { q: "How do I switch workspaces?", a: "Use the workspace picker in the top bar, or run dashdraft workspace use <name>." },
  { q: "Can I use both Claude and ChatGPT?", a: "Yes. They can be configured at the same time — Claude over stdio, ChatGPT over the tunnel." },
  { q: "What happens to my data when I uninstall?", a: "Your workspace folder at ~/.dashdraft is left in place. Delete it manually to remove everything." },
  // { q: "How do I update DashDraft?", a: "Run dashdraft update. The CLI fetches the latest binary and replaces itself." },
];

function Page() {
  return (
    <DocsLayout
      title="Frequently Asked Questions"
      description="Quick answers to the questions we hear most often."
      breadcrumb={[{ label: "Docs", to: "/docs/installation" }, { label: "FAQ & Support" }, { label: "FAQ" }]}
    >
      <div className="not-prose">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-[15px] leading-7 text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </DocsLayout>
  );
}
