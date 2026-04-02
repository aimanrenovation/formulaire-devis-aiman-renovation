"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { StepIndicator } from "@/components/form/step-indicator";
import { StepContact } from "@/components/form/step-contact";
import { StepProject } from "@/components/form/step-project";
import { StepPhotos } from "@/components/form/step-photos";
import { StepPlan } from "@/components/form/step-plan";
import { StepRecap } from "@/components/form/step-recap";
import { AnimatedBg } from "@/components/animated-bg";
import { Button } from "@/components/ui/button";
import { INITIAL_FORM_DATA, STEP_LABELS } from "@/lib/types";
import type { DevisFormData, PhotoFile } from "@/lib/types";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Home() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<DevisFormData>(INITIAL_FORM_DATA);

  function updateField(field: keyof DevisFormData, value: string | string[] | PhotoFile[] | PhotoFile | null) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function canAdvance(): boolean {
    switch (step) {
      case 1:
        return !!(data.nom && data.prenom && data.tel && data.email && data.adresse);
      case 2:
        return !!(data.pieces.length > 0 && data.budget && data.delai && data.description);
      case 3:
        return true;
      case 4:
        return true;
      default:
        return true;
    }
  }

  const totalSteps = 5;

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBg />
      <Hero />

      <main className="flex-1 max-w-md mx-auto w-full px-4 pb-28 relative z-10">
        <StepIndicator currentStep={step} totalSteps={totalSteps} labels={STEP_LABELS} />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ x: direction * 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-4"
          >
            {step === 1 && <StepContact data={data} onChange={updateField} />}
            {step === 2 && <StepProject data={data} onChange={updateField} />}
            {step === 3 && <StepPhotos data={data} onChange={updateField} />}
            {step === 4 && <StepPlan data={data} onChange={updateField} />}
            {step === 5 && <StepRecap data={data} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {step < 5 && (
        <div className="fixed bottom-0 left-0 right-0 glass border-t border-white/20 p-4 shadow-[0_-4px_30px_rgba(0,0,0,0.08)] z-10">
          <div className="max-w-md mx-auto flex gap-3">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => { setDirection(-1); setStep(step - 1); }}
                className="flex-1 gap-2 rounded-xl border-gray-200 hover:bg-gray-50"
                type="button"
              >
                <ArrowLeft className="w-4 h-4" />
                Précédent
              </Button>
            )}
            <Button
              onClick={() => { setDirection(1); setStep(step + 1); }}
              disabled={!canAdvance()}
              className={`flex-1 gap-2 btn-premium bg-gradient-to-r from-brand-red to-brand-red-light shadow-lg shadow-brand-red/20 hover:shadow-xl hover:shadow-brand-red/30 text-white ${
                step === 1 ? "w-full" : ""
              }`}
              type="button"
            >
              Suivant
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
