import katex from "katex";
import React, { useRef, useEffect } from "react";

interface InlineEquationProps {
  tex: string;
  className?: string;
}

export function InlineEquation({ tex, className }: InlineEquationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    try {
      katex.render(tex, ref.current, {
        throwOnError: false,
        displayMode: false,
        strict: false,
      });
    } catch {
      if (ref.current) ref.current.textContent = tex;
    }
  }, [tex]);
  return (
    <span
      ref={ref}
      className={`inline katex-inline ${className ?? ""}`}
      aria-label={tex}
    />
  );
}

export default InlineEquation;
