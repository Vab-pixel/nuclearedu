import React from "react";

interface NuclearNotationProps {
  symbol: string;
  A: number;
  Z?: number;
  charge?: string;
}

export function NuclearNotation({
  symbol,
  A,
  Z,
  charge,
}: NuclearNotationProps) {
  const displayName = `${symbol}-${A}`;
  return (
    <span
      className="inline-flex items-baseline font-mono text-inherit"
      aria-label={displayName}
      title={displayName}
    >
      <span className="inline-flex flex-col text-[0.6em] leading-[1.1] mr-[0.05em] select-none">
        <span className="text-center leading-none">{A}</span>
        {Z !== undefined && (
          <span className="text-center leading-none opacity-70">{Z}</span>
        )}
      </span>
      <span>{symbol}</span>
      {charge && (
        <span className="text-[0.6em] leading-none self-start ml-[0.05em]">
          {charge}
        </span>
      )}
    </span>
  );
}

export default NuclearNotation;
