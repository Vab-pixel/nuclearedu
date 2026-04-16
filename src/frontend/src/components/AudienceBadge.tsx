import { cn } from "@/lib/utils";

export type BadgeLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "professional";

interface AudienceBadgeProps {
  level: BadgeLevel;
  className?: string;
}

const levelConfig: Record<BadgeLevel, { label: string; className: string }> = {
  beginner: {
    label: "Beginner",
    className: "audience-badge audience-beginner",
  },
  intermediate: {
    label: "Intermediate",
    className: "audience-badge audience-intermediate",
  },
  advanced: {
    label: "Advanced",
    className: "audience-badge audience-advanced",
  },
  professional: {
    label: "Professional",
    className: "audience-badge audience-professional",
  },
};

export function AudienceBadge({ level, className }: AudienceBadgeProps) {
  const config = levelConfig[level];
  return (
    <span
      className={cn(config.className, className)}
      aria-label={`Audience level: ${config.label}`}
    >
      {config.label}
    </span>
  );
}
