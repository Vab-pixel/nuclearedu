import { Link } from "@tanstack/react-router";

interface CitationMarkerProps {
  refId: number;
}

export function CitationMarker({ refId }: CitationMarkerProps) {
  return (
    <Link
      to="/references"
      hash={`ref-${refId}`}
      className="inline-flex items-center justify-center rounded-sm px-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Reference ${refId}`}
    >
      [{refId}]
    </Link>
  );
}
