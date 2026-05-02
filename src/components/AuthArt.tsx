export function AuthArt() {
  return (
    <div className="hidden lg:flex relative overflow-hidden items-center justify-center">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.95 0.05 70) 0%, oklch(0.88 0.1 30) 50%, oklch(0.78 0.13 350) 100%)",
        }}
      />
      <div className="absolute inset-0 paisley-pattern opacity-50" />

      {/* Mandala */}
      <svg
        viewBox="0 0 400 400"
        className="relative w-[80%] max-w-md chakra-spin opacity-90"
        style={{ animationDuration: "40s" }}
      >
        <defs>
          <radialGradient id="mandala-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.95 0.15 70)" />
            <stop offset="100%" stopColor="oklch(0.65 0.2 35)" />
          </radialGradient>
        </defs>
        <g fill="none" stroke="url(#mandala-grad)" strokeWidth="1.5">
          <circle cx="200" cy="200" r="40" />
          <circle cx="200" cy="200" r="80" />
          <circle cx="200" cy="200" r="120" />
          <circle cx="200" cy="200" r="160" />
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 16;
            return (
              <line
                key={i}
                x1={200}
                y1={200}
                x2={200 + Math.cos(a) * 180}
                y2={200 + Math.sin(a) * 180}
              />
            );
          })}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 12;
            const x = 200 + Math.cos(a) * 100;
            const y = 200 + Math.sin(a) * 100;
            return <circle key={i} cx={x} cy={y} r={20} />;
          })}
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 24;
            const x1 = 200 + Math.cos(a) * 140;
            const y1 = 200 + Math.sin(a) * 140;
            const x2 = 200 + Math.cos(a) * 165;
            const y2 = 200 + Math.sin(a) * 165;
            return (
              <path
                key={i}
                d={`M${x1},${y1} Q${(x1 + x2) / 2 + Math.cos(a + Math.PI / 2) * 8},${(y1 + y2) / 2 + Math.sin(a + Math.PI / 2) * 8} ${x2},${y2}`}
              />
            );
          })}
        </g>
        <circle cx="200" cy="200" r="14" fill="url(#mandala-grad)" />
      </svg>

      {/* Floating diyas */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 2) * 60}%`,
            background:
              "radial-gradient(circle, oklch(0.95 0.15 75) 0%, oklch(0.7 0.2 40 / 0) 70%)",
            boxShadow: "0 0 20px oklch(0.85 0.18 60 / 0.8)",
            animation: `float ${4 + i}s ease-in-out ${i * 0.4}s infinite`,
          }}
        />
      ))}

      <div className="absolute bottom-12 left-12 right-12 text-foreground/80">
        <p className="font-display italic text-2xl leading-snug">"वसुधैव कुटुम्बकम्"</p>
        <p className="text-sm mt-2 opacity-80">The world is one family.</p>
      </div>
    </div>
  );
}
