export function AnimatedBg() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-red/[0.02] -top-40 -right-40 animate-spin-slow blur-3xl" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-brand-red/[0.015] bottom-20 -left-40 animate-spin-slow blur-3xl" style={{ animationDuration: "35s", animationDirection: "reverse" }} />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-brand-red/[0.02] top-1/3 right-1/4 animate-spin-slow blur-2xl" style={{ animationDuration: "45s" }} />
    </div>
  );
}
