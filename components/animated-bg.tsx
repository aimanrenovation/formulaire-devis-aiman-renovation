export function AnimatedBg() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute w-64 h-64 rounded-full bg-brand-red/5 -top-20 -right-20 animate-spin-slow" />
      <div className="absolute w-48 h-48 rotate-45 bg-brand-red/3 bottom-40 -left-10 animate-spin-slow" style={{ animationDuration: "30s", animationDirection: "reverse" }} />
      <div className="absolute w-32 h-32 rounded-full bg-brand-dark/5 top-1/2 right-10 animate-spin-slow" style={{ animationDuration: "40s" }} />
    </div>
  );
}
