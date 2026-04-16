import { AlertTriangle } from "lucide-react";

interface SafetyCalloutProps {
  title?: string;
  children: React.ReactNode;
}

export function SafetyCallout({
  title = "Restricted Technical Detail",
  children,
}: SafetyCalloutProps) {
  return (
    <div
      role="note"
      aria-label="Safety and content restriction notice"
      className="my-6 rounded-lg border border-amber-500/40 bg-amber-950/30 p-4"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle
          className="mt-0.5 h-5 w-5 shrink-0 text-amber-400"
          aria-hidden="true"
        />
        <div>
          <p className="font-display text-sm font-semibold text-amber-300">
            {title}
          </p>
          <div className="mt-1 text-sm text-amber-200/80 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
