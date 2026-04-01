"use client";

import { useState } from "react";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { StepIndicator } from "@/components/form/step-indicator";
import { StepContact } from "@/components/form/step-contact";
import { StepProject } from "@/components/form/step-project";
import { StepPhotos } from "@/components/form/step-photos";
import { StepPlan } from "@/components/form/step-plan";
import { StepRecap } from "@/components/form/step-recap";
import { Button } from "@/components/ui/button";
import { INITIAL_FORM_DATA, STEP_LABELS } from "@/lib/types";
import type { DevisFormData, PhotoFile } from "@/lib/types";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Home() {
  const [step, setStep] = useState(1);
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
      <Hero />

      <main className="flex-1 max-w-lg mx-auto w-full px-4 pb-24">
        <StepIndicator currentStep={step} totalSteps={totalSteps} labels={STEP_LABELS} />

        <div className="space-y-4">
          {step === 1 && <StepContact data={data} onChange={updateField} />}
          {step === 2 && <StepProject data={data} onChange={updateField} />}
          {step === 3 && <StepPhotos data={data} onChange={updateField} />}
          {step === 4 && <StepPlan data={data} onChange={updateField} />}
          {step === 5 && <StepRecap data={data} />}
        </div>
      </main>

      {step < 5 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-lg mx-auto flex gap-3">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="flex-1 gap-2"
                type="button"
              >
                <ArrowLeft className="w-4 h-4" />
                Précédent
              </Button>
            )}
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canAdvance()}
              className={`flex-1 gap-2 bg-brand-red hover:bg-brand-red/90 text-white ${
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
