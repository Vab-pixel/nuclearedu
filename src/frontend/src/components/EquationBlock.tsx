import katex from "katex";
import { useEffect, useRef, useState } from "react";
import "katex/dist/katex.min.css";
import { Check, Copy } from "lucide-react";

interface EquationBlockProps {
  latex: string;
  annotation?: string;
  label?: string;
  display?: boolean;
  copyable?: boolean;
}

export function EquationBlock({
  latex,
  annotation,
  label,
  display,
  copyable = true,
}: EquationBlockProps) {
  const mathRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!mathRef.current) return;
    try {
      katex.render(latex, mathRef.current, {
        displayMode: display !== false,
        throwOnError: false,
        trust: false,
        macros: {
          "\\hbar": "\\hbar",
          "\\ket": "|#1\\rangle",
          "\\bra": "\\langle#1|",
        },
      });
    } catch {
      if (mathRef.current) {
        mathRef.current.innerHTML = `<code class="text-sm font-mono text-foreground">${latex}</code>`;
      }
    }
  }, [latex, display]);

  return (
    <figure
      className="my-6 rounded-lg border border-border bg-muted/30 p-5"
      aria-label={label ?? annotation}
    >
      {label && (
        <figcaption className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </figcaption>
      )}
      <div className="relative">
        <div
          ref={mathRef}
          className="overflow-x-auto text-foreground"
          aria-hidden="true"
        />
        {copyable && (
          <>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(latex).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                });
              }}
              className="absolute top-0 right-0 p-1.5 rounded-md bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Copy equation"
              title="Copy equation"
              data-ocid="equation.copy_button"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
            {copied && (
              <span className="absolute top-8 right-0 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded shadow-sm">
                Copied!
              </span>
            )}
          </>
        )}
      </div>
      {annotation && (
        <p className="mt-3 text-sm italic text-muted-foreground">
          {annotation}
        </p>
      )}
    </figure>
  );
}
