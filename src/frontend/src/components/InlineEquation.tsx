import katex from "katex";
import { useEffect, useRef, useState } from "react";

interface InlineEquationProps {
  tex: string;
  className?: string;
}

export function InlineEquation({ tex, className }: InlineEquationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    setError(false);
    try {
      katex.render(tex, ref.current, {
        throwOnError: false,
        displayMode: false,
        strict: false,
      });
    } catch {
      setError(true);
      if (ref.current) {
        ref.current.innerHTML = `<span class="math-error" title="${tex.replace(/"/g, "&quot;")}">${tex}</span>`;
      }
    }
  }, [tex]);

  return (
    <span
      ref={ref}
      className={`inline katex-inline ${error ? "math-error" : ""} ${className ?? ""}`}
      aria-label={tex}
      title={error ? tex : undefined}
    />
  );
}

export default InlineEquation;
