import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1 text-sm text-muted-foreground py-2"
    >
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-foreground transition-colors glow-focus rounded"
        aria-label="Home"
      >
        <Home className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-1">
          <ChevronRight
            className="h-3.5 w-3.5 text-muted-foreground/50"
            aria-hidden="true"
          />
          {item.href && index < items.length - 1 ? (
            <Link
              to={item.href}
              className="hover:text-foreground transition-colors glow-focus rounded truncate max-w-[160px]"
            >
              {item.label}
            </Link>
          ) : (
            <span
              className="text-foreground font-medium truncate max-w-[200px]"
              aria-current={index === items.length - 1 ? "page" : undefined}
            >
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
