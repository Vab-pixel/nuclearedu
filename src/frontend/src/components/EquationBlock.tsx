import katex from "katex";
import { useEffect, useRef } from "react";
import "katex/dist/katex.min.css";

interface EquationBlockProps {
  latex: string;
  annotation: string;
  label?: string;
}

export function EquationBlock({
  latex,
  annotation,
  label,
}: EquationBlockProps) {
  const mathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mathRef.current) return;
    try {
      katex.render(latex, mathRef.current, {
        displayMode: true,
        throwOnError: false,
        trust: false,
      });
    } catch {
      if (mathRef.current) {
        mathRef.current.innerHTML = `<code class="text-sm font-mono text-foreground">${latex}</code>`;
      }
    }
  }, [latex]);

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
      <div
        ref={mathRef}
        className="overflow-x-auto text-foreground"
        aria-hidden="true"
      />
      <p className="sr-only">{annotation}</p>
      <p className="mt-3 text-sm italic text-muted-foreground">{annotation}</p>
    </figure>
  );
}
