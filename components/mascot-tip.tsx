"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface MascotTipProps {
  image: string;
  text: string;
}

export function MascotTip({ image, text }: MascotTipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ rotate: 3 }}
        className="shrink-0"
      >
        <Image
          src={image}
          alt="Mascotte AIMAN"
          width={60}
          height={60}
          className="rounded-lg"
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-gray-700 leading-relaxed"
      >
        {text}
      </motion.p>
    </motion.div>
  );
}
