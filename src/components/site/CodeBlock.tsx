import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackInstallButtonClick } from "../../lib/analytics";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "bash", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);

      // Automatically track copy event if it's one of the installer scripts
      if (code.includes("install.sh")) {
        trackInstallButtonClick("macos", "installation-code-block", "copy");
      } else if (code.includes("install.ps1")) {
        trackInstallButtonClick("windows", "installation-code-block", "copy");
      }
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={cn("group relative overflow-hidden rounded-lg border border-code-border bg-code-bg", className)}>
      <div className="flex items-center justify-between border-b border-code-border/60 px-4 py-2">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-white/5 hover:text-code-fg"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-code-fg">
        <code>{code}</code>
      </pre>
    </div>
  );
}
