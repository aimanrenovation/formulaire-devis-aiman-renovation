export function Footer() {
  return (
    <footer className="relative bg-brand-dark text-white py-10 px-6">
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      <div className="relative z-10 max-w-md mx-auto text-center space-y-3">
        <p className="text-white/40 text-xs uppercase tracking-[0.2em] font-mono">AIMAN Renovation — SASU</p>
        <div className="w-12 h-px bg-brand-red/40 mx-auto" />
        <p className="text-white/60 text-sm">Saint-Louis et environs</p>
        <p className="text-white/80 text-sm font-medium tracking-wide">06 33 49 69 25</p>
        <p className="text-white/40 text-xs">contact@aiman-renovation.fr</p>
      </div>
    </footer>
  );
}
