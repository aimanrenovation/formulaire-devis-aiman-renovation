"use client";

import { motion } from "framer-motion";
import Image from "next/image";

function FloatingShape({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute opacity-[0.07] ${className}`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 20,
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
    <header className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark to-brand-red/30 text-white px-4 py-10 text-center">
      {/* Floating shapes */}
      <FloatingShape className="w-32 h-32 rounded-full border-2 border-white top-4 -left-10" delay={0} />
      <FloatingShape className="w-20 h-20 rotate-45 border-2 border-brand-red top-10 right-8" delay={5} />
      <FloatingShape className="w-24 h-24 rounded-full border-2 border-white/50 bottom-4 right-1/4" delay={10} />

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <Image
          src="/images/logo_bar.png"
          alt="AIMAN Renovation"
          width={220}
          height={60}
          className="mx-auto mb-5"
          priority
        />
      </motion.div>

      {/* Title with stagger */}
      <h1 className="text-xl font-bold mb-3 relative z-10">
        {titleText.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.02, duration: 0.3 }}
          >
            {char}
          </motion.span>
        ))}
      </h1>

      {/* Badge */}
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 500 }}
        className="inline-block bg-brand-red text-white text-xs font-mono font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow-lg shadow-brand-red/30 animate-pulse relative z-10"
      >
        Gratuit
      </motion.span>
    </header>
  );
}
