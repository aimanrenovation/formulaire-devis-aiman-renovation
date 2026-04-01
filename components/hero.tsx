import Image from "next/image";

export function Hero() {
  return (
    <header className="bg-brand-dark text-white px-4 py-8 text-center">
      <Image
        src="/images/logo_bar.png"
        alt="AIMAN Renovation"
        width={220}
        height={60}
        className="mx-auto mb-4"
        priority
      />
      <h1 className="text-xl font-bold mb-2">
        Votre projet de rénovation en 5 minutes
      </h1>
      <span className="inline-block bg-brand-red text-white text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wide">
        Gratuit
      </span>
    </header>
  );
}
