"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 px-4 py-6">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? [1, 1.15, 1] : 1,
                  backgroundColor: isCompleted
                    ? "#22c55e"
                    : isActive
                    ? "#C0392B"
                    : "#e5e7eb",
                }}
                transition={
                  isActive
                    ? { scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }
                    : { duration: 0.3 }
                }
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-mono font-bold"
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                ) : (
                  <span className={isActive || isCompleted ? "text-white" : "text-gray-500"}>
                    {step}
                  </span>
                )}
              </motion.div>
              <span className="text-[10px] text-gray-500 mt-1 max-w-[60px] text-center leading-tight hidden sm:block">
                {labels[i]}
              </span>
            </div>
            {step < totalSteps && (
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: step < currentStep ? "#22c55e" : "#e5e7eb",
                }}
                transition={{ duration: 0.5 }}
                className="w-6 sm:w-10 h-0.5 mx-1"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
