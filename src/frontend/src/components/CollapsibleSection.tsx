import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface CollapsibleSectionProps {
  id: string;
  title: string;
  defaultOpen?: boolean;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  "data-ocid"?: string;
}

export function CollapsibleSection({
  id,
  title,
  defaultOpen = false,
  badge,
  children,
  className,
  "data-ocid": dataOcid,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      id={id}
      className={cn(
        "rounded-xl border border-border bg-card shadow-card overflow-hidden",
        className,
      )}
      data-ocid={dataOcid}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`${id}-content`}
        className="w-full flex items-center justify-between gap-3 px-6 py-4 text-left hover:bg-muted/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      >
        <span className="flex items-center gap-2 min-w-0">
          <span className="font-display text-lg font-semibold text-foreground truncate">
            {title}
          </span>
          {badge}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      <div
        id={`${id}-content`}
        hidden={!open}
        className="px-6 pb-6 border-t border-border/50"
      >
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}
