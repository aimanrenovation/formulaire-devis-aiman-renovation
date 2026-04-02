"use client";

import { motion } from "framer-motion";
import Image from "next/image";

function FloatingShape({ className, delay = 0, duration = 20 }: { className: string; delay?: number; duration?: number }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        y: [0, -30, 0],
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
    />
  );
}

const titleText = "Votre projet de rénovation en 5 minutes";

export function Hero() {
  return (
    <header className="relative overflow-hidden min-h-[380px] flex flex-col items-center justify-center text-white px-6 py-12">
      {/* Multi-layer gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark-light to-brand-dark" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-red/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(192,57,43,0.3)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(192,57,43,0.15)_0%,_transparent_60%)]" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Floating shapes */}
      <FloatingShape className="w-40 h-40 rounded-full border border-white/10 top-6 -left-14" delay={0} duration={25} />
      <FloatingShape className="w-24 h-24 rotate-45 border border-brand-red/20 top-12 right-4" delay={3} duration={18} />
      <FloatingShape className="w-32 h-32 rounded-full border border-white/5 bottom-8 right-1/4" delay={7} duration={22} />
      <FloatingShape className="w-16 h-16 rounded-full bg-brand-red/10 bottom-20 left-8" delay={5} duration={15} />
      <FloatingShape className="w-20 h-20 rotate-12 border border-brand-red/10 top-1/3 left-1/3" delay={10} duration={30} />

      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-red/8 blur-[100px]" />

      {/* Content */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0, y: -30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.1 }}
        className="relative z-10"
      >
        <Image
          src="/images/logo_bar.png"
          alt="AIMAN Renovation"
          width={240}
          height={65}
          className="mx-auto mb-6 drop-shadow-2xl"
          priority
        />
      </motion.div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-4 relative z-10 text-center leading-tight">
        {titleText.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.02, duration: 0.3 }}
            className="inline-block"
            style={{ marginRight: char === " " ? "0.25em" : "0" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="text-white/50 text-sm mb-5 relative z-10"
      >
        SASU — Saint-Louis et environs
      </motion.p>

      <motion.span
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 400 }}
        className="inline-block relative z-10"
      >
        <span className="bg-gradient-to-r from-brand-red to-brand-red-light text-white text-sm font-mono font-bold px-6 py-2 rounded-full uppercase tracking-widest shadow-xl shadow-brand-red/25 animate-glow-pulse">
          Devis Gratuit
        </span>
      </motion.span>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-bg-body to-transparent" />
    </header>
  );
}
