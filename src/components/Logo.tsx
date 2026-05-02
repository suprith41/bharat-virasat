export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="28" fill="none" stroke="var(--peacock)" strokeWidth="3" />
      <circle cx="32" cy="32" r="6" fill="var(--peacock)" />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 24;
        const x1 = 32 + Math.cos(a) * 8;
        const y1 = 32 + Math.sin(a) * 8;
        const x2 = 32 + Math.cos(a) * 26;
        const y2 = 32 + Math.sin(a) * 26;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--peacock)" strokeWidth="1.5" strokeLinecap="round" />;
      })}
    </svg>
  );
}

export function ChakraSpinner({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <div className={`${className} chakra-spin`}>
      <Logo className="h-full w-full" />
    </div>
  );
}
