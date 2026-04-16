import { AudienceBadge } from "@/components/AudienceBadge";
import type { BadgeLevel } from "@/components/AudienceBadge";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  audienceLevel?: BadgeLevel;
  readTimeMin?: number;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  audienceLevel,
  readTimeMin,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("mb-8 space-y-3", className)}>
      <div className="flex flex-wrap items-center gap-2">
        {audienceLevel && <AudienceBadge level={audienceLevel} />}
        {readTimeMin && (
          <span
            className="text-xs text-muted-foreground"
            aria-label={`Estimated reading time: ${readTimeMin} minutes`}
          >
            {readTimeMin} min read
          </span>
        )}
      </div>
      <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </header>
  );
}
