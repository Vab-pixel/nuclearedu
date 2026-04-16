import { cn } from "@/lib/utils";

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  glowAccent?: boolean;
  "data-ocid"?: string;
}

export function SectionCard({
  children,
  className,
  glowAccent,
  "data-ocid": dataOcid,
}: SectionCardProps) {
  return (
    <div
      data-ocid={dataOcid}
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-card",
        glowAccent && "border-primary/20 shadow-glow-accent",
        className,
      )}
    >
      {children}
    </div>
  );
}
