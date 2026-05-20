import { Info, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "info" | "success" | "warning" | "tip";

const styles: Record<Variant, { bg: string; border: string; icon: typeof Info; iconColor: string }> = {
  info: { bg: "bg-info/10", border: "border-info/30", icon: Info, iconColor: "text-info" },
  success: { bg: "bg-success/10", border: "border-success/30", icon: CheckCircle2, iconColor: "text-success" },
  warning: { bg: "bg-warning/15", border: "border-warning/40", icon: AlertTriangle, iconColor: "text-warning-foreground" },
  tip: { bg: "bg-accent/10", border: "border-accent/30", icon: Lightbulb, iconColor: "text-accent" },
};

export function Callout({ variant = "info", title, children }: { variant?: Variant; title?: string; children: ReactNode }) {
  const s = styles[variant];
  const Icon = s.icon;
  return (
    <div className={cn("my-6 flex gap-3 rounded-lg border p-4", s.bg, s.border)}>
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", s.iconColor)} />
      <div className="text-sm leading-relaxed">
        {title && <div className="mb-1 font-semibold text-foreground">{title}</div>}
        <div className="text-foreground/85">{children}</div>
      </div>
    </div>
  );
}
